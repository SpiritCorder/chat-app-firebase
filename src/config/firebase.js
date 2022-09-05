// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLq4XUrwdbNmzzbNXXg4_nrDgm0lYZIdk",
  authDomain: "chat-app-18f91.firebaseapp.com",
  projectId: "chat-app-18f91",
  storageBucket: "chat-app-18f91.appspot.com",
  messagingSenderId: "84951026742",
  appId: "1:84951026742:web:0eb40e0401e51bca1b1c97"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const storage = getStorage();

export const db = getFirestore();