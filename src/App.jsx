import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Registrar } from "./pages/Registrar";
import { Citas } from "./pages/Citas";
import { Navbar } from "./components/navbar";
import { AjustesPerfil } from "./pages/Ajustesperfil";
import { Cliente } from "./pages/Cliente";
import { CitasProvider } from "./components/CitasContext";
import { Footer } from "./components/Footer";
import React, { useState } from 'react';

function App() {
  return (
    <CitasProvider>
      <AppRoutes />
    </CitasProvider>
  );
}

const AppRoutes = () => {
  const currentPath = window.location.pathname;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
      </Routes>
      <div></div>
      {currentPath !== "/login" && currentPath !== "/registrar" && (
        <div>
          <Navbar handleLogout={handleLogout} />
          <Routes>
            <Route path="/citas" element={<Citas />} />
            <Route path="/ajustes" element={<AjustesPerfil />} />
            <Route path="/cliente" element={<Cliente />} />
          </Routes>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
};

export default App;