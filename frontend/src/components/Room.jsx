import {
  Avatar,
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsFillMicFill,
  BsFillMicMuteFill,
  BsFillTelephoneXFill,
} from 'react-icons/bs';
import React, { useState, useEffect, useRef } from 'react';

import useAuth from '../hooks/useAuth';
import usePeer from '../hooks/usePeer';
import useLocalMedia from '../hooks/useLocalMedia';
import useRemoteStreams from '../hooks/useRemoteStreams';
import useStream from '../hooks/useStream';
import BackButton from './BackButton';

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

  const toggleAudio = () => {
    localMedia.getAudioTracks()[0].enabled = !isAudioEnabled;
    setIsAudioEnabled(!isAudioEnabled);
  };

  const toggleVideo = () => {
    localMedia.getVideoTracks()[0].enabled = !isVideoEnabled;
    setIsVideoEnabled(!isVideoEnabled);
  };

  const hangUp = async () => {
    setConnected(false);
    disconnect(myPeerId);
    Object.keys(myPeer.connections).map((conn) => {
      if (myPeer.connections[conn][0]) myPeer.connections[conn][0].close();
    });
  };

  const call = (remoteId) => {
    if (peersOnline.includes(remoteId)) {
      return;
    }

    let call = myPeer.call(remoteId, localMedia);
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
    if (localMedia) {
      setLocalStream(localMedia);
      // localMedia.getAudioTracks()[0].enabled = isAudioEnabled;
      // localMedia.getVideoTracks()[0].enabled = isVideoEnabled;
    }
  }, [localMedia]);

  const refsArray = useRef([]);
  useEffect(() => {
    remoteStreams.map(
      (streamData) =>
        (refsArray.current[streamData.peerId].srcObject = streamData.stream),
    );
  }, [remoteStreams]);

  return (
    <Flex
      width='100%'
      height='100vh'
      padding='50px 150px'
      bgColor='#0D2426'
      flexDirection='column'
      alignItems='flex-start'
    >
      <BackButton
        size='lg'
        to='/lessons'
        marginBottom='20px'
        opacity='0.6'
        _hover={{ opacity: 1 }}
      />
      <HStack justifyContent='center' flex={1} w='100%' spacing='15px'>
        {isVideoEnabled || true ? (
          <video
            onContextMenu={(event) => event.preventDefault()}
            ref={localVideoRef}
            onCanPlay={handleCanPlayLocal}
            autoPlay
            style={{
              transform: 'scaleX(-1)',
              minHeight: '480px',
              maxWidth: '850px',
              flex: '1',
            }}
            playsInline
            muted
          />
        ) : (
          <Center bgColor='black' minHeight='480px' maxWidth='850px' flex='1'>
            <Avatar name='' />
          </Center>
        )}

        {remoteStreams.map((dataStream, i, arr) => (
          <video
            key={dataStream.peerId}
            onContextMenu={(event) => event.preventDefault()}
            ref={(ref) => (refsArray.current[dataStream.peerId] = ref)}
            style={{
              transform: 'scaleX(-1)',
              minHeight: '480px',
              maxWidth: '850px',
              flex: '1',
            }}
            autoPlay
            playsInline
          />
        ))}
      </HStack>
      <HStack
        position='sticky'
        bottom='0'
        justifyContent='center'
        width='100%'
        spacing='15px'
      >
        <IconButton
          width={12}
          height={12}
          padding='0'
          color={isAudioEnabled ? 'white' : 'red'}
          variant='ghost'
          _hover=''
          onClick={toggleAudio}
          icon={
            <Icon
              as={isAudioEnabled ? BsFillMicFill : BsFillMicMuteFill}
              width='100%'
              height='100%'
            />
          }
        />
        <IconButton
          width={12}
          height={12}
          padding='0'
          color={isVideoEnabled ? 'white' : 'red'}
          variant='ghost'
          _hover=''
          onClick={toggleVideo}
          icon={
            <Icon
              as={
                isVideoEnabled
                  ? BsFillCameraVideoFill
                  : BsFillCameraVideoOffFill
              }
              width='100%'
              height='100%'
            />
          }
        />
        <IconButton
          width={12}
          height={12}
          padding='0'
          color='red'
          variant='ghost'
          _hover=''
          onClick={toggleVideo}
          icon={<Icon as={BsFillTelephoneXFill} width='100%' height='100%' />}
        />
      </HStack>
    </Flex>
  );
};

export default Room;
