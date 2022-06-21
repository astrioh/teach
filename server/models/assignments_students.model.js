module.exports = (sequelize, Sequelize) => {
  const AssignmentsStudents = sequelize.define('assignments_students');

  return AssignmentsStudents;
};
