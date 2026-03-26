import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9_77yij9_XMW48ckpzyRoOVES3sVippg",
  authDomain: "bitsoft-da7a0.firebaseapp.com",
  projectId: "bitsoft-da7a0",
  storageBucket: "bitsoft-da7a0.firebasestorage.app",
  messagingSenderId: "793691703435",
  appId: "1:793691703435:web:55976c70444b1619a3ac8e",
  measurementId: "G-FC9EP9MMDE",
  databaseURL: "https://bitsoft-da7a0-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
