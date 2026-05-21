// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAttzmq8sx227y4KXYt_vJKmPiLhDypUM8",
  authDomain: "interior-ai-f7e43.firebaseapp.com",
  projectId: "interior-ai-f7e43",
  storageBucket: "interior-ai-f7e43.firebasestorage.app",
  messagingSenderId: "744518885597",
  appId: "1:744518885597:web:c3c98b91d8454d48a87b34",
  measurementId: "G-576FCF9QBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);