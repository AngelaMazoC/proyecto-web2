import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase-firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJlHsWTJVI0SOKLJ10ziCstA-J_cls9KI",
    authDomain: "proyecto-coder-a06b7.firebaseapp.com",
    projectId: "proyecto-coder-a06b7",
    storageBucket: "proyecto-coder-a06b7.appspot.com",
    messagingSenderId: "229618884376",
    appId: "1:229618884376:web:1354b4fe1e2640480d486d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);