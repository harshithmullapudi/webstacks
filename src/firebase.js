import firebase from 'firebase'


const config = process.env.firebase;
firebase.initializeApp(config);

export const database = firebase.database()
export const auth = firebase.auth()




