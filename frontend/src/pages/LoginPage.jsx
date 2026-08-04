import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import api from '../lib/axios'
import toast from 'react-hot-toast'




function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await api.post('/auth/login', { email, password })
            login(res.data.user, res.data.token)
            toast.success('Login successful')
            navigate('/')
        } catch (error) {
            toast.error('Invalid email or password')
        } finally {
            setLoading(false)
        }
   
    }

    return (
<div className="min-h-screen flex items-center justify-center">
    <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title">Login</h2>
            <form onSubmit={handleSubmit}>

            <label className="label">Email</label>
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" 
            />

            <label className="label">Password</label>
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}   
                className="input" 
                placeholder="Password" />

            <button type="submit" className="btn btn-neutral mt-4">Login</button>
            </form>
        </div>
    </div>
</div>
    )
}

export default LoginPage