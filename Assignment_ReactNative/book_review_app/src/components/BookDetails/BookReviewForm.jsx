import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { postReviews } from '../../redux/Slices/ReviewSlice';
import useAuth from "../../Hooks/useAuth";
const BookReviewForm = ({bookId}) => {
    const {isAuth} = useAuth();
    const dispacth = useDispatch()
    const [txtinput, setTxtInput] = useState({
        rating: null,
        name: null,
        comment: null
    })
    const handleSubmit =()=>{
        if(txtinput.rating===null || txtinput.name===null || txtinput.comment===null){
            alert("Please Fill all the Input Field");
        }
        else{
            if(Number(txtinput.rating > 5)){
                alert("Rating has to be lower than or equal 5")
            }
            else{
                dispacth(postReviews({
                    bookId,
                    comment:txtinput.comment,
                    email:isAuth.email,
                    name:txtinput.name,
                    rating:txtinput.rating
                }))
            }
        }
    }
    return (
        <View style={{ borderTopWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
            <Text style={{ fontSize: 17, fontWeight: '600' }}>
                Rating:
                <Text style={{ fontSize: 13, color:'red'}}> (Not more than 5)</Text>
            </Text>
            <TextInput
                placeholder='Rating'
                keyboardType='numeric'
                value={txtinput.rating}
                style={[styles.textinput, { width: 55, height: 35 }]}
                onChangeText={(text) => (setTxtInput({ ...txtinput, rating: text }))}
            />
            <Text style={{ fontSize: 17, fontWeight: '600' }}>Name:</Text>
            <TextInput 
            placeholder='Your Name'
            value={txtinput.name}
            style={[styles.textinput, { height: 45 }]}
            onChangeText={(text) => (setTxtInput({ ...txtinput, name: text }))}
            />
            <Text style={{ fontSize: 17, fontWeight: '600' }}>Comment:</Text>
            <TextInput
                placeholder='Write your thought'
                value={txtinput.comment}
                style={[styles.textinput, { height: 80 }]}
                multiline={true}
                textAlignVertical='top'
                onChangeText={(text) => (setTxtInput({ ...txtinput, comment: text }))}
            />
            <Button title='Send Your Review' onPress={handleSubmit}/>
        </View>
    )
}

export default BookReviewForm;

const styles = StyleSheet.create({
    textinput: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: 16,
        padding: 3,
        marginBottom: 10
    }
})