import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace these with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCgaIoMni1gtbr1h2fYzK7TAcbhvLLxpOY",
  authDomain: "vellum-d1c92.firebaseapp.com",
  projectId: "vellum-d1c92",
  storageBucket: "vellum-d1c92.firebasestorage.app",
  messagingSenderId: "793919836224",
  appId: "1:793919836224:web:14ad581fe5102f485a8fa5"
};

const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

