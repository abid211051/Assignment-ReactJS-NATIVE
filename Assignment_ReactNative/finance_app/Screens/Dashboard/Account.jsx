import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import AccountCard from '../../Components/Accounts/AccountCard';
import AccountListHeader from '../../Components/Accounts/AccountListHeader';
import AccountListFoot from '../../Components/Accounts/AccountListFoot';
const Account = () => {
  const {acc} = useSelector(state=>state.account);
  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews={false}
        ListHeaderComponent={() => <AccountListHeader />}
        ListFooterComponent={() => <AccountListFoot heading={'Account'} field={false} placeholderMsg={'Account Type'} />}
        style={styles.flat}
        data={acc}
        renderItem={({ item }) => (<AccountCard item={item} />)}
        keyExtractor={(item, index) => item.Id.toString()}
      />
    </View>
  );
};

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
});

export default Account;
