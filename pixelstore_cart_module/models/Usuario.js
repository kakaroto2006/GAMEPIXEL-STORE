const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  idUsuarios: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_Usuario: DataTypes.STRING(100),
  correo_Usuario: {
    type: DataTypes.STRING(100),
    unique: true
  },
  contrasenia_Usuario: DataTypes.STRING(255),
  rol: DataTypes.STRING(20),
  estado_Usuario: DataTypes.TINYINT
}, {
  tableName: 'Usuarios',
  timestamps: false
});

module.exports = Usuario;
