import {createContext, useState, useContext, useEffect} from 'react';
import {auth} from '../balkan/firebase';

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [user, setuser] = useState('');
  const [loading, setLoading] = useState(true);

  const value = {
    user,
    loading,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      // console.log(user);
      setuser(user);
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, [])

  if(loading) {
    return (
      <div style={
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }
      }>
        <p style={{ } }>Loading...</p>
      </div>
    )
  } else {
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
};
