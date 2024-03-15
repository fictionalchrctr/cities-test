import { useEffect, useState } from 'react'
import citiesService from '../service/cities.service'

interface ICity {
  name: string
  value: string
  foundedAt: string
}

const CityManagement: React.FC = () => {
  const [cities, setCities] = useState<ICity[]>([])
  const [newCity, setNewCity] = useState<ICity>({
    name: '',
    value: '',
    foundedAt: '',
  })
  const [editCity, setEditCity] = useState<ICity | null>(null)

  useEffect(() => {
    fetchCities()
  }, [])

  const fetchCities = async () => {
    try {
      const citiesData = await citiesService.fetchAllCities()
      setCities(citiesData)
    } catch (error) {
      console.error('Error fetching cities:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCity((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await citiesService.createCity(newCity)
      setNewCity({ name: '', value: '', foundedAt: '' })
      fetchCities()
    } catch (error) {
      console.error('Error adding city:', error)
    }
  }

  const handleEditClick = (city: ICity) => {
    setEditCity({ ...city }) // Создаем копию объекта
  }

  const handleSaveEdit = async () => {
    if (!editCity) return
    try {
      await citiesService.updateCity(editCity)
      setEditCity(null)
      fetchCities()
    } catch (error) {
      console.error('Error editing city:', error)
    }
  }

  const handleDeleteCity = async (city: ICity) => {
    try {
      await citiesService.deleteCity(city)
      fetchCities()
    } catch (error) {
      console.error('Error deleting city:', error)
    }
  }

  return (
    <div>
      <h2>City Management</h2>
      <form onSubmit={handleAddCity}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newCity.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Value:</label>
          <input
            type="text"
            name="value"
            value={newCity.value}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Founded At:</label>
          <input
            type="text"
            name="foundedAt"
            value={newCity.foundedAt}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add City</button>
      </form>
      <ul>
        {cities.map((city) => (
          <li key={city.value}>
            {editCity && editCity.value === city.value ? (
              <div className="form">
                <input
                  type="text"
                  name="name"
                  value={editCity.name}
                  onChange={(e) =>
                    setEditCity((prevState) => ({
                      ...prevState!,
                      name: e.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  name="foundedAt"
                  value={editCity.foundedAt}
                  onChange={(e) =>
                    setEditCity((prevState) => ({
                      ...prevState!,
                      foundedAt: e.target.value,
                    }))
                  }
                />
                <button onClick={handleSaveEdit}>Save</button>
              </div>
            ) : (
              <>
                <div>{city.name}</div>
                <div>{city.foundedAt}</div>
                <button onClick={() => handleEditClick(city)}>Edit</button>
                <button onClick={() => handleDeleteCity(city)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CityManagement
