import { useState, useEffect, createContext, useRef } from 'react';
import io from 'socket.io-client';

const socketURL = 'http://localhost:4000';
// TODO: Move socket emit logic into api.js, change event names into constants
const useSocket = () => {
  console.log('init');

  const [socket, setSocket] = useState(null);
  const [connectedPeers, setConnectedPeers] = useState([]);

  useEffect(() => {
    const newSocket = io(socketURL);
    console.log(socket, newSocket);
    setSocket(newSocket);
    newSocket.on('connect', () => {
      console.log('connected');
    });

    newSocket.on('disconnect', () => {
      console.log('disconnected');
      cleanUp();
    });

    newSocket.on('allMembers', (peersData) => {
      setConnectedPeers(peersData);
    });

    newSocket.on('updateMembers', () => {
      newSocket.emit('allMembers');
    });
    return () => newSocket.close();
  }, [setSocket]);

  const cleanUp = () => {
    setConnectedPeers([]);
  };

  const connect = (name, room, peerId) => {
    console.log('emit join');
    socket.emit('joinRoom', name, room, peerId);
  };

  const disconnect = (peerId) => {
    console.log('emit disconnect');
    socket.emit('disconnected', peerId);
  };

  return { socket, connectedPeers, connect, disconnect };
};

export default useSocket;
