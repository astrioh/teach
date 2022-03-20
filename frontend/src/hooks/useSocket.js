import React, { createContext, useContext, useState } from 'react';
import { io } from 'socket.io-client';

const socketContext = createContext();

export const ProvideSocket = ({ children }) => {
  const [socket, setSocket] = useState(io('ws://localhost:8080'));

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(socketContext);
};
