import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyBS3p8FcWRz7BHTk62hR9c-i3iP88HNAXs",
  authDomain: "eveapp-40813.firebaseapp.com",
  databaseURL: "https://eveapp-40813.firebaseio.com",
  projectId: "eveapp-40813",
  storageBucket: "eveapp-40813.appspot.com",
  messagingSenderId: "265476243004",
  appId: "1:265476243004:web:2e71ccd2c9237dca364d39",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`/users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = userAuth;
    // const { displayName } = additionalData;

    const createdAt = new Date();

    // console.log(displayName, email, createdAt);
    try {
      await userRef.set({
        displayName: additionalData,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  // console.log(snapshot);
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// export const singInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
