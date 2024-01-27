import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import useAuth from './Hooks/useAuth';
import LogOut from './components/HeaderRight/LogOut';
import BookDetailsScreen from './screens/BookDetailsScreen';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const { isAuth } = useAuth();
  if (isAuth) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6a51ae'
          },
          headerTintColor:"white",
          headerTitleStyle: {
            color: '#fff',
            fontWeight: '900',
            fontSize: 25
          },
          headerRight: () => (<LogOut />),
        }}
      >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Details' component={BookDetailsScreen} />
      </Stack.Navigator>
    )
  }
  else {
    return (
      <Stack.Navigator>
        <Stack.Screen name='SignIn' component={SignInScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
      </Stack.Navigator>
    )
  }
}

export default AppNavigator