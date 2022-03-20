const controller = require('../controllers/conference.controller');

module.exports = function (socket) {
  console.log('socket established');
  socket.on('join-room', controller.joinRoom);
};
