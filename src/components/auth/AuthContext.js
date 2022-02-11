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
      setuser(user);
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
