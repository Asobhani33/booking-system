import express from 'express'  // framework 
import dotenv from 'dotenv'  //
import cors from 'cors'   //to relation between backend and fronend
import path from 'path'
import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import businessRoutes from './routes/businessRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import resourceRoutes from './routes/resourceRoutes.js'
import bookinRoutes from './routes/bookingRoutes.js'


dotenv.config()  
const app = express()
const PORT = process.env.PORT || 5001   //first read from .env  if you can't find user 5001
const __dirname = path.resolve()

app.use(express.json())  
app.use(cors())


connectDB().then(()=>{

    app.use('/api/auth', authRoutes)
    app.use('/api/business', businessRoutes)
    app.use('/api/service', serviceRoutes)
    app.use('/api/resources', resourceRoutes)
    app.use('/api/booking', bookinRoutes)

    if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
    })
    }
    app.listen(PORT, () =>{     //to restart server atumaticaly for any change  
        
    console.log('Server Started on '+PORT)
})


})