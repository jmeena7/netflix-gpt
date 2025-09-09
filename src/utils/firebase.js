// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo9s5OEsWCJN8REIFPD9u0-wHEkqM-soQ",
  authDomain: "netflixgpt-f55f9.firebaseapp.com",
  projectId: "netflixgpt-f55f9",
  storageBucket: "netflixgpt-f55f9.firebasestorage.app",
  messagingSenderId: "139282117251",
  appId: "1:139282117251:web:ab3f87d2ad6a2c792ae1b6",
  measurementId: "G-6FG7SMLTBE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Firebase Auth
export const auth = getAuth(app);  // ✅ Export auth object