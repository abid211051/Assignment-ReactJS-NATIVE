import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteacc } from '../../redux/Slices/AccountSlice'
const UpdateDeleteModal = ({toggupdateDelete, changeToggUpdatedelete, item}) => {
    const dispatch = useDispatch();
    const handleDelete=()=>{
        Alert.alert(
            "Delete Account",
            "Are you Sure?",
            [
                {text:"Cancel", onPress:()=>changeToggUpdatedelete()},
                {text:"Ok", onPress:()=> dispatch(deleteacc(item.Id))}
            ],
            {cancelable:false}
        )
    }
    return (
        <>
            <Modal
                animationType='slide'
                visible={toggupdateDelete}
                transparent={true}
            >
                <View style={styles.modal}>
                    <View style={styles.modalinfo}>
                        <Text style={styles.headertext}>Update or Delete Accounts</Text>
                        <TouchableOpacity style={styles.modalbtn} onPress={handleDelete}>
                            <Text style={[styles.modalbtntext, {borderColor:'red'}]}>Delete this Acoount</Text>
                        </TouchableOpacity>
                        <View>
                            <Text style={{fontSize:20, fontWeight:'700'}}>TYPE: {item.type}</Text>
                            <Text style={{fontSize:20, fontWeight:'700'}}>BALANCE: {item.balance}</Text>
                        </View>
                        <View style={[styles.modalbtn, {position:'absolute', bottom:4}]}>
                            <Text style={styles.modalbtntext} onPress={()=>changeToggUpdatedelete()}>Close Modal</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default UpdateDeleteModal;

const styles = StyleSheet.create({
    modal: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalinfo: {
        position:'relative',
        width: 360,
        height: 400,
        padding: 5,
        paddingBottom: 20,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems:'center',
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
        width: '100%',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        textAlign: 'center',
        padding: 10,
        fontSize: 20
    },
    txt: {
        fontSize: 16,
        fontWeight: '600'
    }
})