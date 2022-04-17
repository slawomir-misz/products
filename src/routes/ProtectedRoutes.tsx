import React, { useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({children} : {children: any}) => {
    const { currentUser } = useContext(AuthContext)
   
    if(currentUser){
      return children
    }
    else{
      return <Navigate to = "/login" />
    }


}
export default ProtectedRoutes