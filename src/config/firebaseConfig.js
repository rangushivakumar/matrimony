// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCAWHNusZ27cFT2AsNnnuLWZWzihjOA0s",
  authDomain: "ksrmatrimony-f27f6.firebaseapp.com",
  projectId: "ksrmatrimony-f27f6",
  storageBucket: "ksrmatrimony-f27f6.firebasestorage.app",
  messagingSenderId: "962408006002",
  appId: "1:962408006002:web:303f633df7889896f51deb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };