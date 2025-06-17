
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "marshe-otp.firebaseapp.com",
  projectId: "marshe-otp",
  storageBucket: "marshe-otp.firebasestorage.app",
  messagingSenderId: "63361484741",
  appId: "1:63361484741:web:c150d4ce7efe1b96c02dac",
  measurementId: "G-8B1TDXB9QJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

