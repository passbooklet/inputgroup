import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBxaeP1XUt3M0sZfEYjlAdk5b5yWWnWU_c",
  authDomain: "intreninput.firebaseapp.com",
  projectId: "intreninput",
  storageBucket: "intreninput.appspot.com",
  messagingSenderId: "1013356512806",
  appId: "1:1013356512806:web:7d52094817038737f088e7",
  measurementId: "G-WS06G1EFS8"
};
// logintodo

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Initialize Cloud Firestore and get a reference to the service

export {db}