import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publishYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true, // This automatically creates "createdAt" and "updatedAt" columns
});

export { Book };