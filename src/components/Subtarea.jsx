import React from 'react';

export const Subtarea = ({ subtarea, onDragOver, onDrop, estado }) => {
  return (
    <div
      className={`bg-white p-2 rounded-md mb-2 shadow-md cursor-move ${
        estado === 'pendiente' ? 'text-red-500' : estado === 'proceso' ? 'text-yellow-500' : 'text-green-500'
      }`}
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify(subtarea))}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, estado)}
    >
      {subtarea.descripcion}
    </div>
  );
};