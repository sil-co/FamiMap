import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// if (firebase.app.length === 0) {
firebase.initializeApp(firebaseConfig);
// }

export const auth = firebase.auth();

function conpairFn(a,b) {
  return b -a;
}

export function getData() {
  const db = firebase.firestore();
  const {currentUser} = firebase.auth();
  const ref = db.collection(`users/${currentUser.uid}/nodes`);
  const userNodeIds = [];
  const unsubscribe = ref.onSnapshot((snapshot) => {
    // const userNodes = [];
    snapshot.forEach((doc) => {

    // userNodes.push(doc.data());
    userNodeIds.push(doc.data().id);
    });
    userNodeIds.sort(conpairFn);
  })

  return userNodeIds;
};
