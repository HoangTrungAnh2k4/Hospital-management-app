// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'hospital-app-5ee82.firebaseapp.com',
    projectId: 'hospital-app-5ee82',
    storageBucket: 'hospital-app-5ee82.appspot.com',
    messagingSenderId: '668579763178',
    appId: '1:668579763178:web:025cbca121963c5a9f9893',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
