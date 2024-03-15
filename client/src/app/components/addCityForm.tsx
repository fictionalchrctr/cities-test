import React, { useState } from 'react'

interface AddCityFormProps {
  onSubmit: (city: { name: string; value: string; foundedAt: string }) => void
}

const AddCityForm: React.FC<AddCityFormProps> = ({ onSubmit }) => {
  const [newCity, setNewCity] = useState({ name: '', value: '', foundedAt: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCity((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(newCity)
    setNewCity({ name: '', value: '', foundedAt: '' })
  }

  return (
    <form className="addCityForm" onSubmit={handleSubmit}>
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
  )
}

export default AddCityForm
