// src/utils/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDBKG2yhVljCKsf55o5QLRfqZroxmqrz_0",
    authDomain: "kinnor-v3.firebaseapp.com",
    projectId: "kinnor-v3",
    storageBucket: "kinnor-v3.firebasestorage.app",
    messagingSenderId: "661815683337",
    appId: "1:661815683337:web:d6ec92d51ac5c555afcbd8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);