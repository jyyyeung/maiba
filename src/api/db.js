import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6ZAMHVEkEmTjGX9OBJmbE0vDOj5xJWnk",
  authDomain: "save-songlist.firebaseapp.com",
  projectId: "save-songlist",
  storageBucket: "save-songlist.appspot.com",
  messagingSenderId: "383259159257",
  appId: "1:383259159257:web:4a348d749e8b3840c6ecc8",
  measurementId: "G-35426954P6",
};

// Get a Firestore instance
export const db = firebase.initializeApp(firebaseConfig).firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true });
