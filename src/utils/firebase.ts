// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF93Gcj2vH3Ul2bSvDLlHKGEGrm0YA2Ic",
  authDomain: "catto-test.firebaseapp.com",
  projectId: "catto-test",
  storageBucket: "catto-test.appspot.com",
  messagingSenderId: "779926731258",
  appId: "1:779926731258:web:9fb18caa9a25e8aaf54c43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
