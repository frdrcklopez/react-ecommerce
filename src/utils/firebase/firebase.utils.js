import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs3oJJvoE0ejxemdPJv_PzxE4j40SKEnI",
  authDomain: "react-commerce-dd754.firebaseapp.com",
  projectId: "react-commerce-dd754",
  storageBucket: "react-commerce-dd754.appspot.com",
  messagingSenderId: "344760215588",
  appId: "1:344760215588:web:39ed44495eaa1bebe2d0b1",
  measurementId: "G-L7N85RNCDJ"
};

// Initialize Firebase
const fireabaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt : 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)