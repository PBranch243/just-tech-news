const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Foster extends Model {}

Foster.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: false
  },
  last_name: {
      type: DataTypes.STRING(30),
      allowNull: false
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: true
      }
  },
  is_employee: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'foster'
  }
);

module.exports = Foster;
