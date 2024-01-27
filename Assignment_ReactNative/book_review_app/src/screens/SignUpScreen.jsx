import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../config/firbase';
import {createUserWithEmailAndPassword,  } from 'firebase/auth'

const SignUpScreen = ({ navigation }) => {

  const [info, setInfo] = useState({
    email: '',
    password: '',
    confirmpass: ''
  })
  const handleSignUp = async () => {
    const email = info.email;
    const password = info.password;
    const confirmpass = info.confirmpass;
    try {
      if (email !== '' && password !== '' && confirmpass !== '') {
        if (password !== confirmpass) {
          throw Error("Please Confirm Your Password");
        }
        else {
          await createUserWithEmailAndPassword(auth, email, password);
          // if (res._tokenResponse) {
          //   navigation.navigate("SignIn");
          // }
        }
      }
      else {
        throw Error("Please Enter Information in all Field");
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SignUp</Text>
      <TextInput
        style={styles.textinput}
        placeholder='Email'
        textContentType='emailAddress'
        nativeID='email'
        onChangeText={(value) => setInfo({ ...info, email: value })}
      />
      <TextInput
        style={styles.textinput}
        placeholder='Password'
        textContentType='password'
        onChangeText={(value) => setInfo({ ...info, password: value })}
      />
      <TextInput
        style={styles.textinput}
        placeholder='Confirm password'
        textContentType='password'
        onChangeText={(value) => setInfo({ ...info, confirmpass: value })}
      />
      <TouchableOpacity style={{ width: '95%' }} onPress={handleSignUp}>
        <Text style={styles.btn}>SignUp</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 15 }}>
        Already have an account?
        <Text style={{ fontSize: 20, color: 'blue' }} onPress={() => navigation.navigate("SignIn")}> SignIn</Text>
      </Text>
    </View>
  )
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    fontFamily: 'serif',
    marginBottom: 30,
    fontWeight: '700'
  },
  textinput: {
    marginBottom: 10,
    padding: 4,
    width: '95%',
    height: 50,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#70269e'
  },
  btn: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'purple',
    backgroundColor: 'lightblue',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
})