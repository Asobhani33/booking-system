import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'

import {getAllServices,getServiceById, creatService, updateService, deleteService} from '../controllers/serviceController.js'

const router = express.Router()

router.get('/',getAllServices)
router.get('/id', getServiceById)
router.put('/id',authMiddleware, updateService)
router.post('/', authMiddleware , creatService)
router.delete('/id', authMiddleware ,deleteService)

export default router