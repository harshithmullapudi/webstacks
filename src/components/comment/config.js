  import firebase from 'firebase';
  export const secondaryDbConfig = {
    apiKey: "AIzaSyBzGAsb8NUpGjfISFWQbJSKqScrhwc3EXQ",
    authDomain: "comments-30821.firebaseapp.com",
    databaseURL: "https://comments-30821.firebaseio.com",
    projectId: "comments-30821",
    storageBucket: "comments-30821.appspot.com",
    messagingSenderId: "394091627774"
  };
  export const secondary = firebase.initializeApp(secondaryDbConfig, "secondary");
 