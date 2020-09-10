import firebase from 'firebase';

const firebases = firebase.initializeApp({
    apiKey: "AIzaSyDMqKMrI96AjOkMc3sTlNW_jF1b60F6idc",
    authDomain: "messenger-app-clone-f83ec.firebaseapp.com",
    databaseURL: "https://messenger-app-clone-f83ec.firebaseio.com",
    projectId: "messenger-app-clone-f83ec",
    storageBucket: "messenger-app-clone-f83ec.appspot.com",
    messagingSenderId: "1064672450566",
    appId: "1:1064672450566:web:87665cfeae97e686a48b87",
    measurementId: "G-VYCE43HFHS"
});

const db = firebases.firestore();
// const auth = firebases.auth();

export default db; 