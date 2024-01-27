import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeCard from '../../Components/Home/HomeCard'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

const MyWallet = () => {
  const isFocused = useIsFocused();
  const [ammount, setAmmount] = useState({
    income: 0,
    expense: 0,
    total: 0
  })
  const { incExp } = useSelector(state => state.incExp);
  useEffect(() => {
    if (isFocused) {
      let inc = 0;
      let exp = 0;
      for (const key in incExp) {
        if (incExp[key].type === "Income") {
          inc += Number(incExp[key].ammount);
        }
        else if (incExp[key].type === "Expense") {
          exp += Number(incExp[key].ammount);
        }
      }
      setAmmount({ income: inc, expense: exp, total: inc - exp });
    }
  }, [isFocused])
  return (
    <View style={styles.container}>
      <View style={styles.overallview}>
        <View style={styles.expInc}>
          <View style={styles.exp}>
            <Text style={styles.exptxt}>Expense</Text>
            <Text style={styles.exptxt}>-{ammount.expense} ৳</Text>
          </View>
          <View style={styles.inc}>
            <Text style={styles.inctext}>Income</Text>
            <Text style={styles.inctext}>{ammount.income} ৳</Text>
          </View>
        </View>
        <View style={styles.total}>
          <Text style={[styles.totaltxt, ammount.total < 0?{color:'red'}:{color:'black'}]}>Total balance</Text>
          <Text style={[styles.totaltxt, ammount.total < 0?{color:'red'}:{color:'black'}]}>{ammount.total} ৳</Text>
        </View>
      </View>
      <FlatList
        style={styles.flat}
        data={incExp}
        renderItem={({ item }) => (<HomeCard item={item} />)}
        keyExtractor={(item) => item.Id.toString()}
      />
    </View>
  )
}

export default MyWallet;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  overallview: {
    width: '100%',
    marginBottom:15,
    padding: 10,
  },
  headertext: {
    fontSize: 20,
    fontWeight: '700',
  },
  expInc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderStyle: 'solid'
  },
  exp: {
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderStyle: 'solid',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inc: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  total: {
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  exptxt: {
    fontSize: 16,
    fontWeight: '600',
    color: 'red'
  },
  inctext: {
    fontSize: 16,
    fontWeight: '600',
    color: 'green'
  },
  totaltxt: {
    fontSize: 16,
    fontWeight: '600'
  },
  flat: {
    width: '95%',
    height: 'auto',
  },
})