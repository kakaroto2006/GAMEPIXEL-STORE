const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/db'); 

const Favoritos = sequelize.define('Favoritos', {
    idFavoritos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_agregada: {
        type: DataTypes.DATE
    },
    Productos_idProductos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Usuarios_idUsuarios: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Favoritos',
    timestamps: false
});

module.exports = Favoritos;