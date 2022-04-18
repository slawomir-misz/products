import React, { useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({children} : {children: React.ReactElement}) => {
    const { currentUser } = useContext(AuthContext)
   
    if(currentUser){
      return children
    }
    else{
      return <Navigate to = "/login" />
    }


}
export default ProtectedRoutes