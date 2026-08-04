import Business from '../models/Business.js';


export async function getAllBusinesses(req ,res) {
    try {
        const businesses = await Business .find()
        res.status(200).json(businesses)
        
    } catch (error) {
        console.error('Error in getAllBusinesses:', error)
        res.status(500).json({message : ' Internal server error'})
    }
}


export async function getBusinessById(req ,res){
    try {
        const id = req.params.id
        const business = await Business.findById(id)
        if(!business){
            return res.status(404).json({message: 'Business not found'})
        }

        res.status(200).json(business)


    } catch (error) {
        console.error('Error in getAllBusinesses:', error)
        res.status(500).json({message : 'Internal server error'})
        
    }
}

export async function createBusiness (req , res){
    try { 
        const {catgory, name, countryCode, phone, email, state, city, address, zipcode, plan, isActive} = req.body
        const owner = req.user.userId
        const existBusiness  = await Business.findOne({email})
        if(existBusiness){
            return res.status(400).json({message:'This business already existed'})
        }


            const business = new Business({
                catgory,
                owner,
                name,
                countryCode,
                phone,
                email,
                state,
                city,
                address,
                zipcode,
                plan,
                isActive
            })
            await business.save()

            res.status(201).json({message:'Business sucsesfully created'})
        

    } catch (error) {
        console.error(error)
        res.status(500).json({message : 'server error'})
    }
}


export async function updateBusiness(req,res) {
    try {
        const{name, phone, email, address, city, state, zipcode, countryCode, category, isActive}= req.body
        
        const id = req.params.id
       const updatedBusiness = await Business.findByIdAndUpdate(id,{ name, phone, email, address, city, state, zipcode, countryCode, category, isActive },{ new: true })


    if(!updatedBusiness){
        return res.status(404).json({message:'there is no this bussiness '})
    }


    res.status(200).json(updatedBusiness)
    
    } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
    }
}


export async function deleteBusiness(req, res) {
    try {
        
        const id = req.params.id
        const deleteBusiness= await Business.findByIdAndDelete(id)

        if(!deleteBusiness){
            return res.status(404).json({message: 'there is no this bussiness'})
        }
        res.status(200).json('Business deleted successfully')

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }   
}