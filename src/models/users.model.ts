import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Femenino', 'Masculino', 'No binario'),
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email_confirmado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

export default UserModel;
