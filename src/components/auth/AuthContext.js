import {createContext, useState, useContext, useEffect} from 'react';
import {auth} from '../balkan/firebase';

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [user, setuser] = useState('');

  const value = {
    user,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setuser(user);
    });
    return () => {
      unsubscribed();
    };
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
