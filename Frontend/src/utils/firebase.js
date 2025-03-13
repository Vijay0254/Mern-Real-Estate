import { initializeApp } from "firebase/app";

//Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-f05b8.firebaseapp.com",
  projectId: "real-estate-f05b8",
  storageBucket: "real-estate-f05b8.firebasestorage.app",
  messagingSenderId: "554437202658",
  appId: "1:554437202658:web:5a6aa89ded7d105bcd84bb"
};

//Initialize Firebase
export const app = initializeApp(firebaseConfig);