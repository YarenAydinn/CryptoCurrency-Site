import { useNavigate } from 'react-router-dom'
import { HotCryptos, News } from '@/components'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


export default function HomePage() {
    const navigate = useNavigate()
    const [authClassName, setAuthClassName] = useState('transactionButtons hide')
    const [authStatusSignClass,setAuthStatusSignClass]=useState('')
    

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthClassName('transactionButtons')
                setAuthStatusSignClass('authStatusSignUp hide')
            } else {
                setAuthClassName('transactionButtons hide')
                setAuthStatusSignClass('')
            }
        })
        return () => unsubscribe()
    }, [])
 

    return (
        <div className='flex '>
            <div className='content-center  w-full justify-center'>
                <h1 className='text-4xl p-9'>
                    Discuss Everything Crypto on
                    <div className='text-yellow-600 text-5xl'>This Platform</div>
                </h1>
                <div className={`${authClassName} gap-4 flex flex-nowrap justify-center`}>
                    <button className='w-36 h-12 bg-yellow-600 rounded-lg' onClick={()=>navigate('/marketpage')}>Market</button>
                    <button className='w-36 h-12 bg-yellow-600 rounded-lg' >Trade</button>
                    <button className='w-36 h-12 bg-yellow-600 rounded-lg' onClick={()=>navigate('/convert')}>Convert</button>
                </div>
                <div className='flex m-4 justify-center'>
                    <button className={`${authStatusSignClass} w-36 h-12 bg-yellow-600 rounded-lg`} onClick={() => navigate('/register')}>Sign Up</button>
                </div>
            </div>
            <div className='flex flex-col w-full pb-12'>
                <div className='bg-slate-900 rounded-3xl w-2/3 p-10 mt-10'>

                    <HotCryptos />
                    <button className='w-24 h-9 rounded-xl bg-yellow-600' onClick={()=> navigate('/cryptolistpage')}>List</button>
                </div>
                <div className='bg-slate-900 rounded-3xl w-2/3  p-10 mt-10 mb-5'>
                    <News />
                    <button className='w-24 h-9 rounded-xl  mt-12 bg-yellow-600 ' onClick={()=> navigate('/blog')}>List</button>
                </div>
            </div>
        </div>
    )
}
