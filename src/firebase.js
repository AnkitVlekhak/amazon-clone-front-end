// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    //your config goes here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db = app.firestore();
export const db = getFirestore(app);
export const auth = getAuth();