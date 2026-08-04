
import Booking from '../models/Booking.js'


export async function getAllBookings(req,res) {
    try {
        const booking = await Booking.find({businessId: req.params.businessId})
        res.status(200).json(booking)

    } catch (error) {
        console.error('Error in server' , error)
        res.status(500).json({message:'Internal server error'})
    }
}

export async function getBookingsByUser(req ,res) {
    try {
        const booking= await Booking.find({userId: req.params.userId})
        if (booking.length === 0){
            return res.status(404).json({message: ' no bookings found '})
        }
        res.status(200).json(booking)
    } catch (error) {
        console.error('error in server',error)
        res.status(500).json({message:'Internal server error'})
    }
}

export async function getBookingByBusineess(req, res) {
    try {
        const booking= await Booking.find({busineesId: req.params.busineesId})
        if(booking.length===0){
            return res.status(404).json({message: 'no bookings found'})
        }
        res.status(200).json(booking)

    } catch (error) {
        console.error('error in server',error)
        res.status(500).json({message:'internal error in server'})
    }
    
}

export async function createBooking(req, res) {
    try {
        const userId= req.user.userId
        const { businessId, resourceId, serviceId, date, startTime, endTime, status, notes} = req.body
        const exists =await Booking.findOne({businessId,userId,date,startTime,endTime})
        if(exists){
            return res.status(404).json({message: 'this time already booked '})
        }

        const booking = new Booking({
            userId, 
            businessId, 
            resourceId, 
            serviceId, 
            date, 
            startTime, 
            endTime, 
            status, 
            notes
        })
        await booking.save()
        res.status(201).json({message: 'time successfully bood'})
    } catch (error) {
        console.error('server error',error)
        res.status(500).json({message:'internal server error'})
    } 
}

//updateBooking       

export async function updateBooking(req, res) {
    try {
        const id = req.params.id
        const { resourceId, serviceId, date, startTime, endTime, notes } = req.body

        
        const booking = await Booking.findById(id)
        
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' })
        }

        // ۳. check the time
        const bookingDateTime = new Date(`${booking.date.toISOString().split('T')[0]}T${booking.startTime}`)
        const now = new Date()
        const hoursLeft = (bookingDateTime - now) / (1000 * 60 * 60)

        if (hoursLeft < 24) {
            return res.status(400).json({ message: 'Cannot update less than 24 hours before' })
        }

        // ۴. آپدیت کن
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { resourceId, serviceId, date, startTime, endTime, notes },
            { new: true }
        )

        res.status(200).json(updatedBooking)

    } catch (error) {
        console.error('error to update booking', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

//confirmBooking      
export async function confirmBooking(req, res) {
    try {
        const id = req.params.id
        
        const booking = await Booking.findByIdAndUpdate(id, {status: 'confirmed'},{new:true})
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' })
        }
       res.status(200).json({message: ' Booking successfully confirmed '})

    } catch (error) {
        console.error('there is error in confirmation',error)
        res.status(500).json({message:'internal error in server'})
        
    }
}


//deleteBooking 
export async function deleteBooking(req,res) {
    try {
        const id= req.params.id
        const booking = await Booking.findByIdAndDelete(id)
        if (!booking){
            return res.status(404).json({message:' Booking not found'})
        }
        res.status(200).json({message:' booking canceled'})
            
    } catch (error) {
        console.error('error to delete boocking ')
        res.status(500).json({message:'internal error in server'})
    }
}


// cancelation
export async function cancelBooking(req, res) {
    try {
        const id = req.params.id

        const booking = await Booking.findById(id)
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' })
        }

        const bookingDateTime = new Date(`${booking.date.toISOString().split('T')[0]}T${booking.startTime}`)
        const now = new Date()
        const hoursLeft = (bookingDateTime - now) / (1000 * 60 * 60)

        if (hoursLeft < 24) {
            return res.status(400).json({ message: 'Cannot cancel less than 24 hours before' })
        }

        booking.status = 'cancelled'
        await booking.save()

        res.status(200).json({ message: 'Booking cancelled successfully' })

    } catch (error) {
        console.error('error to cancel booking', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}