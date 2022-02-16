const express = require('express');
const cors = require('cors');

const db = require('./models');
const { ROLES } = require('./utils/constants');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:8081',
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello JWT Auth' });
});
require('./routes/auth.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: ROLES.STUDENT,
    name: 'Ученик',
  });

  Role.create({
    id: ROLES.TEACHER,
    name: 'Учитель',
  });
}
