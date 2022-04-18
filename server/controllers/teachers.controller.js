const db = require('../models');
const { ROLES } = require('../utils/constants');

const User = db.user;

exports.getTeachers = (req, res) => {
  User.findAll({
    where: {
      roleId: ROLES.TEACHER,
    },
  })
    .then((teachers) => {
      res.status(200).send(teachers);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
