import { View, Text, StyleSheet,FlatList } from 'react-native'
import React, { useEffect } from 'react'
import BookDetailsHeader from '../components/BookDetails/BookDetailsHeader';
import BookDetailsReview from '../components/BookDetails/BookDetailsReview';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { getReviews } from '../redux/Slices/ReviewSlice';
import BookReviewForm from '../components/BookDetails/BookReviewForm';
const BookDetailsScreen = ({ route }) => {
  const bookdata = route.params.item;
  const {reviews} = useSelector(state=>state.review);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(()=>{
    if(isFocused){
      dispatch(getReviews(bookdata.id));
    }
  },[isFocused])
  return (
    <View style={styles.Container}>
      <FlatList
      removeClippedSubviews={false}
      style={styles.flatlist}
        ListHeaderComponent={<BookDetailsHeader bookdata={bookdata} />}
        data={reviews}
        renderItem={({ item }) => (<BookDetailsReview item={item}/>)}
        keyExtractor={(item, index) => item.key.toString()}
        ListFooterComponent={<BookReviewForm bookId={bookdata.id}/>}
      />
    </View>

  )
}

export default BookDetailsScreen;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  flatlist:{
    width:'100%',
    paddingHorizontal:15
  }
})