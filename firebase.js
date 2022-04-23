import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB539SoAOOUpCLLI8zgBFHrLX5LgahI0V0",
  authDomain: "home-services-6ce72.firebaseapp.com",
  projectId: "home-services-6ce72",
  storageBucket: "home-services-6ce72.appspot.com",
  messagingSenderId: "891122152184",
  appId: "1:891122152184:web:75bc81cb0bc0a447c8c10d"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage();
db.settings({ experimentalForceLongPolling: true, merge: true });

export { auth, db, storage, firebase };