import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js"

export async function createUserDocuments(uid) {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, { xp: 0, streak: 0, badges: [] });
}

export async function getUserDocument(uid) {
    const userRef = doc(db, "users", uid);
    const snapshot = await getDoc(userRef);
    return snapshot.data();
}
getUserDocument();
