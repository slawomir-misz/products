import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoutes = ({ children } : {children: React.ReactElement}) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" />;
};
export default ProtectedRoutes;
