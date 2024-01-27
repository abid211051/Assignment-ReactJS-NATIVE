import { View, Text, Image, StyleSheet, SectionList, TouchableOpacity, Alert } from 'react-native';
import IonIcons from '@expo/vector-icons/Ionicons';
import React, { useEffect } from 'react'
import AccountListFoot from '../../Components/Accounts/AccountListFoot';
import { useDispatch, useSelector } from 'react-redux';
import { deletecategory } from '../../redux/Slices/CategorySlice';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);
  const handleDeleteCategory=(item, title)=>{
    Alert.alert(
      'Delete Category',
      "Are you Sure?",
      [
        {text:"Cancel", onPress:()=>null},
        {text:"Ok", onPress:()=>{
          if(title==="Income Categories"){
            dispatch(deletecategory({Id:item.Id, type:"income"}));
          }
          else{
            dispatch(deletecategory({Id:item.Id, type:"expense"}));
          }
        }}
      ],
      {cancelable:false}
    )
  }
  return (
    <View style={styles.container}>
      <SectionList
        removeClippedSubviews={false}
        style={styles.flat}
        sections={categories}
        keyExtractor={(item, index) => item.Id.toString()}
        renderItem={({ item, section:{title} }) => (
          <View style={styles.card}>
            <View style={styles.imgview}>
              <Image
                source={require('../../assets/transaction.png')}
                style={{ width: 50, height: 50, borderWidth: 2, borderColor: 'black', padding: 2 }}
              />
            </View>
            <View style={styles.infoView}>
              <View>
                <Text style={styles.uptext}>{item.category}</Text>
              </View>
              <TouchableOpacity onPress={()=>handleDeleteCategory(item, title)}>
                <Text><IonIcons name='menu-outline' size={25} /></Text>
              </TouchableOpacity>
            </View>
          </View>
        )
        }
        renderSectionHeader={({section:{title}}) => (
          <Text style={styles.titletxt}>{title}</Text>
        )}
        ListFooterComponent={<AccountListFoot heading={'Category'} field={true} placeholderMsg={'Category Name'} />}
      />
    </View >
  )
}

export default Categories;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  flat: {
    width: '95%',
    paddingHorizontal: 5,
    height: 'auto',
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  imgview: {
    width: '15%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  infoView: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  titletxt: {
    fontSize: 23,
    fontWeight: '600',
    color: 'green',
    marginBottom: 5,
    borderBottomWidth: 2,
    borderColor: 'gray',
    borderStyle: 'solid'
  },
  uptext: {
    fontSize: 16,
    fontWeight: '600',
  },
})