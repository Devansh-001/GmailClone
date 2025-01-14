import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCH-yoKWAvuj_x7pj7Hl-uUDskzAbUxm8o",
    authDomain: "clone-f7395.firebaseapp.com",
    projectId: "clone-f7395",
    storageBucket: "clone-f7395.firebasestorage.app",
    messagingSenderId: "159645873307",
    appId: "1:159645873307:web:3c7ded8c0da2d6f9d1823e",
    measurementId: "G-QCM9DJWP2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();