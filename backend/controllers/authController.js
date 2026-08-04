import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';




export async function register (req, res){

    try {

        const {name, lastName, email, phone, password} = req.body

        const existingUser =await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({message: 'Email already exists'})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({
            name,
            lastName,
            email,
            phone,
            password: hashedPassword
        })
        await user. save()

        res.status(201).json({message: 'User registered successfully'})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }

}

export async function  login(req, res){
    try {
        const {email ,password} = req.body
        const user  = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'Invalid credentials'})
        }

        const isPasswordCorrect  = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message : ' invalid credentials'})
        }

        const token = jwt.sign(
            {userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        )

        res.status(200).json({
            message: 'Login successful',
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })




    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}