import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_LehOwLlCyRhoL22wNM4mN1pjqlMY45g",
    authDomain: "jsrooms-8a5db.firebaseapp.com",
    projectId: "jsrooms-8a5db",
    storageBucket: "jsrooms-8a5db.firebasestorage.app",
    messagingSenderId: "340004437623",
    appId: "1:340004437623:web:acbf7980cfdb617eaed072",
    measurementId: "G-MB2QZLRK45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
