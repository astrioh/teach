import { useState, useEffect } from 'react';
import Peer from 'peerjs';

const userMediaConfig = {
  audio: { echoCancellation: true, noiseSuppression: true },
  video: { facingMode: 'user' },
};

const iceServers = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
  { urls: 'stun:stun3.l.google.com:19302' },
  { urls: 'stun:stun4.l.google.com:19302' },
];

function usePeer(addRemoteStream, removeRemoteStream) {
  const [myPeer, setMyPeer] = useState(null);
  const [myPeerID, setMyPeerID] = useState(null);

  const cleanUp = () => {
    if (myPeer) {
      myPeer.disconnect();
      myPeer.destroy();
    }
    setMyPeer(null);
    setMyPeerID(null);
  };

  useEffect(() => {
    const peer = myPeer
      ? myPeer
      : new Peer({
          host: 'localhost',
          port: '8080',
          path: '/peerjs',
          config: {
            iceServers: iceServers,
          },
          secure: false,
        });

    peer.on('open', () => {
      setMyPeer(peer);
      setMyPeerID(peer.id);
    });

    peer.on('call', (call) => {
      console.log('receiving call from ' + call.peer);

      navigator.mediaDevices
        .getUserMedia(userMediaConfig)
        .then((stream) => {
          call.answer(stream);

          call.on('stream', (remoteStream) => {
            addRemoteStream(remoteStream, call.peer);
          });

          call.on('close', () => {
            console.log('The call has ended');
            removeRemoteStream(call.peer);
          });

          call.on('error', (error) => {
            console.log(error);
            removeRemoteStream(call.peer);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });

    peer.on('disconnected', () => {
      console.log('Peer disconnected');
      cleanUp();
    });

    peer.on('close', () => {
      console.log('Peer closed remotely');
      cleanUp();
    });

    peer.on('error', (error) => {
      console.log('peer error', error);
      cleanUp();
    });

    return () => {
      cleanUp();
    };
  }, []);

  return [myPeer, myPeerID];
}

export default usePeer;
