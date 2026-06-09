const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/db'); 

const DetalleCarrito = sequelize.define('Detalle_carrito', {
    idDetalle_carrito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    Carrito_idCarrito: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Productos_idProductos: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Detalle_carrito',
    timestamps: false
});

module.exports = DetalleCarrito;