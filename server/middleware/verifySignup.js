const { Op } = require('sequelize');

const db = require('../models');
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      [Op.or]: {
        email: req.body.email,
      },
    },
  }).then((user) => {
    if (!user) {
      next();
      return;
    }

    if (user.email === req.body.email) {
      res.status(400).send({
        message: 'Failed! Email is already in use!',
      });
    } else {
      next();
    }
  });
};

const checkPasswordMatching = (req, res, next) => {
  if (req.body.password === req.body.repeatPassword) {
    next();
  } else {
    res.status(400).send({
      message: 'Failed! Password do not match!',
    });
  }
};

const verifySignup = {
  checkDuplicateEmail,
  checkPasswordMatching,
};

module.exports = verifySignup;
