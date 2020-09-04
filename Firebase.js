import firebase from "firebase";
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
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
