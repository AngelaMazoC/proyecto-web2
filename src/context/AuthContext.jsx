
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../services/firebase";

import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import { toast } from "react-toastify";

export const authContext = createContext(null);

export function AuthProvider({ children }) { 

  const [user, setUser] = useState('');

  useEffect(() => {
    const suscribed = onAuthStateChanged(auth, (currentUser) => {
      if(!currentUser){
        console.log("No hay usuario loggeado");
        setUser('');
      }else{
        setUser(currentUser);
      }
    })

    return () => suscribed();
  }, [])

  const loginWithGoogle = async () => {
    const response = new GoogleAuthProvider();
    return await signInWithPopup(auth, response);
  }

  const logout = async () => {
    return await signOut(auth);
  }

  return (
  <authContext.Provider
    value={{
      loginWithGoogle,
      logout,
      user
    }}
  >
    {children}
  </authContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(authContext);
}