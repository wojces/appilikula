import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDP3wjBls9zo7HYVup2fMtwy7wjKGCZiB8",
  authDomain: "appilikula.firebaseapp.com",
  databaseURL:
    "https://appilikula-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "appilikula",
  storageBucket: "appilikula.appspot.com",
  messagingSenderId: "890125420902",
  appId: "1:890125420902:web:cb8afc1a81bd505361e0a7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
