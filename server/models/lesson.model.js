module.exports = (sequelize, Sequelize) => {
  const Lesson = sequelize.define('lesson', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    startTime: {
      type: Sequelize.DATE,
    },
    endTime: {
      type: Sequelize.DATE,
    },
  });

  return Lesson;
};
