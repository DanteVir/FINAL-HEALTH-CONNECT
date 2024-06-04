import fondoCitas from '../assets/img/fondocitas.png';
import React, { useReducer, useContext } from 'react';
import { CitasContext } from '../components/CitasContext';

const initialState = {
  pendienteSubtareas: [],
  procesoSubtareas: [],
  finalizadasSubtareas: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'MOVER_PENDIENTE':
      return {
        ...state,
        pendienteSubtareas: [
          ...state.pendienteSubtareas,
          action.payload.task,
        ],
        procesoSubtareas: state.procesoSubtareas.filter(
          (s) => s?.id !== action.payload.task?.id
        ),
        finalizadasSubtareas: state.finalizadasSubtareas.filter(
          (s) => s?.id !== action.payload.task?.id
        ),
      };
    case 'MOVER_PROCESO':
      return {
        ...state,
        pendienteSubtareas: state.pendienteSubtareas.filter(
          (s) => s?.id !== action.payload.task?.id
        ),
        procesoSubtareas: [
          ...state.procesoSubtareas,
          action.payload.task,
        ],
        finalizadasSubtareas: state.finalizadasSubtareas.filter(
          (s) => s?.id !== action.payload.task?.id
        ),
      };
    case 'MOVER_FINALIZADA':
      return {
        ...state,
        pendienteSubtareas: state.pendienteSubtareas.filter(
          (s) => s?.id !== action.payload.task?.id
        ),
        procesoSubtareas: state.procesoSubtareas.filter(
          (s) => s?.id !== action.payload.task?.id
        ),
        finalizadasSubtareas: [
          ...state.finalizadasSubtareas,
          action.payload.task,
        ],
      };
    default:
      throw new Error('Acción no reconocida');
  }
}

