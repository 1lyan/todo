import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '../dbConnection';
import User from './User';

class TodoItem extends Model<InferAttributes<TodoItem>, InferCreationAttributes<TodoItem>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare userId: number;
  declare text: string;
  declare status: string;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

TodoItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: User,
        // This is the column name of the referenced model
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    text: { type: DataTypes.TEXT, validate: { notEmpty: true }},
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    modelName: 'TodoItem',
    tableName: 'todo_items',
    sequelize
  }
);

export default TodoItem;