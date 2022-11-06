import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJW1lRKOSw1zbfyQ3wjG8tB2pOWgLkRzA",
    authDomain: "workout-f1285.firebaseapp.com",
    projectId: "workout-f1285",
    storageBucket: "workout-f1285.appspot.com",
    messagingSenderId: "680892455956",
    appId: "1:680892455956:web:1ec13e708310b1e46c1b01"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);