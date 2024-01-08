// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBIU89bY-8gVV4zVrdD7sqNZX5DZ9KB65I",
    authDomain: "sonicsounds-20516.firebaseapp.com",
    projectId: "sonicsounds-20516",
    storageBucket: "sonicsounds-20516.appspot.com",
    messagingSenderId: "231526507373",
    appId: "1:231526507373:web:eb00acd08515d45b693064",
    measurementId: "G-FJD6TF8L49"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp)
const db = getFirestore(firebaseApp);
export { auth , storage, firebaseApp ,db};
