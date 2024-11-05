import { useEffect, useState } from 'react'
import { auth } from '@/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Auth() {
    const navigate = useNavigate()
    const [authUser, setAuthUser] = useState(null)
    const [statusLogIn, setStatusLogIn] = useState([])
    const [statusLogOut, setStatusLogOut] = useState([])

    const listen = () => onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user)
            setStatusLogOut('statusLogOutButton')
            setStatusLogIn('statusLoginButton hide')
        }
        else {
            setAuthUser(null)
            setStatusLogOut('statusLogOutButton hide')
            setStatusLogIn('statusLoginButton')
        }
    })
    useEffect(() => {
        listen()
    }, [])

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('User signed out')
            })
            .catch(error => {
                console.error('Error signing out: ', error)
            })
    }

    return (
        <div className='flex'>

            {authUser ? (
                
                <div className='flex pl-4 gap-5 pr-6 content-center'>
                    <button className={`${statusLogIn}  w-36 Ph-12 bg-yellow-600 text-white rounded-lg `} onClick={() => navigate('/blog')} >Blog</button>
                    {/* <p> {authUser.email}</p> */}
                    <button className={`${statusLogIn} w-36 Ph-12 bg-yellow-600 text-white rounded-lg`} onClick={() => navigate('/')} >Home</button>
                    <button className={`${statusLogOut} w-36 h-12 bg-yellow-600 text-white rounded-lg`} onClick={handleLogout}>Logout</button>

                </div>
            ) : (
                <button className={`${statusLogIn} w-36 h-12 bg-yellow-600 text-white rounded-lg`} onClick={() => navigate('/login')} >Login</button>
            )}

            <FontAwesomeIcon icon={faUser} className='p-3 w-7 h-8 cursor-pointer' onClick={()=>navigate('/userprofile')} />
        </div>
    )
}