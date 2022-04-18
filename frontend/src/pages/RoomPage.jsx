import React from 'react';
import { useParams } from 'react-router-dom';

import Room from '../components/Room';
import useSocket from '../hooks/useSocket';

function RoomPage() {
  const { roomId } = useParams();
  const { socket, connectedPeers, connect, disconnect } = useSocket();
  return (
    <Room
      roomId={roomId}
      socket={socket}
      connectedPeers={connectedPeers}
      connect={connect}
      disconnect={disconnect}
    />
  );
}

export default RoomPage;
