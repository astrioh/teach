const db = require('../models');
const config = require('../config/auth.config');
const { ROLES } = require('../utils/constants');

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signUp = (req, res) => {
  User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    bio: req.body.bio || null,
  })
    .then((user) => {
      if (req.body.role) {
        Role.findOne({
          where: {
            id: {
              [Op.or]: req.body.role,
            },
          },
        }).then((role) => {
          user.setRole(role).then(() => {
            res.send({ message: 'User was registered successfully' });
          });
        });
      } else {
        user.setRoles([ROLES.STUDENT]).then(() => {
          res.send({ message: 'User was registered successfully' });
        });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      user.getRole().then((role) => {
        res.status(200).send({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          bio: user.bio,
          role: role,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
