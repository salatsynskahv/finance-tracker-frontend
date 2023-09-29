import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDz5i7HABz8wfd3yos4Z5gf8UgUb5A6WP0",
    authDomain: "finance-tracker-1bcf8.firebaseapp.com",
    projectId: "finance-tracker-1bcf8",
    storageBucket: "finance-tracker-1bcf8.appspot.com",
    messagingSenderId: "787917336028",
    appId: "1:787917336028:web:c011394fd177bcca417319"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};