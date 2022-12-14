const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Connection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      Connection.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  Connection.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    friendId: {
      type: DataTypes.INTEGER,
    },
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Connection',
  });
  return Connection;
};
