import { Router } from 'express'
const router = Router({ mergeParams: true })
import citiesRoute from './cities.routes'
import listsRoute from './lists.routes'

router.use('/cities', citiesRoute)

router.use('/lists', listsRoute)

export default router
