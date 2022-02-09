import RoutesList from './components/routes/RoutesList';
import firebase from 'firebase/app';
import {auth} from './components/balkan/firebase';
import {AuthProvider} from './components/auth/AuthContext';

require('firebase/firestore');

function App(props) {

  // const firebaseConfig = {
  //   apiKey: process.env.REACT_APP_APIKEY,
  //   authDomain: process.env.REACT_APP_AUTHDOMAIN,
  //   projectId: process.env.REACT_APP_PROJECT_ID,
  //   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  //   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  //   appId: process.env.REACT_APP_APP_ID
  // };

  // if (firebase.apps.length === 0) {
  //   firebase.initializeApp(firebaseConfig);
  // }

  return (
    <AuthProvider>
      <RoutesList />
    </AuthProvider>

  );
}

export default App;
