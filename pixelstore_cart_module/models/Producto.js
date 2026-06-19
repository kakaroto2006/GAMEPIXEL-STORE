const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
  idProductos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_producto: DataTypes.STRING(45),
  precio: DataTypes.DECIMAL(10, 2),
  descripcion_product: DataTypes.TEXT,
  stock: DataTypes.INTEGER,
  estado: DataTypes.TINYINT,
  marca: DataTypes.STRING(100),
  imagen_product: DataTypes.STRING(200),
  Categoria_idCategoria: DataTypes.INTEGER
}, {
  tableName: 'Productos',
  timestamps: false
});

module.exports = Producto;
