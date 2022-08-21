import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt : 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {} ) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
  if(!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}