import React from 'react';

export const AlertaModal = ({ mensaje, mostrar, onCerrar }) => {
  return (
    <>
      {mostrar && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-red-500 font-bold mb-4">{mensaje}</p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={onCerrar}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

