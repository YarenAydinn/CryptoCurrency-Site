import React, { useState, useEffect } from 'react';
import { updateProfile, updateEmail, onAuthStateChanged } from 'firebase/auth';
import { auth } from "@/firebase";

export default function UserProfile() {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const getuser = onAuthStateChanged(auth, (user) => {
            if (user) {
                setProfileData({
                    name: user.displayName || '',
                    email: user.email || '',
                });
            }
        });
        return () => getuser();
    }, []);

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        const user = auth.currentUser;
        if (user) {
            setError(null);
            setSuccess(null);
            try {
                if (profileData.name !== user.displayName) {
                    await updateProfile(user, { displayName: profileData.name });
                }

                if (profileData.email !== user.email) {
                    await updateEmail(user, profileData.email);
                }

                setSuccess('Profile updated successfully!');
                setIsEditing(false);
            } catch (error) {
                setError(error.message);
            }
        }
    };
    return (
        <div className='m-12 p-3'>
            <h1 className='text-xl'>Profile Page</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            {isEditing ? (
                <div>
                    <div>
                        <p className='p-4'>Name:</p>
                        <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleChange}
                            className='text-black w-2/6 h-12 p-3 bg-slate-300 rounded-xl '
                        />
                    </div>
                    <div>
                        <p className='p-4'>Email:</p>
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            className='text-black w-2/6 h-12 p-3  bg-slate-300 rounded-xl'
                        />
                    </div>
                    <button onClick={handleSave} className='w-36 h-12 bg-yellow-600 text-white rounded-lg m-5'>Save</button>
                    <button onClick={() => setIsEditing(false)} className='w-36 h-12 bg-yellow-600 text-white rounded-lg m-5'>Cancel</button>
                </div>
            ) : (
                <div className='flex flex-col  gap-9 m-4'>
                    <p>
                        <strong>Name</strong> 
                        <p className='border-2 w-2/6 h-12 p-3 text-black bg-slate-300 rounded-xl'>{profileData.name}</p>
                    </p>
                    <p>
                        <strong>Email</strong> 
                        <p className='border-2 w-2/6 h-12 p-3 text-black bg-slate-300 rounded-xl'>{profileData.email}</p>
                        
                    </p>
                    <button onClick={() => setIsEditing(true)} className='w-36 h-12 bg-yellow-600 text-white rounded-lg m-4'>Edit Profile</button>
                </div>
            )}
        </div>
    )


}
