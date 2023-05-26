import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "save-songlist.firebaseapp.com",
  projectId: "save-songlist",
  storageBucket: "save-songlist.appspot.com",
  messagingSenderId: "383259159257",
  appId: "1:383259159257:web:4a348d749e8b3840c6ecc8",
  measurementId: "G-35426954P6"
};


// Get a Firestore instance
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();


const auth = getAuth();
export const signin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token: string | undefined = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    return { credential, token, user };
  } catch (error) {
    console.error(error);
  }
}

export default app
