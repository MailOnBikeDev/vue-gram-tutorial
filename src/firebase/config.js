import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCH_QuhrrgzDlJ7LOHkBTM0ebYkqRMsIrs",
  authDomain: "ninja-vue-gram.firebaseapp.com",
  projectId: "ninja-vue-gram",
  storageBucket: "ninja-vue-gram.appspot.com",
  messagingSenderId: "810250176834",
  appId: "1:810250176834:web:9e3ee4a212fcbb2b97e0db",
};

// Init Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
