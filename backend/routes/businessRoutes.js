import express from 'express';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllBusinesses, getBusinessById, createBusiness, updateBusiness, deleteBusiness } from '../controllers/businessController.js'

const router = express.Router()

router.get('/', getAllBusinesses)
router.get('/:id', getBusinessById)
router.post('/',authMiddleware , createBusiness )
router.put('/:id',authMiddleware , updateBusiness )
router.delete('/id',authMiddleware , deleteBusiness )

export default router

