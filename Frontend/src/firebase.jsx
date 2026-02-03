import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Add this
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCM3WmC4jRoO2g3Ub5NFxbmS8BOf_yisGw",
  authDomain: "eco-mitra-96b1c.firebaseapp.com",
  databaseURL: "https://eco-mitra-96b1c-default-rtdb.firebaseio.com",
  projectId: "eco-mitra-96b1c",
  storageBucket: "eco-mitra-96b1c.firebasestorage.app",
  messagingSenderId: "826183098948",
  appId: "1:826183098948:web:890d47d0b553fb7261d211",
  measurementId: "G-QB94ZQFNY7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);