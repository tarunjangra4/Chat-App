// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2bkPq449aQfys9I5Qv0Pmpg9gs7xp1TM",
  authDomain: "chatapp-61599.firebaseapp.com",
  projectId: "chatapp-61599",
  storageBucket: "chatapp-61599.appspot.com",
  messagingSenderId: "710063606277",
  appId: "1:710063606277:web:4a8afefd59dbcc8d9fea6c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
