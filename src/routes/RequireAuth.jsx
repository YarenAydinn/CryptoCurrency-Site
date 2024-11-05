import { useNavigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { useEffect } from 'react';

const RequireAuth = () => {
    const navigation = useNavigate();
    
    const authCheck = async () => {
        const isAuthenticatedC = await isAuthenticated();
        if (!isAuthenticatedC) {
            navigation('/login');
        }
        
    }
    
    const isAuthenticated = () => new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(true);
            } else {
                navigation('/login');
                resolve(false);
            }
        });
    });

    useEffect(() => {
        authCheck()
    }, [])

    return <Outlet />;
};

export default RequireAuth;
