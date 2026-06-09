const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/db'); 

const DetalleVentaUsuario = sequelize.define('Detalle_Venta_Usuario', {
    idDetalle_Venta_Usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidades: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio_unidad: {
        type: DataTypes.DECIMAL,
    },
    subTotal_Venta: {
        type: DataTypes.DECIMAL,
    },
    Venta_Usuario_idVenta_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Productos_idProductos: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Detalle_Venta_Usuario',
    timestamps: false
});

module.exports = DetalleVentaUsuario;