// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6sJ97sM5c6kkC98E4Lloo4pRItIuklBY",
  authDomain: "buzzd-e54ef.firebaseapp.com",
  projectId: "buzzd-e54ef",
  storageBucket: "buzzd-e54ef.firebasestorage.app",
  messagingSenderId: "611844832938",
  appId: "1:611844832938:web:8d696d8d65232cd48bdad3",
  measurementId: "G-X3RQMLL57W"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);