import express from 'express'

import { authMiddleware } from '../middleware/authMiddleware.js'
import { getAllResources, getResourceById, creatResource,updateResource,deleteResource } from '../controllers/resourceController.js'

const router = express.Router()

router.get('/', getAllResources)
router.get('/:id' , getResourceById)
router.post( '/',authMiddleware , creatResource)
router.put('/:id',authMiddleware, updateResource)
router.delete('/:id',authMiddleware, deleteResource)

export default router