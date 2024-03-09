// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyAUoetjKyju-WDhZrTaNQEQrVZVfbLLInA",
    authDomain: "fringe-a793d.firebaseapp.com",
    projectId: "fringe-a793d",
    storageBucket: "fringe-a793d.appspot.com",
    messagingSenderId: "103429690628",
    appId: "1:103429690628:web:d2b90bf479e6b497906c51"

};


// Initialize Firebase
let app;
if (firebase.apps.length ===0)
    app = firebase.initializeApp(firebaseConfig);
else
    app = firebase.app();

const auth = firebase.auth();
export {auth};