import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore"
// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyDasQZebupqD5Oiq38Mpq1io3nJi7Trr94",

    authDomain: "calcifer-clothing-db.firebaseapp.com",

    projectId: "calcifer-clothing-db",

    storageBucket: "calcifer-clothing-db.appspot.com",

    messagingSenderId: "129762428205",

    appId: "1:129762428205:web:567bac2a9de34ee5a8bfa4"

};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

//there could be multiple different providers(ie, facebook,github,linkedin etc) but in this example, we'll be using google.
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    //if data exists
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    //else return userDocRef
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithAuthEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);

export const signOutUser = () => signOut(auth);