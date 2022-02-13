import RoutesList from './components/routes/RoutesList';
import {AuthProvider} from './components/auth/AuthContext';

require('firebase/firestore');

function App(props) {


  return (
    <AuthProvider>
      <RoutesList />
    </AuthProvider>

  );
}

export default App;
