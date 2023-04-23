// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInAnonymously, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";
import {
    getFirestore,
    query,
    doc,
    getDocs,
    setDoc,
    collection,
    where, addDoc, updateDoc, deleteDoc
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebaseConfig from "../firebase_config";
import { Note } from "./models/Notes"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// db

const updateNote = async (userId: string, note: Note) => {
    try {
        const noteRef = doc(db, 'users', userId, 'notes', note.id);
        await setDoc(noteRef, note, { merge: true });
        console.log(`updatedNote: ${note.title} : success`);
    } catch (error) {
        console.error('Error updating note: ', error);
    }
};


const deleteNote = async (noteId: string, userId: string) => {
    if (!userId || !noteId) return;

    try {
        const noteRef = doc(db, 'users', userId, 'notes', noteId);
        await deleteDoc(noteRef);
    } catch (error) {
        console.log(error);
    }
};

const getNotes = async (userId: string): Promise<Note[] | undefined> => {
    if (!userId) return;

    try {
        const q = query(collection(db, 'users', userId, 'notes'));
        const querySnapshot = await getDocs(q);

        const notes: Note[] = [];

        querySnapshot.forEach((doc) => {
            notes.push({ ...doc.data(), id: doc.id } as Note);
        });

        return notes;
    } catch (error) {
        console.log(error);
    }
};

const getNoteById = async (noteId: string, userId: string): Promise<Note | undefined> => {
    if (!userId || !noteId) return;

    try {
        const q = query(collection(db, 'users', userId, 'notes'), where('id', '==', noteId));
        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty) {
            const doc = querySnapshot.docs[0].data() as Note;
            return doc;
        }
    } catch (error) {
        console.log(error) 
    }

}


// auth

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        await signInWithRedirect(auth, provider);
        const res = await getRedirectResult(auth);
        if (!res) return;
    } catch (error) {
        console.log(error)
    }
}

// setup anonymous login
const anonymousLogin = async () => {
    try {
        await signInAnonymously(auth);
    } catch (error) {
        console.log(error)
    }
}


const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error)
    }
}

export {
    auth,
    signInWithGoogle,
    anonymousLogin,
    logout,
    updateNote,
    deleteNote,
    getNotes,
    getNoteById
}
