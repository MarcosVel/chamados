import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyAH_YeXwDQY-tJi6UT8drG9eY31zVzyYc4",
  authDomain: "chamados-d71ae.firebaseapp.com",
  projectId: "chamados-d71ae",
  storageBucket: "chamados-d71ae.appspot.com",
  messagingSenderId: "327410782151",
  appId: "1:327410782151:web:1e6779cb9e703807efd3e2",
  measurementId: "G-GJ5KC7D03Y"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
