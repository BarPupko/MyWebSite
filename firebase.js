// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsRuwTDkg2BfpmFDUpBorWePbIKxP2Z50",
  authDomain: "barphotography1.firebaseapp.com",
  projectId: "barphotography1",
  storageBucket: "barphotography1.firebasestorage.app",
  messagingSenderId: "546173302908",
  appId: "1:546173302908:web:f21881bb7c6a2f559f31f9",
  measurementId: "G-BM4JPH4H6W",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db; // Expose for external access
export { db, doc, getDoc, setDoc, updateDoc, increment };
