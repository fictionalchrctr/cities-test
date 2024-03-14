import { Router } from 'express'

import listsController from '../controllers/lists.controller'

const listsRoute = Router({ mergeParams: true })

listsRoute.get('/', listsController.getAll)

listsRoute.post('/', listsController.createList)

export default listsRoute
