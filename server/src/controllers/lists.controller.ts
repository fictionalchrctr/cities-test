import { Request, Response } from 'express'
import databaseService from '../db/db.service'
import { IList } from '../types/types'

const listsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const lists = await databaseService.getFileData('lists.db.json')

      return res.status(200).send(lists)
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже!'
      })
    }
  },
  createList: async (req: Request, res: Response) => {
    try {
      const newList = req.body
      const lists: IList[] = await databaseService.getFileData('lists.db.json')
      lists.push(newList)

      await databaseService.writeDataToFile('lists.db.json', lists)
      res
        .status(201)
        .send({ message: 'Список городов успешно добавлен', list: newList })
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже!'
      })
    }
  }
}

export default listsController
