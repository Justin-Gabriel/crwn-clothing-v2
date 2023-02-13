import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVzK9GTk3FX9bZ2UOGW6qh8IxXUwy0fcs",
  authDomain: "crwn-clothing-db-9c29c.firebaseapp.com",
  projectId: "crwn-clothing-db-9c29c",
  storageBucket: "crwn-clothing-db-9c29c.appspot.com",
  messagingSenderId: "227956994842",
  appId: "1:227956994842:web:c01e3b312b9081aacd32a3",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date()

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });

    } catch(error) {
      console.log('error creating the user', error.message);

    }
  }

  return userDocRef
  

}

export const createAuthUserWithEmailAndPassword = async (email,password) => {

  if(!email || !password) return;
  
  return await createUserWithEmailAndPassword(auth, email, password)
}
