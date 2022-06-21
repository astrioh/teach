module.exports = (sequelize, Sequelize) => {
  const Assignment = sequelize.define('assignment', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    dateTill: {
      type: Sequelize.DATE,
    },
    mark: {
      type: Sequelize.TINYINT,
    },
  });

  return Assignment;
};
