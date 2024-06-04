import React from 'react';

export const AlertaModal = ({ mensaje, mostrar, onCerrar }) => {
  return (
    <>
      {mostrar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Alerta</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={onCerrar}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-700 mb-6">{mensaje}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={onCerrar}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
};