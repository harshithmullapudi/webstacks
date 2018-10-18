import firebase from 'firebase'


const config = {
    apiKey: "AIzaSyDRnNEaccmuZz_9qtRWfAREag4XlyPZ3Ck",
    authDomain: "task4-7d512.firebaseapp.com",
    databaseURL: "https://task4-7d512.firebaseio.com",
    projectId: "task4-7d512",
    storageBucket: "task4-7d512.appspot.com",
    messagingSenderId: "365303459495"
};
firebase.initializeApp(config);

export const database = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()




