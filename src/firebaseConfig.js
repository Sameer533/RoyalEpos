// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG-1yjqb6fKR8gnZXfrjSXGPEh6RLuZcc",
  authDomain: "royalepos-5969a.firebaseapp.com",
  projectId: "royalepos-5969a",
  storageBucket: "royalepos-5969a.firebasestorage.app",
  messagingSenderId: "428952554587",
  appId: "1:428952554587:web:2c4ee49d794d9df6a5837e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore DB
const db = getFirestore(app);

// Export only db (not app unless needed)
export { db };