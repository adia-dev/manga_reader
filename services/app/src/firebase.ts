// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_AUTH_API_KEY,
  authDomain: "mangareader-e948b.firebaseapp.com",
  projectId: "mangareader-e948b",
  storageBucket: "mangareader-e948b.appspot.com",
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_AUTH_MESSAGE_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_AUTH_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
