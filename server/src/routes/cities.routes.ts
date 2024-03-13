import { Router } from 'express'

import citiesController from '../controllers/cities.controller'

const citiesRoute = Router({ mergeParams: true })

citiesRoute.get('/', citiesController.getAll)

citiesRoute.post('/', citiesController.create)

citiesRoute.delete('/', citiesController.delete)

export default citiesRoute
