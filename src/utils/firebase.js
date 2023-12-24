// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-aa0a6.firebaseapp.com",
  projectId: "blog-aa0a6",
  storageBucket: "blog-aa0a6.appspot.com",
  messagingSenderId: "100500267759",
  appId: "1:100500267759:web:bd6e4e62f6a3a847b3b11a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);