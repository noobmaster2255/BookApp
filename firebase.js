// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDG8S9hKPGUeBEGklwzYh3RCtR-bTUtNeQ",
  authDomain: "bookapp-ed90f.firebaseapp.com",
  projectId: "bookapp-ed90f",
  storageBucket: "bookapp-ed90f.firebasestorage.app",
  messagingSenderId: "638902229567",
  appId: "1:638902229567:web:0ea72a172d9170d63df68a",
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

