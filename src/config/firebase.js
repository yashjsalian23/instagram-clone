import firebase from 'firebase';

const firebaseapp = firebase.initializeApp({
  apiKey: "AIzaSyAMLZB2N3e35_A3zayrYlpnCKfXgur9dUM",
  authDomain: "instagram-clone-bb4d4.firebaseapp.com",
  databaseURL: "https://instagram-clone-bb4d4.firebaseio.com",
  projectId: "instagram-clone-bb4d4",
  storageBucket: "instagram-clone-bb4d4.appspot.com",
  messagingSenderId: "328121974968",
  appId: "1:328121974968:web:a63d8c7afe82d2d0c3744d",
  measurementId: "G-6JE8PGN3RJ"
});


const db = firebaseapp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

