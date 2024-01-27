import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firbase';

const useAuth = () => {
    const [isAuth, setIsAuth] = useState(null);
    useEffect(()=>{
        const subs = onAuthStateChanged(auth, user=>{
            if(user){
                setIsAuth(user);
            }
            else{
                setIsAuth(null);
            }
        })
        return subs;
    },[])

    return {isAuth};
}

export default useAuth