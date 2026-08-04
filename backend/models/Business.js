import mongoose from 'mongoose';



const BusinessScema = new mongoose.Schema({

    catgory:{
        type:String,
        enum: ['salon', 'resturant', 'clinic', 'gym' ],
        required : true
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },

    name:{
        type: String  ,
        required:true,

    },
    countryCode:{
        type: String ,
        required: true
    },
    phone:{
        type: String  ,
        required: true
    },
    email:{
        type: String  ,
        required:true
    },
    state:{
        type: String  ,
        required: true
    },
    city:{
        type: String  ,
        required: true
    },
    address:{
        type: String  ,
        required: true
    },
    zipcode:{
        type: Number,
        required: true
    },
    plan:{

        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Plan',
        required: false
    },
    isActive:{
        type: Boolean,
        default: true
    }

},{timestamps: true});
const Business = mongoose.model('Business',BusinessScema)
export default Business
