// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7MapQk9aFUgKRxLjLYSycKfoEwlsoVlk",
  authDomain: "matrimony-bfde5.firebaseapp.com",
  projectId: "matrimony-bfde5",
  storageBucket: "matrimony-bfde5.firebasestorage.app",
  messagingSenderId: "612791798489",
  appId: "1:612791798489:web:5abc6ba28f58f8e65c4cc8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };