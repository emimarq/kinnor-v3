// src/utils/log-sign.js

import { auth } from "../utils/firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export async function signUp(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signIn(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
}