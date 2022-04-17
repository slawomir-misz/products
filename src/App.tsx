import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Products from './views/Products';
import Login from './views/Login';
import ProtectedRoutes from './routes/ProtectedRoutes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="products" element={<ProtectedRoutes><Products /></ProtectedRoutes>} />
        <Route path="login" element={<Login />} />
      </Routes>
  </BrowserRouter>
  )
}

export default App;
