import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// TODO: Move socket emit logic into api.js, change event names into constants
const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [connectedPeers, setConnectedPeers] = useState([]);
  const socketURL = 'ws://localhost:8080';

  const cleanUp = () => {
    setConnectedPeers([]);
  };

  const connect = (peerId) => {
    socket.emit('join_room', peerId);
  };

  const disconnect = (peerId) => {
    socket.emit('disconnect', peerId);
  };

  useEffect(() => {
    const ws = socket ? socket : io(socketURL);

    setSocket(ws);

    ws.on('connect', () => {
      console.log('connected');
      ws.emit('peers');
    });

    ws.on('disconnect', () => {
      console.log('disconnected');
      cleanUp();
    });

    ws.on('peers', (peersData) => {
      setConnectedPeers(peersData);
    });

    ws.on('updatePeers', () => {
      ws.emit('peers');
    });

    return () => {
      ws.disconnect();
      cleanUp();
    };
  }, [socket]);

  return { socket, connectedPeers, connect, disconnect };
};

export default useSocket;
