// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.domain,
  projectId: process.env.projectId,
  storageBucket: process.env.bucket,
  messagingSenderId: process.env.senderId,
  appId: process.env.appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
