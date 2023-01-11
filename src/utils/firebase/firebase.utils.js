import { initializeApp } from "firebase/app";
import { 
    getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzbkpATB6lmIAGR_2tSMEtfYk6lvyorSc",
  authDomain: "crwn-clothing-db-f6d45.firebaseapp.com",
  projectId: "crwn-clothing-db-f6d45",
  storageBucket: "crwn-clothing-db-f6d45.appspot.com",
  messagingSenderId: "608671456265",
  appId: "1:608671456265:web:76cd35d93ec635a0d9ecd8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done ..');
};

export const creteUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {

    if (!userAuth) {
        return;
    }

    const userDocRef = doc(db, 'users', userAuth.uid);

    const usersSnapshot = await getDoc(userDocRef);

    if(!usersSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInfo });
        } catch (error) {
            console.log('error while creating new user ', error);
        }
    }

    return userDocRef;
}

export const  createAuthUserWithEmailAndPassword = async (email, password) => {


    if (!email || !password) {
        return;
    }

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const  signInAuthUserWithEmailAndPassword = async (email, password) => {


    if (!email || !password) {
        return;
    }

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = callback => onAuthStateChanged(auth, callback);

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');

    const q = query(collectionRef);

    const querySnapshot = getDocs(q); 

    const categoryMap = (await querySnapshot).docs.reduce((acc, docSnapshot) => {
        const { title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;

};