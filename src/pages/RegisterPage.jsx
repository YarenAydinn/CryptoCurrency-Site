import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { HotCryptos } from '@/components'

const RegisterPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            console.log("account created");
            navigate('/login')
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        setEmail('')
        setPassword('')
    }, [])
    return (
        <div className='flex gap-4'>
            <div className=''>
                <form className='signup-form w-96 m-auto text-black' onSubmit={handleSubmit}>
                    <h2><b>Create Accound</b></h2>

                    {/* <label htmlFor="firstName">First Name</label>
                    <input type="text" name='firstName' required /> */}

                    <label htmlFor="email">Email:</label>
                    <input type="text" name='email' onChange={(event) => setEmail(event.target.value)} required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" name='password' onChange={(event) => setPassword(event.target.value)} required />

                    <button type="submit">Sign Up</button>
                    <p>Already Registered? <a style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</a></p>
                </form>
            </div>
            {/* <div className='flex flex-col bg-slate-800 rounded-3xl w-full p-10 justify-center content-center'> */}
            <div className='p-4 rounded-xl min-w-96 bg-slate-900'>
                <HotCryptos />
            </div>
        </div>
    )
}
export default RegisterPage