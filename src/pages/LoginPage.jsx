import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'

const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signInWithEmailAndPassword(auth, email, password).then((userCredendial) => {
            console.log("userCredendial", userCredendial);
            navigate('/');
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {

    }, [])

    return (
        <div>

            <form className='signup-form w-96 text-black m-auto' onSubmit={handleSubmit}>

                <h2><b>Login</b></h2>

                <label htmlFor="email" >Email:</label>
                <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="password" >Password:</label>
                <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Login</button>

                <p>Dont  have an accound?<a style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Register</a></p>
                <p>Forgot Password?<a style={{ cursor: 'pointer' }}>Reset Password</a></p>


            </form>
        </div>
    )

}
export default LoginPage