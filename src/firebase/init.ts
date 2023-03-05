import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWNlnpHpTeIs1W0nFYzb0avud-YzP555Q",
  authDomain: "docsfire-2d4e9.firebaseapp.com",
  projectId: "docsfire-2d4e9",
  storageBucket: "docsfire-2d4e9.appspot.com",
  messagingSenderId: "135835267854",
  appId: "1:135835267854:web:0377736aee085f619f5d5f",
  measurementId: "G-WD4FLBFEGS",
};

// init firebase
initializeApp(firebaseConfig);

// init & export firestore service
export const db = getFirestore();
export const auth = getAuth();
