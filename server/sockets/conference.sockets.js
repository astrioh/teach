const { userJoin, userLeave, getUser, users } = require('../utils/users');

module.exports = function (io, socket) {
  console.log('socket established');
  let userPeers = [];

  socket.on('joinRoom', (name, room, peerID) => {
    const user = userJoin({ id: socket.id, name, room, peerID });
    if (peerID) userPeers.push(peerID);
    socket.join(user.room);
    socket.peerID = peerID;

    console.log(user);
    let allMembersInRoom = users
      .filter((user) => user.room === room)
      .map((user) => user.peerID);

    io.to(room).emit('allMembers', allMembersInRoom);

    console.log(`${name} has joined to room`);
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      socket.broadcast.to(user.room).emit('message', {
        name: 'Admin',
        msg: `${user.name} has left to room`,
      });

      let allMembersInRoom = users
        .filter((_user) => _user.room === user.room)
        .map((user) => user.peerID);
      io.to(user.room).emit('allMembers', allMembersInRoom);
    }

    userPeers = userPeers.filter((id) => id !== socket.peerID);

    if (socket.client.conn.server.clientsCount == 0) {
      userPeers = [];
    }
  });

  socket.on('getPeers', ({ peerId }) => {
    if (peerId) {
      userPeers = userPeers.filter((id) => id !== peerId);
      socket.peerID = null;
      let user = userLeave(socket.id);

      if (user) {
        socket.broadcast.to(user.room).emit('message', {
          name: 'Admin',
          msg: `${user.name} has left to room`,
        });

        let allMembersInRoom = users
          .filter((_user) => _user.room === user.room)
          .map((user) => user.peerID);
        io.to(user.room).emit('allMembers', allMembersInRoom);
      }
    }
  });

  socket.on('peerClosed', ({ room }) => {
    console.log(room);
    let peers = users
      .filter((user) => user.room === room)
      .map((user) => user.peerId);

    io.to(room).emit('sendPeers', peers);
  });
};
