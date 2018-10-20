import firebase from 'firebase'


const config = {
  apiKey: "AIzaSyASM7_S1Vd2IgMZ2cLHhbVHs_GpN98CmsU",
  authDomain: "webstacks-chat.firebaseapp.com",
  databaseURL: "https://webstacks-chat.firebaseio.com",
  projectId: "webstacks-chat",
  storageBucket: "webstacks-chat.appspot.com",
  messagingSenderId: "521821179459"
};
firebase.initializeApp(config);

export const database = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()
