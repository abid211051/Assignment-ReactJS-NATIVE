import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreenMain = ({item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
    onPress={()=>navigation.navigate("Details", {item})}
      style={style.cardmainView}>
      <View style={{ width: '53%', height: '100%' }}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{ uri: `${item.imageLink}` }} />
      </View>
      <View style={style.cardtextView}>
        <View style={style.cardtextViewUp}>
          <View>
            <Text style={style.titletxt}>NAME</Text>
            <Text style={style.maintxt}>{item.name}</Text>
          </View>
          <View>
            <Text style={style.titletxt}>AUTHOR</Text>
            <Text style={style.maintxt}>{item.author}</Text>
          </View>
          <View>
            <Text style={style.titletxt}>GENRES</Text>
            <Text style={style.maintxt}>{item.category}</Text>
          </View>
        </View>
        <View>
          <Text style={style.titletxt}>PUBLISHED ON</Text>
          <Text style={[style.maintxt, {marginBottom:5}]}>{item.publicationDate}</Text>
          <Text style={{textAlign:'left', fontWeight:'600'}}>Click on Card for Details...</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default HomeScreenMain;

const style = StyleSheet.create({
  cardmainView: {
    width: '100%',
    height: 316,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    gap: 7,
    marginBottom: 20,
    borderRadius:10,
    overflow:'hidden'
  },
  cardtextView: {
    width: '45%',
    height: '100%',
    // backgroundColor: 'lightgreen',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  titletxt: {
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: '700',
    color: '#4F5967'
  },
  cardtextViewUp: {
    height: '50%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  maintxt: {
    fontSize: 15,
    fontFamily: 'sans-serif',
    fontWeight: '700',
    color: '#8C39EB'
  }
})