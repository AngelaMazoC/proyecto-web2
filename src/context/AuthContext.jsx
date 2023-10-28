import { auth } from "../services/firebase";
import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut} from "firebase/auth";

export const authContext = createContext(null);

export function AuthProvider({ children }) {

  const register = async (email, password) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    console.log(response);
  };

  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
  }

  const logout = async () => {
    const response = await signOut(auth);
    console.log(response);
  }

  return (
  <authContext.Provider
    value={{
      register,
      login,
      logout
    }}
  >
    {children}
  </authContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(authContext);
}