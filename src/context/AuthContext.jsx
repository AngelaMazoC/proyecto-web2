
import { createContext, useContext, useEffect, useState } from "react";

import { auth, getRatingsByUserId } from "../services/firebase";

import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";

export const authContext = createContext(null);

export function AuthProvider({ children }) { 

  const [user, setUser] = useState('');
  const [userRatings, setUserRatings] = useState([]);


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

  const getRatings = async () => {
    try {     
      // Obtener las órdenes del usuario
      console.log(user.uid);
      const ratings = await getRatingsByUserId(user.uid);
      setUserRatings(ratings);

    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
    }
  }

  return (
  <authContext.Provider
    value={{
      loginWithGoogle,
      logout,
      user,
      userRatings,
      getRatings,

    }}
  >
    {children}
  </authContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(authContext);
}