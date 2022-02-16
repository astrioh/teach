const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;
const { ROLES } = require('../utils/constants');

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized',
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const isTeacher = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === ROLES.TEACHER) {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Require Teacher Role!',
      });
      return;
    });
  });
};

const isStudent = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === ROLES.STUDENT) {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Require Moderator Role!',
      });
    });
  });
};

module.exports = {
  verifyToken: verifyToken,
  isTeacher: isTeacher,
  isStudent: isStudent
};
