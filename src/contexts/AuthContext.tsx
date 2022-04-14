import React, { useState, useEffect} from "react";
import firebase from "firebase/compat/app";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase-config"

type ContextProps = {
  currentUser: firebase.UserInfo | null;
  login: any;
  logout: any;
};

const initialContextValues = {
  currentUser: null,
  login: null,
  logout: null
}

export const AuthContext = React.createContext<ContextProps>(initialContextValues);


export const AuthProvider = ({children} : {children: React.ReactChild}) => {
  const [currentUser, setCurrentUser] = useState<firebase.UserInfo | null>(null);

  function login(email:string, password:string) {
    return signInWithEmailAndPassword(auth, email, password)
  }
  function logout(){
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, []);

  return <AuthContext.Provider value={{currentUser, login, logout }}>{children}</AuthContext.Provider>;
};