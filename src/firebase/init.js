import firebase from 'firebase'
import firestore from 'firebase/firestore'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDuq6p6-4wkpyvlKVMseRzAER-DLf_uI18",
  authDomain: "vue-crud-team-list.firebaseapp.com",
  databaseURL: "https://vue-crud-team-list.firebaseio.com",
  projectId: "vue-crud-team-list",
  storageBucket: "vue-crud-team-list.appspot.com",
  messagingSenderId: "4115880843"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();