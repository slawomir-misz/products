import React from 'react';
import Register from './views/Register';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Products from './views/Products';
import Login from './views/Login';

const App: React.FC = () => {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
