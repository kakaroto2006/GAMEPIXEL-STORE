const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/db'); 

const VentaUsuario = sequelize.define('Venta_Usuario', {
    idVenta_Usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_venta: {
        type: DataTypes.DATE
    },
    total: {
        type: DataTypes.DECIMAL,
    },
    Usuarios_idUsuarios: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Venta_Usuario',
    timestamps: false
});

module.exports = VentaUsuario;