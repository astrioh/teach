module.exports = (sequelize, Sequelize) => {
  const TeacherStudent = sequelize.define('teachers_students');

  return TeacherStudent;
};
