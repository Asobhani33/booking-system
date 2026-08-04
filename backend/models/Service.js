import mongoose from 'mongoose';


const serviceSchema = new mongoose.Schema({

businessId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
},
name:{
    type: String,
    required:true
},
duration:{ 
    type: Number,
    required: true
},
price:{
    type: Number,
    required : true
},
isActive:{
    type: Boolean,
    required: true
}

},{timestamps: true})

const Service = mongoose.model('Service',serviceSchema)
export default Service