export const Cliente = ({ email }) => {
  const { citas, setCitas } = useContext(CitasContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  let positionInArray = 0;

  /**
   * Maneja el evento dragover para permitir el drop en un área de destino.
   * @param {DragEvent} e - El evento de arrastrar sobre un elemento.
   */
  const handleDragOver = (e) => {
    e.preventDefault();
  }

  /**
   * Maneja el evento drop cuando se suelta un elemento arrastrable en un área de destino.
   * @param {DragEvent} e - El evento de soltar un elemento.
   * @param {string} estado - El estado al que se moverá la subtarea ('pendiente', 'proceso' o 'finalizada').
   */
  const handleDrop = (e, estado) => {
    e.preventDefault();

    const task = citas[positionInArray];
    console.log(task, state);

    setCitas(eliminarObjetoDelArray(citas, positionInArray));

    // Mover la subtarea al estado correspondiente
    switch (estado) {
      case 'pendiente':
        dispatch({ type: 'MOVER_PENDIENTE', payload: { task } });
        break;
      case 'proceso':
        dispatch({ type: 'MOVER_PROCESO', payload: { task } });
        break;
      case 'finalizada':
        dispatch({ type: 'MOVER_FINALIZADA', payload: { task } });
        break;
      default:
        console.error('Estado de subtarea no reconocido');
    }
  };

  function eliminarObjetoDelArray(array, indice) {
    // Crear una nueva copia del array original
    const nuevoArray = [...array];

    // Verificar si el índice es válido
    if (indice >= 0 && indice < nuevoArray.length) {
      // Utilizar el método splice para eliminar el objeto en el índice especificado
      nuevoArray.splice(indice, 1);

      // Devolver el nuevo array sin el objeto eliminado
      return nuevoArray;
    } else {
      // Si el índice no es válido, devolver el array original
      return array;
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

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-cover bg-center cursor-pointer" style={{ backgroundImage: `url(${fondoCitas})` }}>
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Citas de {email}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <ul>
              {Array.isArray(citas) && citas.length > 0 ? (
                citas.map((cita, index) => (
                  <li key={index} className="bg-white rounded-lg shadow-md mb-4 p-4" draggable>
                    <div className="row relative">
                      <div>
                        <p className="text-gray-800 font-semibold">Cita: {cita.cita}</p>
                        <p className="text-gray-600">Descripción: {cita.descripcion}</p>
                        <p className="text-gray-600">Fecha: {cita.fecha}</p>
                        <p className="text-gray-600">Hora: {cita.hora}</p>
                        <p className="text-gray-600">Paciente: {cita.paciente}</p>
                      </div>
                      <div className="absolute top-0 right-0">
                        <button
                          className="bg-gray-400 rounded-lg hover:bg-gray-100 shadow-md p-4"
                          onMouseLeave={() => (positionInArray = index)}
                        >
                          X
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
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
                      className="px-4 py-2 bg-white text-black rounded-md hover:bg-green-600 transition-colors duration-300"
                      onClick={() => moveCitaDown(index)}
                      disabled={index === citas.length - 1}
                    >
                      Bajar
                    </button>
                  </div>
                </li>
                // <Card fn_up={moveCitaUp} fn_down={moveCitaDown} fn_delete={deleteCita} data_cita={cita} index={index} key={index}/>
              ))
            ) : (
              <li className='text-white'>No hay citas agendadas</li>
            )}
          </ul>
        </div>
  
        <div className="bg-red-200 rounded-md hover:bg-red-100  shadow-md p-4">
          <h3 className="text-xl font-semibold mb-2">Pendientes</h3>
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'pendiente')}
            className="border-2 border-dashed border-red-400 rounded-md p-4 min-h-[200px]"
          >
            Soltar aquí para mover a pendientes
            {
              state.pendienteSubtareas.map((cita, index) => (
                <li key={index} className="bg-white rounded-lg shadow-md mb-4 p-4" draggable>
                  <div className="row relative">
                    <div>
                      <p className="text-gray-800 font-semibold">Cita: {cita.cita}</p>
                      <p className="text-gray-600">Descripción: {cita.descripcion}</p>
                      <p className="text-gray-600">Fecha: {cita.fecha}</p>
                      <p className="text-gray-600">Hora: {cita.hora}</p>
                      <p className="text-gray-600">Paciente: {cita.paciente}</p>
                    </div>
                    <div className="absolute top-0 right-0">
                      <button className='bg-gray-400 rounded-lg hover:bg-gray-100  shadow-md p-4'
                        onMouseLeave={() => positionInArray = index}
                      >X</button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
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
                      className="px-4 py-2 bg-white text-black rounded-md hover:bg-green-600 transition-colors duration-300"
                      onClick={() => moveCitaDown(index)}
                      disabled={index === citas.length - 1}
                    >
                      Bajar
                    </button>
                  </div>
                </li>
              ))
            }
          </div>
        </div>
  
        <div className="bg-green-200 rounded-lg hover:bg-green-100  shadow-md p-4">
          <h3 className="text-xl font-semibold mb-2">En Proceso</h3>
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'proceso')}
            className="border-2 border-dashed border-red-400 rounded-md p-4 min-h-[200px]"
          >
            Soltar aquí para mover a en proceso
            {
              state.procesoSubtareas.map((cita, index) => (
                <li key={index} className="bg-white rounded-lg shadow-md mb-4 p-4" draggable>
                  <div className="row relative">
                    <div>
                      <p className="text-gray-800 font-semibold">Cita: {cita.cita}</p>
                      <p className="text-gray-600">Descripción: {cita.descripcion}</p>
                      <p className="text-gray-600">Fecha: {cita.fecha}</p>
                      <p className="text-gray-600">Hora: {cita.hora}</p>
                      <p className="text-gray-600">Paciente: {cita.paciente}</p>
                    </div>
                    <div className="absolute top-0 right-0">
                      <button className='bg-gray-400 rounded-lg hover:bg-gray-100  shadow-md p-4'
                        onMouseLeave={() => positionInArray = index}
                      >X</button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
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
                      className="px-4 py-2 bg-white text-black rounded-md hover:bg-green-600 transition-colors duration-300"
                      onClick={() => moveCitaDown(index)}
                      disabled={index === citas.length - 1}
                    >
                      Bajar
                    </button>
                  </div>
                </li>
              ))
            }
          </div>
        </div>
  
        <div className="bg-amber-200 rounded-lg hover:bg-amber-100 shadow-md p-4">
          <h3 className="text-xl font-semibold mb-2">Finalizadas</h3>
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'finalizada')}
            className="border-2 border-dashed border-red-400 rounded-md p-4 min-h-[200px]"
          >
            Soltar aquí para mover a finalizadas
            {
              state.finalizadasSubtareas.map((cita, index) => (
                <li key={index} className="bg-white rounded-lg shadow-md mb-4 p-4" draggable>
                  <div className="row relative">
                    <div>
                      <p className="text-gray-800 font-semibold">Cita: {cita.cita}</p>
                      <p className="text-gray-600">Descripción: {cita.descripcion}</p>
                      <p className="text-gray-600">Fecha: {cita.fecha}</p>
                      <p className="text-gray-600">Hora: {cita.hora}</p>
                      <p className="text-gray-600">Paciente: {cita.paciente}</p>
                    </div>
                    <div className="absolute top-0 right-0">
                      <button className='bg-gray-400 rounded-lg hover:bg-gray-100  shadow-md p-4'
                        onMouseLeave={() => positionInArray = index}
                      >X</button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
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
                      className="px-4 py-2 bg-white text-black rounded-md hover:bg-green-600 transition-colors duration-300"
                      onClick={() => moveCitaDown(index)}
                      disabled={index === citas.length - 1}
                    >
                      Bajar
                    </button>
                  </div>
                </li>
              ))
            }
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}