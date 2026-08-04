import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { getAllBookings,getBookingByBusineess,getBookingsByUser,createBooking,updateBooking,cancelBooking,deleteBooking, confirmBooking } from '../controllers/bookingController.js'

const router = express.Router()
router.get('/',getAllBookings)

router.get('/business/:businessId',getBookingByBusineess)
router.get('/user/:userId',getBookingsByUser)

router.post('/',authMiddleware,createBooking)

router.put('/:id',authMiddleware,updateBooking)
router.put('/:id/cancel',authMiddleware,cancelBooking)
router.put('/:id/confirm',authMiddleware,confirmBooking)

router.delete('/:id',authMiddleware,deleteBooking)

export default router
