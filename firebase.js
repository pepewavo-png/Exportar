import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCi-uWYfi34S8lYXsKVAozCrG7YjzFpv1E",
  authDomain: "nolose-adee4.firebaseapp.com",
  projectId: "nolose-adee4",
  storageBucket: "nolose-adee4.firebasestorage.app",
  messagingSenderId: "149410218465",
  appId: "1:149410218465:web:3d34c8ae9fa0c9ffe252a0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);