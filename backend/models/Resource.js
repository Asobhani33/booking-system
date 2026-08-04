import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({

businessId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Business',
    required: true

},
name:{
    type: String, //chair,table, 

},
type:{
    type: String,
    required: true
},
capacity:{
    type: Number ,
    required: true
},
isActive:{
    type: Boolean
}

},{timestamps:true});

const Resource = mongoose.model( 'Resources', resourceSchema)
export default Resource