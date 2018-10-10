import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCh2MYXMU1O-r3dScVM3CaLczO5RxcSPA4",
    authDomain: "udemy-geo-ninjas-3d003.firebaseapp.com",
    databaseURL: "https://udemy-geo-ninjas-3d003.firebaseio.com",
    projectId: "udemy-geo-ninjas-3d003",
    storageBucket: "",
    messagingSenderId: "207217902669"
  };
  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true })

  export default firebaseApp.firestore()