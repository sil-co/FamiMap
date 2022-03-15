import RoutesList from './components/routes/RoutesList';
// import {AuthProvider} from './components/auth/AuthContext';

require('firebase/firestore');

function App(props) {


  return (
    // user情報を取得して表示したい時
    // <AuthProvider>
    //   <RoutesList />
    // </AuthProvider>

    <RoutesList />

  );
}

export default App;
