import { useState, useEffect } from 'react';

const useLocalMedia = () => {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    const userMediaConfig = {
      audio: { echoCancellation: true, noiseSuppression: true },
      video: { facingMode: 'user' },
    };

    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          userMediaConfig,
        );
        setMediaStream(stream);
      } catch (error) {
        console.log(error);
      }
    };

    if (!mediaStream) {
      enableStream();
    } else {
      return () => {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }
  }, [mediaStream]);

  return mediaStream;
};

export default useLocalMedia;
