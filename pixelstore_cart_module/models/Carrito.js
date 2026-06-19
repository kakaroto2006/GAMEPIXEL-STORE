const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carrito = sequelize.define('Carrito', {
  idCarrito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Usuarios_idUsuarios: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios',
      key: 'idUsuarios'
    }
  }
}, {
  tableName: 'Carrito',
  timestamps: false
});

module.exports = Carrito;
