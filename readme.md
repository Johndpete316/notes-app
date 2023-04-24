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

## Deployment

The notes app was deployed to Firebase Hosting using the following process:

### Prerequisites

1. The Firebase CLI was installed by running `npm install -g firebase-tools`.
2. The Firebase account was logged in by running `firebase login`.

### Deployment Process

1. The application was built for production by running the following command in the project directory:

```
npm run build
```

This created an optimized build in the `build` folder.

2. A Firebase project was initialized by running the following command in the project directory:

```
firebase init
```

This started a guided setup process. "Hosting" was selected when prompted for which Firebase features to set up.

3. Firebase project settings were configured as follows:
   - An existing Firebase project was chosen.
   - The public directory was set to `dist`.
   - The app was configured as a single-page app (SPA).
   - Automatic builds and deploys with GitHub were not set up in this case.

4. The app was deployed to Firebase Hosting by running the following command in the project directory:

```
firebase deploy
```

Once the deployment was complete, a URL was provided to access the deployed app (e.g., `https://your-app-name.web.app`).

The notes app was successfully deployed to Firebase Hosting using the above process.

## Credits

🤖 ChatGPT
