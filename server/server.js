const express = require('express');
const cors = require('cors');

const db = require('./models');
const { ROLES } = require('./utils/constants');

const bcrypt = require('bcryptjs');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')({
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
require('./routes/auth.routes')(app);
require('./routes/teachers.routes')(app);
require('./routes/students.routes')(app);
app.use(
  '/peerjs',
  require('peer').ExpressPeerServer(server, {
    debug: true,
  }),
);

// SOCKET
try {
  io.listen(4000);
  io.on('connection', (socket) => {
    console.log('SOCKET CONNECT');
    require('./sockets/conference.sockets')(io, socket);
  });
} catch (e) {
  console.log(e);
}

// START SERVER
const PORT = process.env.PORT || 8080;
server.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

const Role = db.role;

db.sequelize.sync();

function initial() {
  Role.create({
    id: ROLES.STUDENT,
    name: 'Ученик',
  });

  Role.create({
    id: ROLES.TEACHER,
    name: 'Репетитор',
  });

  db.user
    .create({
      fullName: 'Буцких Илья Александрович',
      email: 'Email',
      password: bcrypt.hashSync('111111', 8),
      bio: '',
    })
    .then((user) => {
      Role.findAll().then((roles) => {
        user.setRole(roles[0]);
      });
    });
}
