const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetalleCarrito = sequelize.define('DetalleCarrito', {
  idDetalle_carrito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1
  },
  Carrito_idCarrito: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Carrito',
      key: 'idCarrito'
    }
  },
  Productos_idProductos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Productos',
      key: 'idProductos'
    }
  }
}, {
  tableName: 'Detalle_carrito',
  timestamps: false
});

module.exports = DetalleCarrito;
