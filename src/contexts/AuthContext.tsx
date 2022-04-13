import React, { useState, useEffect, ReactNode } from "react";
import firebase from "firebase/compat";
import { auth } from "../firebase"

type ContextProps = {
  user: firebase.User | null;
  setUser: any;
  signup: any;
};
export const AuthContext = React.createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: any) => {

  const [user, setUser] = useState<firebase.User | null>(null);


  function signup(email:string, password:string){
    return auth.createUserWithEmailAndPassword(email, password)
  }

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user)
    })
    return unsubscribe
  }, [])

return (
  <AuthContext.Provider
   value={{
        user,
        setUser,
        signup
  }}>
    {children} 
 </AuthContext.Provider>
);
}