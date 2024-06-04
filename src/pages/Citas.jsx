import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CitasContext } from '../components/CitasContext';

export const Citas = () => {
  const {citas, setCitas } = useContext(CitasContext);
  const [newCita, setNewCita] = useState("");
  const [newDescripcion, setNewDescripcion] = useState("");
  const [newFecha, setNewFecha] = useState("");
  const [newHora, setNewHora] = useState("");
  const [newPaciente, setNewPaciente] = useState("");
  const [newSubtarea, setNewSubtarea] = useState("");
  const [valorUnido, setValorUnido] = useState('');

  function handleInputChange(e) {
    setNewCita(e.target.value);
    setValorUnido(e.target.value + newDescripcion + newFecha + newHora + newPaciente);
  }

  function handleInputChange1(e) {
    setNewDescripcion(e.target.value);
    setValorUnido(newCita + e.target.value + newFecha + newHora + newPaciente);
  }

  function handleInputChange2(e) {
    setNewFecha(e.target.value);
    setValorUnido(newCita + newDescripcion + e.target.value + newHora + newPaciente);
  }

  function handleInputChange3(e) {
    setNewHora(e.target.value);
    setValorUnido(newCita + newDescripcion + newFecha + e.target.value + newPaciente);
  }

  function handleInputChange4(e) {
    setNewPaciente(e.target.value);
    setValorUnido(newCita + newDescripcion + newFecha + newHora + e.target.value);
  }

  function addCita() {
    if (valorUnido.trim() !== "") {
      const nuevaCita = {
        cita: newCita,
        descripcion: newDescripcion,
        fecha: newFecha,
        hora: newHora,
        paciente: newPaciente,
        subtareas: []
      };
      setCitas([...citas, nuevaCita]);
      setNewCita("");
      setNewDescripcion("");
      setNewFecha("");
      setNewHora("");
      setNewPaciente("");
      setValorUnido("");


      // Enviar la nueva cita al servidor usando Axios
      axios.post('/api/citas', nuevaCita)
      .then(response => {
        console.log('Cita guardada en el servidor:', response.data);
      })
      .catch(error => {
        console.error('Error al guardar la cita:', error);
      });
    }
  }

  function deleteCita(index) {
    const updateCitas = citas.filter((_, i) => i !== index);
    setCitas(updateCitas);
  }

  function moveCitaUp(index) {
    if (index > 0) {
      const updateCitas = [...citas];
      [updateCitas[index], updateCitas[index - 1]] = [updateCitas[index - 1], updateCitas[index]];
      setCitas(updateCitas);
    }
  }

  function moveCitaDown(index) {
    if (index < citas.length - 1) {
      const updateCitas = [...citas];
      [updateCitas[index], updateCitas[index + 1]] = [updateCitas[index + 1], updateCitas[index]];
      setCitas(updateCitas);
    }
  }
  function addSubtarea(index) {
    if (newSubtarea.trim() !== "") {
      const nuevaSubtarea = { descripcion: newSubtarea, estado: 'pendiente' };
      const updatedCitas = [...citas];
      updatedCitas[index].subtareas.push(nuevaSubtarea);
      setCitas(updatedCitas);
      setNewSubtarea("");
    }
  }

  return (
  <div className='bg-gray-900 w-screen h-screen'>
    <div className="max-w-6xl mx-auto my-0 p-14 bg-white border-spacing-4 rounded-lg shadow-md flex flex-col md:flex-row overflow-y-auto">
      <div className="mb-6 flex-1">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Agendar cita</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          type="text"
          placeholder="Ingresa la Cita"
          value={newCita}
          onChange={handleInputChange}
          />
          <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          type="text"
          placeholder="Ingresa la Descripción"
          value={newDescripcion}    
          onChange={handleInputChange1}
          />
          <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          type="date"
          placeholder="Ingresa la fecha"
          value={newFecha}
          onChange={handleInputChange2}
          />
          <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          type="time"
          placeholder="Ingresa la hora"
          value={newHora}
          onChange={handleInputChange3}
          />
          <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          type="text"
          placeholder="Ingresa nombre del paciente"
          value={newPaciente}
          onChange={handleInputChange4}
          />
          </div>
          <input
          type="text"
          value={valorUnido}
          readOnly
          placeholder="Valor unido"
          className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
          />
          <button
            className="mt-4 px-6 py-2 bg-red-300 text-white font-semibold rounded-md hover:bg-red-400 transition-colors duration-300"
            onClick={addCita}
          >
            Agregar
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Citas agendadas</h2>
      <ul> {citas.map((cita, index) => (
      <li
      key={index}
      className="p-4 bg-gray-100 rounded-md mb-4 shadow-md flex justify-between items-center">
      <div>
        <p className="text-gray-800 font-semibold">Cita: {cita.cita}</p>
        <p className="text-gray-600">Descripción: {cita.descripcion}</p>
        <p className="text-gray-600">Fecha: {cita.fecha}</p>
        <p className="text-gray-600">Hora: {cita.hora}</p>
        <p className="text-gray-600">Paciente: {cita.paciente}</p>
      </div>
      <div className="flex">
        <button
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 mr-2"
          onClick={() => deleteCita(index)}
        >
            Borrar
            </button>
            <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300 mr-2"
            onClick={() => moveCitaUp(index)}
            disabled={index === 0}
            >
            Subir
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
              onClick={() => moveCitaDown(index)}
              disabled={index === citas.length - 1}
            >
              Bajar
            </button>
          </div>
        </li>
      ))}
    </ul>
    <ul>
        {citas.map((cita, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-md mb-4 shadow-md flex flex-col"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-800 font-semibold">Cita: {cita.cita}</p>
                    <p className="text-gray-600">Descripción: {cita.descripcion}</p>
                    <p className="text-gray-600">Fecha: {cita.fecha}</p>
                    <p className="text-gray-600">Hora: {cita.hora}</p>
                    <p className="text-gray-600">Paciente: {cita.paciente}</p>
                  </div>
                  <div className="flex">
                    {/* ... (el resto del código de Citas.jsx) */}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Subtareas</h3>
                  <ul>
                    {cita.subtareas.map((subtarea, index) => (
                      <li key={index}>{subtarea.descripcion}</li>
                    ))}
                  </ul>
                  <div className="flex">
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
                      type="text"
                      placeholder="Agregar subtarea"
                      value={newSubtarea}
                      onChange={(e) => setNewSubtarea(e.target.value)}
                    />
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
                      onClick={() => addSubtarea(index)}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
      </div>
    </div>
    </div>
  
  );
};