import { Outlet } from 'react-router-dom'

function PublicLayout() {

    return (
        <>
            <div className='flex flex-row justify-center items-center min-h-screen'>
                <Outlet/>
            </div>
        </>
    );
}

export default PublicLayout;