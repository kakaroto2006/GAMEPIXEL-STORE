const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/db'); 

const Carrito = sequelize.define('Carrito', {
    idCarrito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Usuarios_idUsuarios: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Carrito',
    timestamps: false
});

module.exports = Carrito;