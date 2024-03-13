import { Router } from 'express'
import citiesList from '../db/cities.db.json'
import citiesController from '../controllers/cities.controller'

const citiesRoute = Router({ mergeParams: true })

citiesRoute.get('/', citiesController.getAll)

export default citiesRoute
