import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// PASTE YOUR KEYS FROM FIREBASE CONSOLE HERE
const firebaseConfig = {
  apiKey: "AIzaSyAVM5ucCZArbCTRPyBm4smmRLlLOyUYR5g",
  authDomain: "heerak-food.firebaseapp.com",
  projectId: "heerak-food",
  storageBucket: "heerak-food.firebasestorage.app",
  messagingSenderId: "687403971294",
  appId: "1:687403971294:web:af7c172e07af60f347884f"
};``

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };