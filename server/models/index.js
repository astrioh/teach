const config = require('../config/db.config.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  logQueryParameters: true,
  logging: console.log,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 *  Роли и пользователи
 */
db.user = require('./user.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);

db.role.hasMany(db.user, { as: 'users' });
db.user.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: 'role',
});

db.teachersStudents = require('./teachers_students.model.js')(
  sequelize,
  Sequelize,
);

db.user.belongsToMany(db.user, {
  through: db.teachersStudents,
  foreignKey: 'studentId',
  as: 'teachers',
});
db.user.belongsToMany(db.user, {
  through: db.teachersStudents,
  foreignKey: 'teacherId',
  as: 'students',
});

module.exports = db;
