import { useEffect, useState } from 'react'
import styles from './CityManagment.module.css'
import citiesService from '../service/cities.service'
import { ICity } from '../types/types'

const CityManagement: React.FC = () => {
  const newCityInitialState = {
    name: '',
    value: '',
    foundedAt: '',
  }
  const [cities, setCities] = useState<ICity[]>([])
  const [newCity, setNewCity] = useState<ICity>(newCityInitialState)
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

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await citiesService.createCity(newCity)
      setNewCity(newCityInitialState)
      fetchCities()
    } catch (error) {
      console.error('Error adding city:', error)
    }
  }

  const handleEditClick = (city: ICity) => {
    setEditCity({ ...city })
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

  const handleCancelEdit = () => {
    setEditCity(null)
  }

  const handleDeleteCity = async (city: ICity) => {
    try {
      await citiesService.deleteCity(city)
      fetchCities()
    } catch (error) {
      console.error('Error deleting city:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCity((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditCity((prevState) => ({ ...prevState!, [name]: value }))
  }

  return (
    <div className={styles.wrapper}>
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
      <h2>Cities List</h2>
      <ul>
        {cities.map((city) => (
          <li key={city.value}>
            {editCity && editCity.value === city.value ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editCity.name}
                  onChange={handleFieldChange}
                />
                <input
                  type="text"
                  name="foundedAt"
                  value={editCity.foundedAt}
                  onChange={handleFieldChange}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className={styles.block}>
                <p>
                  {city.name}, {city.foundedAt}
                </p>
                <div>
                  <button onClick={() => handleEditClick(city)}>Edit</button>
                  <button onClick={() => handleDeleteCity(city)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CityManagement
