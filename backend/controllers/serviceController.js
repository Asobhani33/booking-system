
import Service from '../models/Service.js'


export async function getAllServices (req , res) {
    try {
        const Services = await Service.find({businessId: req.params.businessId})
        res.status(200).json(Services)
        
    } catch (error) {
        console.error('Error in get All Serices', error)
        res.status(500).json({message: 'Internal server error'})
        
    }
}

export async function getServiceById(req, res) {
    try {
        const id = req.params.id
        const service = await Service.findById(id)
        if(!service){
            return res.status(404).json({message: 'Service not found'})
        }

        res.status(200).json({service})
        
    } catch (error) {
        console.error('Error in get Service by Id' , error)
        res.status(500).json({message: 'Internal server error'})
        
    }
    
}


export async function creatService(req,res) {
    try {
        const {name, duration, price, isActive, businessId}=req.body
        //const businessId= req.params.businessId
        const existService = await Service.findOne({businessId, name})
        if( existService){
            return res.status(400).json({message: 'This service already exists'})
        }

        const service = new Service({
        businessId,
        name,
        duration,
        price,
        isActive
    })
    await service.save()
    res.status(201).json({message: 'Service sucsesfully created'})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    } 
}

export async function updateService(req , res) {
    try {
        const{name, duration, price, isActive}=req.body
        const id = req.params.id
        const updateService = await Service.findByIdAndUpdate(id,{name, duration, price, isActive },{new:true}) 
        
        if (!updateService){
            return res.status(404).json({message: 'there is no this service'})
        }
        res.status(200).json({message:' Services sucsesfully updated'})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
}

export async function deleteService(req, res) {
    try {
        const id = req.params.id
        const deleteService = await Service.findByIdAndDelete(id)

        if(!deleteService){
            return res.status(404).json({message: ' there is no this service'})
        }
        res.status(200).json({message:'service sucsesfully deleted'})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Server error'}) 
    }
}