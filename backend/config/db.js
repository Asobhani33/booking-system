import mongoose from 'mongoose'

export async function connectDB() {
    try {
        
            await mongoose.connect(process.env.MONGO_URI)
            console.log('MangoDB connected successfully')

    } catch (error) {
        console.error('Error connection to MangoDB: ', error )
        process.exit(1)
    }
    
}