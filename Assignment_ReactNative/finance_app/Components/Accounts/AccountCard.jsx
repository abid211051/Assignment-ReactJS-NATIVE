import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import IonIcons from '@expo/vector-icons/Ionicons'
import React, { useEffect, useState } from 'react'
import UpdateDeleteModal from '../Modal/UpdateDeleteModal';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const AccountCard = ({ item }) => {
    const isFocused = useIsFocused();
    const [balance, setBalance] = useState(0);
    const {incExp} = useSelector(state=>state.incExp);
    const [toggupdateDelete, setToggUpdateDelete] = useState(false);
    useEffect(()=>{
        if(isFocused){
            let money = 0;
            for (const iterator of incExp) {
                if(iterator.accountId === item.Id){
                    if(iterator.type==="Income"){
                        money=Number(item.balance)+Number(iterator.ammount);
                    }
                    else{
                        money=Number(item.balance)-Number(iterator.ammount);
                    }
                }
            }
            setBalance(money);
        }
    },[isFocused])
    const changeToggUpdatedelete =()=>{
        setToggUpdateDelete(!toggupdateDelete);
    }
    return (
        <View style={styles.card}>
            <View style={styles.imgview}>
                <Image
                    source={require('../../assets/transaction.png')}
                    style={{ width: 50, height: 50, borderWidth:2, borderColor:'black', padding:2 }}
                />
                <View>
                    <Text style={styles.text}>{item?.type}</Text>
                    <Text style={styles.text}>Balance: {balance}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.moreview} onPress={()=>setToggUpdateDelete(true)}>
                {toggupdateDelete && <UpdateDeleteModal toggupdateDelete={toggupdateDelete} changeToggUpdatedelete={changeToggUpdatedelete} item={item}/>}
                <Text style={styles.text}><IonIcons name='menu-outline' size={25}/></Text>
            </TouchableOpacity>
        </View>
    )
}

export default AccountCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'green',
        backgroundColor:'#F7F6ED'
    },
    imgview: {
        flexDirection: 'row',
        padding: 5,
        gap: 10,
        // backgroundColor: 'lightyellow'
    },
    moreview:{
        paddingHorizontal:5
    },
    text:{
        fontSize:16,
        fontWeight:'600'
    }
})