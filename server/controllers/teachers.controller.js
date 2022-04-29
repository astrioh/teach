const db = require('../models');
const { ROLES } = require('../utils/constants');

const User = db.user;
const TeachersStudents = db.teachersStudents;

exports.getAllTeachers = (req, res) => {
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

exports.getTeachersStudents = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      association: 'students',
    },
  })
    .then((teacher) => {
      res.status(200).send(teacher.students);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.addStudent = (req, res) => {
  TeachersStudents.create({
    studentId: req.body.studentId,
    teacherId: req.body.teacherId,
  })
    .then((teacher) => {
      res.status(200).send(teacher.students);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
