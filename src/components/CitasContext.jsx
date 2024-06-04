import React, { createContext, useState } from 'react';

export const CitasContext = createContext();

export const CitasProvider = ({ children }) => {
  const [citas, setCitas] = useState([]);

  return (
    <CitasContext.Provider value={{ citas, setCitas }}>
      {children}
    </CitasContext.Provider>
  );
};