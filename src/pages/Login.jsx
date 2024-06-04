import React, { useState } from 'react';
import Logo from '../assets/img/logo.png';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { AlertaModal } from '../components/AlertaModal';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find((u) => u.email === email && u.password === password);
    if (usuario) {
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
      history.push('/citas');
    } else {
      alert('Correo electrónico o contraseña incorrectos');
    }
  };

  const loginService = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMostrarAlerta(true);
      return;
    }

    const data = {
      email: email,
      password: password
    };

    try {
      const resp = await axios.post("http://localhost:3000/api/usuarios/registrar", data);
      console.log(resp);

      if (resp.data.success) {
        // El usuario está registrado, redirigir a ./inicio
        navigate('/inicio');
      } else {
        // El usuario no está registrado, mostrar alerta y redirigir a ./registrar
        setMostrarAlerta(true);
        setTimeout(() => {
          navigate('/registrar');
        }, 3000); // Redirigir después de 3 segundos
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cerrarAlerta = () => {
    setMostrarAlerta(false);
  };

  const btnlink = "mr-5 hover:text-red-400 text-white";
  return (
    <div className="h-screen w-screen flex bg-cover bg-center" style={{ backgroundImage: `url('/login.png')` }}>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className='w-1/2 h-full flex justify-center items-center'>
          <img src={Logo} alt="Logo" className="w-1/2 animate-pulse" />
        </div>
        <div className="w-1/2 h-0.5 flex items-center absolute top-10 right-10 cursor-pointer">
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <NavLink to="/login" className={`mx-2 py-1 px-2 rounded-full ${btnlink}`}>Iniciar Sesion</NavLink>
            <NavLink to="/registrar" className={`mx-2 py-1 px-2 rounded-full ${btnlink}`}>Registrar Usuario</NavLink>
            <a href="https://hvdjhonpico.000webhostapp.com/vih/index.html"className="mx-2 py-1 px-2 rounded-full text-white ">inicio</a>
        
          </nav>
        </div>
        <div className='w-1/2 h-96 flex flex-col justify-between items-center bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl'>
          <h3 className="text-4xl text-white">Inicio de Sesion</h3>
          <div>
            <h2 className="text-lg text-white">Email</h2>
            <input
              type="text"
              className="w-full rounded-full bg-red-400 text-white p-5 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <h2 className="text-lg text-white">Contraseña</h2>
            <input
              type="password"
              className="w-full rounded-full bg-red-400 text-white p-5 mb-7"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full rounded-full bg-red-500 text-white p-5" onClick={loginService}>
            Enviar
          </button>
        </div>
        <AlertaModal
          mensaje="Por favor, complete todos los campos"
          mostrar={mostrarAlerta}
          onCerrar={cerrarAlerta}
        />
      </div>
    </div>
  );
}
