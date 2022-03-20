const disconnectFromRoom = () => {
  socket.to(roomID).broadcast.emit('user-disconnected', userID);
};

const broadcastMessage = (message) => {
  socket
    .to(roomID)
    .broadcast.emit('new-broadcast-messsage', { ...message, userData });
};

exports.joinRoom = (userData) => {
  const { roomID, userID } = userData;
  socket.join(roomID);
  socket.to(roomID).broadcast.emit('new-user-connect', userData);
  socket.on('disconnect', disconnectFromRoom);
  socket.on('broadcast-message', broadcastMessage);
  socket.on('reconnect-user', () => {
    socket.to(roomID).broadcast.emit('new-user-connect', userData);
  });
  socket.on('display-media', (value) => {
    socket.to(roomID).broadcast.emit('display-media', { userID, value });
  });
  socket.on('user-video-off', (value) => {
    socket.to(roomID).broadcast.emit('user-video-off', value);
  });
};
