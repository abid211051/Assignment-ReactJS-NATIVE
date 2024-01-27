// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZMYStH2rF1DoMgV9A1kEZO-duPznEZ0Y",
  authDomain: "finance-app-rn.firebaseapp.com",
  projectId: "finance-app-rn",
  storageBucket: "finance-app-rn.appspot.com",
  messagingSenderId: "1081887121299",
  appId: "1:1081887121299:web:05cdd68cecd0caa93f5266",
  measurementId: "G-Y3873MTPZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getDatabase(app);
export { app, auth, db }