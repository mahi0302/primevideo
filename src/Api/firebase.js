import firebase from "firebase";

//Authentication
import "firebase/auth";
//realtime database ;
import "firebase/database";
//firebase storage
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCVmumpdwb6bXjCT49gE1je7k4YcuMGTUw",
  authDomain: "prime-cd99d.firebaseapp.com",
  projectId: "prime-cd99d",
  storageBucket: "prime-cd99d.appspot.com",
  messagingSenderId: "426248313540",
  appId: "1:426248313540:web:73abc48787ad1bb7c70791"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
