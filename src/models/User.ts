import {
  Model,
  DataTypes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '../dbConnection';
import TodoItem from './TodoItem';

class User extends Model {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare fullname: string;
  declare token: string;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  declare confirmedAt: CreationOptional<Date>;
  getTodoItems: any;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please enter email'
        }
      }
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter password'
        },
        notEmpty: {
          msg: 'Please enter password'
        },
      }
    },
    fullname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Please enter fullname'
        },
        notEmpty: {
          msg: 'Please enter fullname'
        },
      }
    },
    token: {
      type: new DataTypes.STRING(256),
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    confirmedAt: DataTypes.DATE,
  },
  {
    modelName: 'User',
    tableName: 'users',
    sequelize
  }
);

User.hasMany(TodoItem, { foreignKey: 'userId' });
TodoItem.belongsTo(User, { as: 'User', foreignKey: 'userId' });

export default User;