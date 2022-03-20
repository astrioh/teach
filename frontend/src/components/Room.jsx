import React from 'react';

const Room = () => {
  const handleDisconnect = () => {
    socketInstance.current?.destoryConnection();
    props.history.push('/');
  };
  return (
    <>
      <div></div>
    </>
  );
};

export default Room;
