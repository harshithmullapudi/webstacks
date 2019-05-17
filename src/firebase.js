import firebase from 'firebase'


const config = {
   apiKey: "AIzaSyCY11Klf4T_fXzfG_ScJWm1nqJBSvUwu1U",
    authDomain: "webstacks-235e4.firebaseapp.com",
    databaseURL: "https://webstacks-235e4.firebaseio.com",
    projectId: "webstacks-235e4",
    storageBucket: "webstacks-235e4.appspot.com",
    messagingSenderId: "191997999591",
    appId: "1:191997999591:web:71e7e776f3271d6a"
};
firebase.initializeApp(config);

export const database = firebase.database()
export const auth = firebase.auth()




