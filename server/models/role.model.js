module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('roles', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
