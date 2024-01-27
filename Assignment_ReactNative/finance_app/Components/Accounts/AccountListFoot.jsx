import { View, Text, StyleSheet, Pressable, Modal, Button, Alert, TextInput, TouchableOpacity } from 'react-native';
import IonIcons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react'
import { postaccdata } from '../../redux/Slices/AccountSlice';
import { postcategdata } from '../../redux/Slices/CategorySlice';
import { useDispatch } from 'react-redux';
const AccountListFoot = ({ heading, field, placeholderMsg }) => {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const [togg, setTogg] = useState(false);
    const [inpdata, setInpdata] = useState({
        acctype:'',
        categname:'',
        // initbalance:null
    });

    const handlesubmit=()=>{
        if(field){
            if(togg){
                dispatch(postcategdata({type:"income", category:inpdata.categname}))
            }
            else{
                dispatch(postcategdata({type:"expense", category:inpdata.categname}))
            }
        }
        else{
            dispatch(postaccdata({balance:0, type:inpdata.acctype}))
        }
    }
    return (
        <>
            <Modal
                animationType='slide'
                visible={isVisible}
                transparent={true}
            >
                <View style={styles.modal}>
                    <View style={styles.modalinfo}>
                        <Text style={styles.headertext}>Create {heading}</Text>
                        {
                            field &&
                            (
                                <View style={styles.expInc}>
                                    <TouchableOpacity
                                        style={styles.exp}
                                        onPress={() => setTogg(false)}
                                    >
                                        <Text
                                            style={[
                                                styles.txt,
                                                togg===false?{color:'red'}:null
                                            ]}
                                        >Expense</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.inc}
                                        onPress={() => setTogg(true)}
                                    >
                                        <Text style={[
                                            styles.txt,
                                            togg?{color:'green'}:null
                                            ]}>Income</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        <TextInput 
                        style={styles.textinput} 
                        value={field?inpdata.categname:inpdata.acctype} 
                        textContentType='name' 
                        placeholder={placeholderMsg}
                        onChangeText={(text)=>(field?setInpdata({...inpdata, acctype:'',
                        categname:text, initbalance:null}): setInpdata({...inpdata, acctype:text,
                        categname:'',}))}
                        />
                        {/* {field === true ? null : <TextInput editable={false}  onChangeText={()=>setInpdata({...inpdata, initbalance:0})} keyboardType='numeric' style={styles.textinput} placeholder='Inital Balance' />} */}
                        <View style={styles.modalbtn}>
                            <Text style={styles.modalbtntext} onPress={() => handlesubmit()}>Save</Text>
                            <Text style={styles.modalbtntext} onPress={() => (setIsVisible(!isVisible), setTogg(false))}>Close</Text>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable style={styles.moreacc} onPress={() => setIsVisible(!isVisible)}>
                <IonIcons name="add-circle-outline" size={30} />
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Add More {heading}</Text>
            </Pressable>
        </>
    )
}

export default AccountListFoot;

const styles = StyleSheet.create({
    moreacc: {
        marginVertical: 20,
        padding: 5,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalinfo: {
        width: 360,
        // height:350,
        padding: 5,
        paddingBottom: 20,
        backgroundColor: 'white',
        flexDirection: 'column',
        gap: 20
    },
    headertext: {
        fontSize: 20,
        fontWeight: '700',
    },
    modalbtn: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 10
    },
    modalbtntext: {
        width: '45%',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        textAlign: 'center',
        padding: 10,
        fontSize: 20
    },
    textinput: {
        width: '100%',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        // marginBottom:100,
        padding: 5
    },
    expInc: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        shadowColor: 'black',
        gap: 15,
    },
    exp: {
        width: '50%',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7
    },
    inc: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        alignItems: 'center',
        padding: 7
    },
    txt:{
        fontSize:16,
        fontWeight:'600'
    }

})