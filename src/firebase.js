import firebase from 'firebase';

const firebases = firebase.initializeApp({
    apiKey: "AIzaSyBGyAL92eF1jhyYBggfyPU6UaGywwEfP4M",
    authDomain: "messenger-clone-1bc0a.firebaseapp.com",
    databaseURL: "https://messenger-clone-1bc0a.firebaseio.com",
    projectId: "messenger-clone-1bc0a",
    storageBucket: "messenger-clone-1bc0a.appspot.com",
    messagingSenderId: "639360578666",
    appId: "1:639360578666:web:277ef48b66c5b974a60613",
    measurementId: "G-GDSQX9T9ZV"
});

const db = firebases.firestore();
// const auth = firebases.auth();

export default db; 