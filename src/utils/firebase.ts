// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrVMJFVYqPypACVMMUdnm3VNsTRMCT6pw",
  authDomain: "eaki-unicamp.firebaseapp.com",
  projectId: "eaki-unicamp",
  storageBucket: "eaki-unicamp.appspot.com",
  messagingSenderId: "195472509064",
  appId: "1:195472509064:web:c78fca194d28652634373d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
