module.exports = (sequelize, Sequelize) => {
  const StudentsLessons = sequelize.define('students_lessons');

  return StudentsLessons;
};
