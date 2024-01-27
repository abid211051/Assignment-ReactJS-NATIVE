import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../config/firbase';
import { signInWithEmailAndPassword } from 'firebase/auth'

const SignInScreen = ({ navigation }) => {
  const [info, setInfo] = useState({
    email: '',
    password: ''
  })
  const handleSignin = async () => {
    const email = info.email;
    const password = info.password;
    try {
      if (email !== '' && password !== '') {
        await signInWithEmailAndPassword(auth, email, password);
        // if (res._tokenResponse) {
        //   // navigation.navigate("Home");
        // }
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
      <Text style={styles.text}>SignIn</Text>
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
      <TouchableOpacity style={{ width: '95%' }} onPress={handleSignin}>
        <Text style={styles.btn}>SignIn</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 15 }}>
        Don't have an account?
        <Text style={{ fontSize: 20, color: 'blue' }} onPress={() => navigation.navigate("SignUp")}> SignUp</Text>
      </Text>
    </View>
  )
}

export default SignInScreen;

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
    borderColor: 'green'
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