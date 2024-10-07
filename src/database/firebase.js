// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBQ2Deh9-53Yh1GCdk1-MXIQ01pDibnH70",
  authDomain: "chatapp-skilltest.firebaseapp.com",
  projectId: "chatapp-skilltest",
  storageBucket: "chatapp-skilltest.appspot.com",
  messagingSenderId: "976920771435",
  appId: "1:976920771435:web:0fad2882784ab88d85aa2e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();