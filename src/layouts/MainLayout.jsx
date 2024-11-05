import { Outlet } from 'react-router-dom'
import '@/css/style.css'
import {Header} from '@/components'
function MainLayout() {

    return (
        <>
            <div className='flex align-middle justify-between flex-col min-h-screen '>
                <Header/>
                <Outlet />
                <footer className='h-10 bg-slate-300 text-sky-900 p-2'>Footer</footer>
            </div>
        </>
    );
}

export default MainLayout;