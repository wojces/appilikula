import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import config from "../../config";

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
