const db = require('../models');
const { ROLES } = require('../utils/constants');

const User = db.user;

exports.getAllStudents = (req, res) => {
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

exports.getStudentTeachers = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      association: 'teachers',
    },
  })
    .then((student) => {
      res.status(200).send(student.teachers);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
