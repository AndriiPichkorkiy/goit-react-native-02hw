import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD43VFUJOEM1nFZ20M8prhub-6cIHHniNM",
  authDomain: "react-native-social-9d60d.firebaseapp.com",
  projectId: "react-native-social-9d60d",
  storageBucket: "react-native-social-9d60d.appspot.com",
  messagingSenderId: "281501828370",
  appId: "1:281501828370:web:10cba6da355f8ea8f59fcb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

export const auth = getAuth(app);
export const dbFirestore = getFirestore();
