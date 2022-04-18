import { useCallback, useRef } from 'react';

const useStream = () => {
  const videoRef = useRef();

  const setStream = useCallback(
    (stream) => {
      if (stream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = stream;
      }
    },
    [videoRef],
  );

  const handleCanPlay = () => {
    videoRef.current.play();
  };

  return [setStream, videoRef, handleCanPlay];
};

export default useStream;
