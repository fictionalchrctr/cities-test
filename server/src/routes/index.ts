import { Router } from 'express'
const router = Router({ mergeParams: true })
import citiesRoute from './cities.routes'

router.use('/cities', citiesRoute)

export default router
