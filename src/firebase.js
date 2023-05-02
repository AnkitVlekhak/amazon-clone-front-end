// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import firebase from "firebase/app";
// import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCIieeQtjiKRnPjCBFybF_9lv4DosnI0gw",
    authDomain: "clone-fd953.firebaseapp.com",
    projectId: "clone-fd953",
    storageBucket: "clone-fd953.appspot.com",
    messagingSenderId: "983294408601",
    appId: "1:983294408601:web:07bf08cfa6c88e08514508",
    measurementId: "G-3GBKRXFPZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db = app.firestore();
export const db = getFirestore(app);
export const auth = getAuth();
const user = auth.currentUser;
if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
    console.log(displayName, email);
}