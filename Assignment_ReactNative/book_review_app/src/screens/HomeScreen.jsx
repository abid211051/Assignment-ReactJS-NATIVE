import { View, StyleSheet, FlatList } from 'react-native';
import {useSelector} from 'react-redux';
import React, { useEffect } from 'react'
import HomeScreenHeader from '../components/Home/HomeScreenHeader';
import HomeScreenMain from '../components/Home/HomeScreenMain';
import { useDispatch } from 'react-redux';
import { getbooksData } from '../redux/Slices/BookSlice';
import { useIsFocused } from '@react-navigation/native';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {filterdBook} = useSelector(state=>state.books);
  useEffect(() => {
    dispatch(getbooksData());
  }, [])
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        ListHeaderComponent={<HomeScreenHeader />}
        data={filterdBook}
        renderItem={({ item }) => (<HomeScreenMain item={item}/>)}
        keyExtractor={(item, index) => item+index.toString()}
      />
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flatlist: {
    width: '95%'
  },
  txt: {
    fontSize: 19,
    fontWeight: '500'
  }
})