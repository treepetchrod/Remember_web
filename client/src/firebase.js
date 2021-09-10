import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC-Jh078NOyx3qbTZ-CkjI36G5El3CUJCw",
  authDomain: "remember-web-nu.firebaseapp.com",
  projectId: "remember-web-nu",
  storageBucket: "remember-web-nu.appspot.com",
  messagingSenderId: "1016446909069",
  appId: "1:1016446909069:web:71841edac8339c7317c0c4",
  measurementId: "G-WZ5H6Z4YEW"
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

export default storage;