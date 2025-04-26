// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDFV4sg9lMe9wIWFbnqeOiTxtCfxsXesIQ",
  authDomain: "mobile-app3-e1bb8.firebaseapp.com",
  projectId: "mobile-app3-e1bb8",
  storageBucket: "mobile-app3-e1bb8.firebasestorage.app",
  messagingSenderId: "856495328943",
  appId: "1:856495328943:web:830c8f9b202d5ced4d8e5a",
  measurementId: "G-71BQF2BPWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);