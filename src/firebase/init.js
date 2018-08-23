import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

var config = {
  apiKey: "AIzaSyC9AugGSIV1Y7y2wfWa-ftACpXY2bT47zY",
  authDomain: "percent-5e321.firebaseapp.com",
  databaseURL: "https://percent-5e321.firebaseio.com",
  projectId: "percent-5e321",
  storageBucket: "",
  messagingSenderId: "251372936764"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots:true})


export default firebaseApp.firestore()
