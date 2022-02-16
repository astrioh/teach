const { Op } = require('sequelize');

const db = require('../models');
const User = db.user;

const checkDuplicateEmailOrUsername = (req, res, next) => {
  User.findOne({
    where: {
      [Op.or]: {
        email: req.body.email,
      },
    },
  }).then((user) => {
    if (!user) {
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

const verifySignup = {
  checkDuplicateEmail: checkDuplicateEmailOrUsername,
};

module.exports = verifySignup;
