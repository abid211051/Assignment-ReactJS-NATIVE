import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react'

const HomeCard = ({ item }) => {
  return (
    <View style={[styles.card, item.type==="Expense"?{borderColor:'#C93F14'}:'']}>
      <View style={styles.imgview}>
        <Image
          source={require('../../assets/transaction.png')}
          style={{ width: 50, height: 50, borderWidth: 2, borderColor: 'black', padding: 2 }}
        />
      </View>
        <View style={styles.infoView}>
          <View>
            <Text style={styles.uptext}>{item?.category}</Text>
            <Text style={styles.downtext}>{item?.account}</Text>
          </View>
          <View>
            <Text style={styles.uptext}>{item?.ammount}</Text>
          </View>
        </View>
    </View>
  )
}

export default HomeCard;
const styles = StyleSheet.create({
  card: {
    width:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'green',
    backgroundColor:'#F7F6ED'
  },
  imgview: {
    width:'20%',
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'center',
    padding: 5,
    borderRightWidth:2,
    borderColor:'gray',
    borderStyle:'solid',
  },
  infoView:{
    width:'80%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:5
  },
  uptext: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical:2,
  },
  downtext:{
    fontSize: 12,
    fontWeight: '600',
    marginVertical:2,
  }
})