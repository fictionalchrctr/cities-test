import { Request, Response } from 'express'
import databaseService from '../db/db.service'
import { ICity } from '../types/types'

const citiesController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const cities = await databaseService.getFileData('cities.db.json')
      return res.status(200).send(cities)
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже!'
      })
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const newCity = req.body
      const cities: ICity[] =
        await databaseService.getFileData('cities.db.json')
      cities.push(newCity)
      await databaseService.writeDataToFile('cities.db.json', cities)
      res.status(201).send({ message: 'Город успешно добавлен', city: newCity })
    } catch (error) {
      res.status(500).json({
        message: 'Ошибка при добавлении города'
      })
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const cityToDelete = req.params.cityValue
      const cities: ICity[] =
        await databaseService.getFileData('cities.db.json')
      const filteredCities = cities.filter(
        (city) => city.value !== cityToDelete
      )
      if (filteredCities.length < cities.length) {
        await databaseService.writeDataToFile('cities.db.json', filteredCities)
        res
          .status(200)
          .json({ message: 'Город успешно удален', city: cityToDelete })
      } else {
        res.status(404).json({ message: 'Город не найден' })
      }
    } catch (error) {
      res.status(500).json({
        message: 'Ошибка при удалении города'
      })
    }
  },
  edit: async (req: Request, res: Response) => {
    try {
      const cityValue = req.params.cityValue
      const updatedCityData = req.body
      const cities = await databaseService.getFileData('cities.db.json')
      const updatedCitiesList = cities.map((city: ICity) => {
        if (city.value === cityValue) {
          return { ...city, ...updatedCityData }
        }
        return city
      })
      await databaseService.writeDataToFile('cities.db.json', updatedCitiesList)
      res.status(200).json({ message: 'Данные города успешно обновлены' })
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении данных города' })
    }
  }
}

export default citiesController
