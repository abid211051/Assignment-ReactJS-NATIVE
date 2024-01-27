import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import AccountModal from '../../Components/CreateIncExp/AccountModal';
import CategoryModal from '../../Components/CreateIncExp/CategoryModal';
import { postincExpdata } from '../../redux/Slices/IncExpSlice';
import { useDispatch } from 'react-redux';

const AddincomeExpense = () => {
  const dispatch = useDispatch();
  const [toggIncExp, setToggIncExp] = useState(false);
  const [toggAcc, setToggAcc] = useState(false);
  const [toggCate, setToggCate] = useState(false);
  const [accType, setAccType] = useState(null);
  const [category, setCategory] = useState(null);
  const [formdata, setFormData] = useState({
    ammount: null,
    description: null
  })

  const changeAccTogg = () => {
    setToggAcc(false);
  }
  const changeCateTogg = () => {
    setToggCate(false);
  }
  const changeAccType = (val) => {
    setAccType(val);
  }
  const changeCategory = (val) => {
    setCategory(val);
  }

  const handleSubmit = () => {
    if (accType === null || category === null || formdata.ammount === null || formdata.description === null) {
      alert('Please Select All the field Before creating a new Data')
    }
    else {
      if (toggIncExp) {
        dispatch(postincExpdata({
          type: 'Income',
          accountId: accType.accId,
          account: accType.acctype,
          accountBalance: accType.accbalance,
          category: category,
          ammount: formdata.ammount,
          description: formdata.description
        }))
      }
      else {
        dispatch(postincExpdata({
          type: 'Expense',
          accountId: accType.accId,
          account: accType.acctype,
          accountBalance: accType.accbalance,
          category: category,
          ammount: formdata.ammount,
          description: formdata.description
        }))
      }
      setAccType(null);
      setCategory(null);
      setFormData({ ammount: null, description: null });
    }
  }
  return (
    <ScrollView style={styles.container}
      automaticallyAdjustContentInsets={true}
      contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 30 }}>
      <TouchableOpacity style={{ width: '100%' }} onPress={handleSubmit}>
        <Text style={styles.savebtn}>CREATE</Text>
      </TouchableOpacity>
      <View style={styles.overallview}>
        <View style={styles.expInc}>
          <TouchableOpacity style={styles.exp} onPress={() => setToggIncExp(false)}>
            <Text style={[styles.text, toggIncExp === false ? { color: 'red' } : null]}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inc} onPress={() => setToggIncExp(true)}>
            <Text style={[styles.text, toggIncExp ? { color: 'green' } : null]}>Income</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.overallview}>
        <View style={styles.acccategView}>
          <View style={styles.acccategTxt}>
            <Text style={styles.text}>Account</Text>
            <Text style={styles.text}>Category</Text>
          </View>
          <View style={styles.acccategBtnView}>
            <TouchableOpacity style={styles.acccategBtn} onPress={() => setToggAcc(!toggAcc)}>
              {toggAcc && <AccountModal toggAcc={toggAcc} changeAccType={changeAccType} changeAccTogg={changeAccTogg} />}
              <Text style={styles.textbtn}>{accType !== null ? accType.acctype : 'Account'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acccategBtn} onPress={() => setToggCate(!toggCate)}>
              {toggCate && <CategoryModal toggIncExp={toggIncExp} toggCate={toggCate} changeCategory={changeCategory} changeCateTogg={changeCateTogg} />}
              <Text style={styles.textbtn}>{category !== null ? category : 'Category'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TextInput style={styles.txtinput}
        placeholder="Enter text here"
        textAlignVertical='top'
        multiline={true}
        value={formdata.description}
        onChangeText={(text) => (setFormData({ ...formdata, description: text }))}
      />
      <TextInput
        style={{
          width: '100%',
          height: 70,
          marginTop: 20,
          padding: 2,
          fontSize: 23,
          textAlign: 'justify',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'black',
        }}
        value={formdata.ammount}
        placeholder="Enter Ammount"
        keyboardType='numeric'
        onChangeText={(text) => (setFormData({ ...formdata, ammount: text }))}
      />
    </ScrollView>
  );
};

export default AddincomeExpense;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5,
    flex: 1,
    backgroundColor: 'white'
  },
  savebtn: {
    width: '100%',
    padding: 5,
    textAlign: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '600',
    color: 'green'
  },
  overallview: {
    width: '100%',
    marginBottom: 20,
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
  acccategView: {
    flexDirection: 'column'
  },
  acccategTxt: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  acccategBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    marginTop: 4
  },
  acccategBtn: {
    width: '48%',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbtn: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    padding: 7
  },
  txtinput: {
    width: '100%',
    height: 100,
    padding: 2,
    fontSize: 17,
    textAlign: 'justify',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  ScrollView: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600'
  },
})