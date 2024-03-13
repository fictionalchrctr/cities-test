import { Request, Response } from 'express'
import citiesList from '../db/cities.db.json'
import fs from 'fs'
import path from 'path'

const dbFilePath = path.resolve(__dirname, '../db/cities.db.json')

const citiesController = {
  getAll: async (req: Request, res: Response) => {
    try {
      return res.status(200).send(citiesList)
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже!'
      })
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const newCity = req.body
      console.log('req.body', req.body)

      console.log('newCity', newCity)

      citiesList.push(newCity)
      fs.writeFileSync(dbFilePath, JSON.stringify(citiesList, null, 2))
      res.status(201).send({ message: 'Город успешно добавлен', city: newCity })
      console.log('citiesList', citiesList)
    } catch (error) {
      res.status(500).json({
        message: 'Ошибка при добавлении города'
      })
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const cityToDelete = req.body.value
      console.log('req.body', req.body.value)
      const filteredCities = citiesList.filter((c) => c.value !== cityToDelete)
      console.log('filteredCities', filteredCities)

      if (filteredCities.length < citiesList.length) {
        fs.writeFileSync(dbFilePath, JSON.stringify(filteredCities))
        res
          .status(200)
          .json({ message: 'Город успешно удален', city: cityToDelete })
        console.log('filteredCities', filteredCities)
      } else {
        res.status(404).json({ message: 'Город не найден' })
      }
    } catch (error) {
      res.status(500).json({
        message: 'Ошибка при удалении города'
      })
    }
  }
}

export default citiesController
