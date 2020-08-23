import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAsh_-At_yHO-7KEM1vA6oIFnoT7csXsvw",
  authDomain: "netflix-clone-79d1c.firebaseapp.com",
  databaseURL: "https://netflix-clone-79d1c.firebaseio.com",
  projectId: "netflix-clone-79d1c",
  storageBucket: "netflix-clone-79d1c.appspot.com",
  messagingSenderId: "768039324930",
  appId: "1:768039324930:web:5091df61f147e64d8b061b",
  measurementId: "G-84Q9P7P98Z",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
