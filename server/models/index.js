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
  onDelete: 'CASCADE',
});

db.teachersStudents = require('./teachers_students.model.js')(
  sequelize,
  Sequelize,
);

db.user.belongsToMany(db.user, {
  through: db.teachersStudents,
  foreignKey: 'studentId',
  as: 'teachers',
  onDelete: 'CASCADE',
});
db.user.belongsToMany(db.user, {
  through: db.teachersStudents,
  foreignKey: 'teacherId',
  as: 'students',
  onDelete: 'CASCADE',
});

/**
 *  Занятия
 */

db.lesson = require('./lesson.model.js')(sequelize, Sequelize);
db.user.hasMany(db.lesson);
db.lesson.belongsTo(db.user, {
  foreignKey: 'userId',
  as: 'creator',
  onDelete: 'CASCADE',
});

db.studentsLessons = require('./students_lessons.model.js')(
  sequelize,
  Sequelize,
);
db.user.belongsToMany(db.lesson, {
  through: db.studentsLessons,
  foreignKey: 'studentId',
  as: 'lesson',
  onDelete: 'CASCADE',
});
db.lesson.belongsToMany(db.user, {
  through: db.studentsLessons,
  foreignKey: 'lessonId',
  as: 'students',
  onDelete: 'CASCADE',
});

/**
 * Задания
 */

db.assignment = require('./assignment.model.js')(sequelize, Sequelize);
db.user.hasMany(db.assignment);
db.assignment.belongsTo(db.user, {
  foreignKey: 'teacherId',
  as: 'teacher',
  onDelete: 'CASCADE',
});

db.assignmentsStudents = require('./assignments_students.model.js')(
  sequelize,
  Sequelize,
);
db.user.belongsToMany(db.lesson, {
  through: db.assignmentsStudents,
  foreignKey: 'studentId',
  as: 'assignment',
  onDelete: 'CASCADE',
});
db.assignment.belongsToMany(db.user, {
  through: db.assignmentsStudents,
  foreignKey: 'assignmentId',
  as: 'students',
  onDelete: 'CASCADE',
});

module.exports = db;
