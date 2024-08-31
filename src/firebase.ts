// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// You can import other Firebase services as needed, like auth and firestore

const firebaseConfig = {
  apiKey: "AIzaSyAow2nwvubZXlR9A3b0UlJxZstGYVSKOGQ",
  authDomain: "mediease-dd94a.firebaseapp.com",
  projectId: "mediease-dd94a",
  storageBucket: "mediease-dd94a.appspot.com",
  messagingSenderId: "1019987268011",
  appId: "1:1019987268011:web:68312a32d0762b910b42ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export default app;
