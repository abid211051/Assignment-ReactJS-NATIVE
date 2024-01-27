import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import React from 'react'

const BookDetailsHeader = ({bookdata}) => {
  return (
    <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <View style={[styles.detailsImg]}>
        <Image source={{ uri: `${bookdata.imageLink}` }} 
        style={{ width: '100%', height: '100%', objectFit: 'contain'}} />
      </View>
      <View style={styles.detailsheadingtxt}>
        <Text style={{ fontFamily: 'serif', fontSize: 27, fontWeight: '900' }}>{bookdata.name}</Text>
        <Text style={{ fontSize: 15, fontWeight: '800', color: '#57AFF3' }}>By: {bookdata.author}</Text>
        <View style={styles.categoryView}>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>CATEGORY:
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#305134', }}> {bookdata.category}</Text>
          </Text>
        </View>
        <View style={{marginBottom:40}}>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>SUMMARY:</Text>
          <Text style={{ fontSize: 16, fontWeight: '400', fontFamily: 'serif' }}>{bookdata.description}</Text>
        </View>
        <View style={styles.otherView}>
          <Text style={{ fontSize: 18, fontWeight: '700'}}>OTHERS:</Text>
          <View style={styles.othertxtView}>
            <Text style={styles.otherheading}>Country</Text>
            <Text >{bookdata.country}</Text>
          </View>
          <View style={styles.othertxtView}>
            <Text style={styles.otherheading}>Published In</Text>
            <Text>{bookdata.publicationDate}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom:10 }}>REVIEWS</Text>
      </View>
    </View>
  )
}

export default BookDetailsHeader;

const styles = StyleSheet.create({
    detailsImg: {
      width: '100%',
      height: 450,
      marginBottom: 20,
    },
    detailsheadingtxt: {
      width: '100%',
    },
    categoryView: {
      width: '100%',
      height: 50,
      borderStyle: 'solid',
      borderColor: 'gray',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 40
    },
    otherView:{
      flexDirection:'column',
      gap:8,
      marginBottom:20
    },
    otherheading:{
      fontSize:17,
      fontWeight:'700'
    },
    othertxtView:{
      width:'100%',
      borderStyle:'solid',
      borderColor:'gray',
      borderBottomWidth:1
    }
  })