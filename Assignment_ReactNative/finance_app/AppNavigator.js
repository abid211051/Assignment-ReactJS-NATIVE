import React, { useEffect, useState } from 'react'
import { UseDispatch, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SignIn from './Screens/Authentication/SignIn';
import SignUp from './Screens/Authentication/SignUp';
import MyWallet from './Screens/Dashboard/MyWallet';
import Ionicons from '@expo/vector-icons/Ionicons'
import Account from './Screens/Dashboard/Account';
import Categories from './Screens/Dashboard/Categories';
import AddincomeExpense from './Screens/Dashboard/AddincomeExpense';
import { getdata } from './redux/Slices/IncExpSlice';
import { getaccdata } from './redux/Slices/AccountSlice';
import { getcategdata } from './redux/Slices/CategorySlice';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigate = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#E59866',
        },
        headerTitleStyle: {
          fontSize: 30,
          fontFamily: 'serif',
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MyWallet}
        options={{
          tabBarIcon: () => <Ionicons name="home-sharp" size={20} />,
        }}
      />
      <Tab.Screen
        name="Accounts"
        component={Account}
        options={{
          tabBarIcon: () => <Ionicons name="wallet-sharp" size={20} />,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: () => <Ionicons name="grid-sharp" size={20} />,
        }}
      />
      <Tab.Screen
        name="Create"
        component={AddincomeExpense}
        options={{
          tabBarIcon: () => <Ionicons name="create-sharp" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getdata());
    dispatch(getaccdata());
    dispatch(getcategdata());
  },[])
  return (
    <>
      <Stack.Navigator initialRouteName='Wallet'>
        <Stack.Screen name='Wallet' component={TabNavigate} options={{ headerShown: false }} />
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
      </Stack.Navigator>
    </>
  )
}

export default AppNavigator;