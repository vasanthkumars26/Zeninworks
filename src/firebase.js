import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPsgfFtiWukV2mhmaqwBzU9ynntP2ErsQ",
  authDomain: "zeninworks-74ca7.firebaseapp.com",
  projectId: "zeninworks-74ca7",
  storageBucket: "zeninworks-74ca7.firebasestorage.app",
  messagingSenderId: "519577725583",
  appId: "1:519577725583:web:4241b747a02e1fcdad5efa",
  measurementId: "G-9PKJJYYBT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
