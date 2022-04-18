const db = require('../models');
const { ROLES } = require('../utils/constants');

const User = db.user;

exports.getStudents = (req, res) => {
  User.findAll({
    where: {
      roleId: ROLES.STUDENT,
    },
  })
    .then((students) => {
      res.status(200).send(students);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
