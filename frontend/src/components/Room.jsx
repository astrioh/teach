import { Box, Center, Flex, Icon } from '@chakra-ui/react';
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsFillMicFill,
  BsFillMicMuteFill,
} from 'react-icons/bs';
import React, { useState, useEffect } from 'react';

import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';
import usePeer from '../hooks/usePeer';
import useLocalMedia from '../hooks/useLocalMedia';
import useRemoteStreams from '../hooks/useRemoteStreams';

const Room = ({ roomId }) => {
  const auth = useAuth();
  const { socket, connectedPeers, connect, disconnect } = useSocket();
  const [remoteStreams, addRemoteStream, removeRemoteStream] =
    useRemoteStreams();
  const [myPeer, myPeerId] = usePeer(addRemoteStream, removeRemoteStream);
  const localMedia = useLocalMedia();

  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [peersOnline, setPeersOnline] = useState([]);
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    if (connectedPeers && myPeerId !== undefined) {
      setPeersOnline(connectedPeers.filter((peer) => peer !== myPeerId));
    }
  }, [connectedPeers, myPeerId]);

  return (
    <Flex height='100vh' width='100%' bgColor='blue' flexDirection={'column'}>
      <Center flex={1}></Center>
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
