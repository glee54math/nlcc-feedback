// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM-RPii4G4g6FYmItLO_46UbxMHoVjOLM",
  authDomain: "newlifefeedbackform.firebaseapp.com",
  projectId: "newlifefeedbackform",
  storageBucket: "newlifefeedbackform.firebasestorage.app",
  messagingSenderId: "1033084965176",
  appId: "1:1033084965176:web:5ed58c46f2ee465ae131cd",
  measurementId: "G-HVE9GFBYTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);