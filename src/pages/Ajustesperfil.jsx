import React, { useState } from 'react';
import fondoCitas from '../assets/img/fondocitas.png'; 

export const AjustesPerfil = () => {
  const [names, setNames] = useState('');
  const [secondName, setSecondName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [dateBirthday, setDateBirthday] = useState('');
  const [genero, setGenero] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos al backend o realizar cualquier otra acción necesaria
    console.log('Datos actualizados:', {
      names,
      secondName,
      userName,
      email,
      password,
      telephone,
      dateBirthday,
      genero,
    });
  };

  return (
    <div className="h-screen w-screen flex bg-cover bg-center" style={{ backgroundImage: `url(${fondoCitas})` }}>
      <div className="max-w-screen-2xl p-3 w-1/2 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl text-red-600 font-bold mb-4">Ajustes de Perfil</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-4">
            <div className="w-1/2 px-4 mb-4">
              <label htmlFor="names" className="block text-gray-700 font-bold mb-2">
                Nombres:
              </label>
              <input
                type="text"
                id="names"
                value={names}
                onChange={(e) => setNames(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="w-1/2 px-4 mb-4">
              <label htmlFor="secondName" className="block text-gray-700 font-bold mb-2">
                Apellidos:
              </label>
              <input
                type="text"
                id="secondName"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="w-1/2 px-4 mb-4">
              <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">
                Nombre de usuario:
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="w-1/2 px-4 mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Correo electrónico:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="w-1/2 px-4 mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="w-1/2 px-4 mb-4">
              <label htmlFor="telephone" className="block text-gray-700 font-bold mb-2">
                Teléfono:
              </label>
              <input
                type="tel"
                id="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="w-1/2 px-4 mb-4">
              <label htmlFor="dateBirthday" className="block text-gray-700 font-bold mb-2">
                Fecha de nacimiento:
              </label>
              <input
                type="date"
                id="dateBirthday"
                value={dateBirthday}
                onChange={(e) => setDateBirthday(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="w-1/2 px-4 mb-4">
              <label htmlFor="genero" className="block text-gray-700 font-bold mb-2">
                Género:
              </label>
              <select
                id="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Seleccionar género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-300 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};