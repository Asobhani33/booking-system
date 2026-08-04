import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    businessId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    resourceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
        required: true
    },
    serviceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    startTime:{
        type: String,
        required: true
    },
    endTime:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    notes:{
        type: String
    }

},{ timestamps: true })

const Booking = mongoose.model('Booking', bookingSchema)
export default Booking