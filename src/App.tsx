import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./views/Products";
import Login from "./views/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import SendPasswordReset from "./views/SendPasswordReset";
import PasswordReset from "./views/PasswordReset";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="products/:table_id"
          element={
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="password_reset">
          <Route index={true} element={<SendPasswordReset />} />
          <Route path="new_password" element={<PasswordReset />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
