import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import modle from '../assets/img/logo.png';

export const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };
  

  return (
    <div>
      <header className="text-gray-100 bg-red-400 border-s-fuchsia-950 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <img
              src={modle}
              alt=""
              className="w-16 h-16 text-white p-2 rounded-full"
              viewBox="0 0 50 50"
            />
            <span className="ml-3 text-xl">Health Connect</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <NavLink to="/citas" className="mr-5 hover:text-white">
              Cita
            </NavLink>
            <NavLink to="/ajustes" className="mr-5 hover:text-white">
              Ajustes
            </NavLink>
            <NavLink to="/cliente" className="mr-5 hover:text-white">
              Mural
            </NavLink>
          </nav>
          <button
            className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
            onClick={handleLogoutClick}
          >
            Cerrar Sesión
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};
