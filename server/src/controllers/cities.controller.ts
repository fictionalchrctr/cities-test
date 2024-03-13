import { Request, Response } from 'express'
import citiesList from '../db/cities.db.json'

const citiesController = {
  getAll: async (req: Request, res: Response) => {
    try {
      return res.status(200).send(citiesList)
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже!'
      })
    }
  }
}

export default citiesController
