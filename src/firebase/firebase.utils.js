import firebase from 'firebase/app';
import 'firebase/firestore'; // for db
import 'firebase/auth'; // for authentication


const config = {
    apiKey: "AIzaSyDwGgfIfrAJZ8h556irIGoB6T3P2l7GHHI",
    authDomain: "efa-db.firebaseapp.com",
    databaseURL: "https://efa-db.firebaseio.com",
    projectId: "efa-db",
    storageBucket: "efa-db.appspot.com",
    messagingSenderId: "848006978140",
    appId: "1:848006978140:web:d96415196e78529292a499",
    measurementId: "G-DVLP0KM2NR"
}

//below will be asynchronous (func expression) thing bcoz an api request is made
export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get(); // check in db

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
    

    try{
        await userRef.set({ // add in db
            displayName,
            email,
            createdAt,
            ...additionalData
        });
    }catch(error){
        console.log('error creating user', error.message);
    }
    }
    
    return userRef;
};


firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;