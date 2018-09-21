import firebase from 'firebase'


const config = {
    apiKey: "AIzaSyDSr3xqO6BtDPfjD8k5QF6VcpXs1VKLRs4",
    authDomain: "myapp-a123c.firebaseapp.com",
    databaseURL: "https://myapp-a123c.firebaseio.com",
    projectId: "myapp-a123c",
    storageBucket: "myapp-a123c.appspot.com",
    messagingSenderId: "780709071980"
};
firebase.initializeApp(config);

export const database = firebase.database()
export const auth = firebase.auth()




