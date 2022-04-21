import React, { useState, useEffect} from "react";
import firebase from "firebase/compat/app";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence, browserSessionPersistence   } from "firebase/auth"
import { auth } from "../firebase-config"
import Loading from "../components/loading/Loading";

interface IAuthContext {
  currentUser: firebase.UserInfo | null;
  login: any;
  logout: any;
};

const initialContextValues = {
  currentUser: null,
  login: null,
  logout: null
}

export const AuthContext = React.createContext<IAuthContext>(initialContextValues);


export const AuthProvider = ({children} : {children: React.ReactChild}) => {
  const [currentUser, setCurrentUser] = useState<firebase.UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  function login(email:string, password:string, remember:boolean) {

    if(remember){
      setPersistence(auth, browserLocalPersistence)
    }else{
      setPersistence(auth, browserSessionPersistence)
    }
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout(){
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, []);

  if(loading)
    return <Loading />

  return <AuthContext.Provider value={{currentUser, login, logout }}>{children}</AuthContext.Provider>;
};