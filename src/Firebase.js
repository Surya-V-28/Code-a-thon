// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcuLtockFntCKcprGxLtNRnyAPwFJbPkY",
  authDomain: "catcode-1a025.firebaseapp.com",
  projectId: "catcode-1a025",
  storageBucket: "catcode-1a025.appspot.com",
  messagingSenderId: "885420873090",
  appId: "1:885420873090:web:05033104d835ab69722b9b",
  measurementId: "G-0YGHCCVF3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };