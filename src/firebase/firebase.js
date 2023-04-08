import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
  authDomain: "logindemo-5d488.firebaseapp.com",
  projectId: "logindemo-5d488",
  storageBucket: "logindemo-5d488.appspot.com",
  messagingSenderId: "40086703564",
  appId: "1:40086703564:web:e329ea74bbd3880d006169"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);