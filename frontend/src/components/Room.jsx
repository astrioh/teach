import { Box, Center, Flex, Icon } from '@chakra-ui/react';
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsFillMicFill,
  BsFillMicMuteFill,
} from 'react-icons/bs';
import React, { useState, useEffect, useRef } from 'react';

import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';
import usePeer from '../hooks/usePeer';
import useLocalMedia from '../hooks/useLocalMedia';
import useRemoteStreams from '../hooks/useRemoteStreams';
import useStream from '../hooks/useStream';

const Room = ({ roomId, socket, connectedPeers, connect, disconnect }) => {
  console.log('rerender');
  const auth = useAuth();
  const [remoteStreams, addRemoteStream, removeRemoteStream] =
    useRemoteStreams();
  const [myPeer, myPeerId] = usePeer(addRemoteStream, removeRemoteStream);
  const localMedia = useLocalMedia();
  const [setLocalStream, localVideoRef, handleCanPlayLocal] = useStream();

  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [peersOnline, setPeersOnline] = useState([]);
  const [isConnected, setConnected] = useState(false);
  console.log(1234);

  const hangUp = async () => {
    setConnected(false);
    disconnect(myPeerId);
    Object.keys(myPeer.connections).map((conn) => {
      if (myPeer.connections[conn][0]) myPeer.connections[conn][0].close();
    });
  };

  const call = (remoteid) => {
    let call = myPeer.call(remoteid, localMedia);
    console.log('call');

    call.on('stream', (remoteStream) => {
      addRemoteStream(remoteStream, call.peer);
      console.log('Connected to ' + call.peer);
    });

    call.on('close', () => {
      console.log('call closed');
      removeRemoteStream(call.peer);
      call.close();
    });

    call.on('error', (error) => {
      console.log('call error', error);
      removeRemoteStream(call.peer);
      call.close();
    });
  };

  useEffect(() => {
    if (!socket || (socket && !socket.connected) || !myPeerId || !localMedia)
      return;

    console.log(socket);

    setConnected(true);
    socket.emit('dev', 1);
    connect(auth.user.fullName, roomId, myPeerId);
  }, [socket, myPeerId, auth.user.fullName, roomId, localMedia]);

  useEffect(() => {
    if (connectedPeers.length && myPeerId) {
      console.log('PEERS ONLINE', connectedPeers);
      const otherPeers = connectedPeers.filter((peer) => peer !== myPeerId);
      setPeersOnline(otherPeers);
      for (const peer of otherPeers) {
        call(peer);
      }
    }
  }, [connectedPeers, myPeerId]);

  useEffect(() => {
    if (localMedia) setLocalStream(localMedia);
  }, [localMedia]);

  const refsArray = useRef([]);
  useEffect(() => {
    remoteStreams.map(
      (streamData) =>
        (refsArray.current[streamData.peerId].srcObject = streamData.stream),
    );
  }, [remoteStreams]);

  return (
    <Flex height='100vh' width='100%' bgColor='blue' flexDirection={'column'}>
      <Center flex={1}>
        <div style={{ marginRight: '5px' }}>
          <video
            onContextMenu={(event) => event.preventDefault()}
            ref={localVideoRef}
            onCanPlay={handleCanPlayLocal}
            autoPlay
            playsInline
            muted
          />
        </div>

        {remoteStreams.map((dataStream, i, arr) => (
          <div>
            <video
              key={dataStream.peerId}
              onContextMenu={(event) => event.preventDefault()}
              ref={(ref) => (refsArray.current[dataStream.peerId] = ref)}
              autoPlay
              playsInline
            />
          </div>
        ))}
      </Center>
      <Flex
        position={'sticky'}
        bottom='0'
        justifyContent={'center'}
        padding={15}
      >
        <Icon
          color={'white'}
          onClick={() => setIsAudioEnabled(!isAudioEnabled)}
          w={16}
          h={16}
          as={isAudioEnabled ? BsFillMicFill : BsFillMicMuteFill}
          cursor='pointer'
        />
        <Icon
          color={'white'}
          onClick={() => setIsVideoEnabled(!isVideoEnabled)}
          w={16}
          h={16}
          as={isVideoEnabled ? BsFillCameraVideoFill : BsFillCameraVideoOffFill}
          cursor='pointer'
        />
      </Flex>
    </Flex>
  );
};

export default Room;
