import { useState, useEffect, createContext, useRef } from 'react';
import io from 'socket.io-client';

const socketURL = 'http://localhost:4000';
// TODO: Move socket emit logic into api.js, change event names into constants
const useSocket = () => {
  console.log('init');

  const [socket, setSocket] = useState(null);
  const [connectedPeers, setConnectedPeers] = useState([]);

  useEffect(() => {
    setSocket(io(socketURL));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('connected');
      });

      socket.on('disconnect', () => {
        console.log('disconnected');
        cleanUp();
      });

      socket.on('allMembers', (peersData) => {
        setConnectedPeers(peersData);
      });

      socket.on('updateMembers', () => {
        socket.emit('getPeers');
      });
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

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
