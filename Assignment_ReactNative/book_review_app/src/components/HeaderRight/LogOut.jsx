import { View, Text, TouchableOpacity } from 'react-native';
import {signOut} from'firebase/auth';
import {auth} from '../../../config/firbase';
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'

const LogOut = () => {

    const handleSignOut =async()=>{
        await signOut(auth);
    }
    return (
        <TouchableOpacity onPress={handleSignOut} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingRight: 8 }}>
            <Ionicons name='log-out' size={30} color={"white"} />
            <Text style={{ fontSize: 12, color: "white" }}>LogOut</Text>
        </TouchableOpacity>
    )
}

export default LogOut