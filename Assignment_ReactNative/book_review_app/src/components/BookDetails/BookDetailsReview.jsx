import { View, Text, StyleSheet } from 'react-native';
import IonIcons from '@expo/vector-icons/Ionicons'
import React from 'react';
const BookDetailsReview = ({item}) => {
  return (
    <View style={styles.reviewView}>
      <Text style={{fontSize:18, fontWeight:'600', color:'#F5820C'}}>{item.email}</Text>
      <Text style={{fontSize:15,}}>{item.comment}</Text>
      <Text>{item.rating} <IonIcons name='star' size={15}/></Text>
    </View>
  )
}

export default BookDetailsReview;

const styles = StyleSheet.create({
  reviewView:{
    borderBottomWidth:2,
    borderColor:'gray',
    borderStyle:'solid',
    marginBottom:40
  }
})