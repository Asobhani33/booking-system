
import Resource from '../models/Resource.js'


export async function getAllResources (req,res) {

    try {
        const Sesource = await Resource.find({businessId: req.params.businessId})
         res.status(200).json(Sesource)

    } catch (error) {
        
        console.error('errore in get all rresource',error)
        res.status(500).json({message:'internal server'})
    }
    
}
    
//getResourceById

export async function getResourceById(req,res){
try {
    const id = req.params.id
    const resource = await Resource.findById(id)

    if (!resource){
        return res.status(404).json({message: 'Resource not found'})
    }
    res.status(200).json(resource)
    
} catch (error) {
    console.error('error to get resource')
    res.status(500).json({message: 'internal server error'})
}
}

export async function creatResource(req,res) {
    try {
        const {name, type, capacity,isActive, businessId} = req.body
        
        const existResourc = await Resource.findOne({businessId ,name })
        if (existResourc){
            return res.status(400).json({message: 'this Resource already exists '})
        }
        const resource = new Resource({
            name,
            type,
            capacity,
            isActive,
            businessId
        })
       await resource.save()
        res.status(201).json({message:' this Resource succesfully created'})
  
    } catch (error) {
        console.error('error in sarver',error)
        res.status(500).json({message:'internal error in server'})
    }
}

//updateResource

export async function updateResource(req,res) {
    try {
        const id= req.params.id
        const { name, type, capacity, isActive } = req.body
        const resource = await Resource.findByIdAndUpdate(id, {name, type, capacity, isActive}, {new: true})
        if(!resource){
            return res.status(404).json({message: "Resource not find"})
        }
        res.status(200).json({message: 'Resource succesfully updated'})
    } catch (error) {
        console.error('error to update Resource',error)
        res.status(500).json({message: 'internal error in server'})
    }
    
}

//deleteResource
export async function deleteResource(req ,res) {
    try {
        const id = req.params.id
        const resource = await Resource.findByIdAndDelete(id)

        if(!resource){
            return res.status(404).json({message:' there is no this Resource'})
        }
        res.status(200).json({message: 'Resource successfully deleted'})

        
    } catch (error) {
        console.error('error in delet resource',error)
        res.status(500).json({message: 'internal error in server'})
    }
    
}