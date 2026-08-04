import mongoose from 'mongoose';
// Plans
const planSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    price:{
           type: Number,
        required: true
    },

    features:{

       type: [String],
        required: true,
        default:[]
    }
})
const Plan = mongoose.model('Plan' , planSchema)

export default Plan