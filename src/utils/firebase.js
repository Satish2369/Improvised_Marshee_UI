// utils/firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,

} from "firebase/auth";

// ✅ Firebase config (from your project)
const firebaseConfig = {
  apiKey: "AIzaSyBoTR2XRuEoI_GAMQJjnAOM3PPbV_kDSEo",
  authDomain: "marshee-4820d.firebaseapp.com",
  projectId: "marshee-4820d",
  storageBucket: "marshee-4820d.appspot.com", 
  messagingSenderId: "299120719376",
  appId: "1:299120719376:web:f24ac42080d87d89fabc95",
  measurementId: "G-4HREKSDB33",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
 
};
