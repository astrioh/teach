import { useState } from 'react';

const useRemoteStreams = () => {
  const [remoteStreams, setRemoteStreams] = useState([]);

  const addRemoteStream = (stream, peerId) => {
    setRemoteStreams((remoteStreams) => {
      if (!stream || !peerId) return [...remoteStreams];
      if (remoteStreams.some((remote) => remote.peerId === peerId))
        return [...remoteStreams];
      return [...remoteStreams, { peerId: peerId, stream: stream }];
    });
  };

  const removeRemoteStream = (peerId) => {
    setRemoteStreams((remoteStreams) => {
      let index = remoteStreams.findIndex((remote) => remote.peerId === peerId);
      if (index < 0) return [...remoteStreams];
      remoteStreams.splice(index, 1);
      return [...remoteStreams];
    });
  };
  return [remoteStreams, addRemoteStream, removeRemoteStream];
};

export default useRemoteStreams;
