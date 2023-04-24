# Notes Application with React, Firebase Auth, and Firestore

This is a simple notes application built with React and utilizing Firebase Auth and Firestore for user authentication and data storage.

## Technologies Used

![React Logo](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=white)
![Firebase Logo](https://img.shields.io/badge/-Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white)

- [React](https://reactjs.org/)
- [Firebase Auth](https://firebase.google.com/products/auth)
- [Firestore Database](https://firebase.google.com/products/firestore)

## Basic Data Flow

When the user signs in, Firebase Auth is used to authenticate the user and generate a unique user ID. This ID is used to fetch and store notes in Firestore, where each user has their own collection of notes. 

The user interface consists of two main components: the `NoteList` component and the `NoteEditor` component. The `NoteList` component fetches and displays the list of notes for the current user. When a note is clicked, the `NoteEditor` component displays the content of the selected note.

Any changes made to a note's title or content are saved to Firestore using the `updateNote` function defined in `firebase.ts`. Debouncing is used to prevent excessive writes to the database, and a "saved" message is displayed to the user to indicate that the changes have been successfully saved.

When a user deletes a note, the `deleteNote` function is called, which deletes the note from Firestore and removes it from the list displayed in the `NoteList` component.

## Credits

🤖 ChatGPT