const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/db'); 

const Usuarios = sequelize.define('Usuarios', {
    idUsuarios: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_Usuario: {
        type: DataTypes.STRING,
    },
    correo_Usuario: {
        type: DataTypes.STRING,
        unique: true
    },
    contrasenia_Usuario: {
        type: DataTypes.STRING,
    },
    rol: {
        type: DataTypes.STRING,
    },
    estado_Usuario: {
        type: DataTypes.TINYINT
    }
}, {
    tableName: 'Usuarios',
    timestamps: false
});

module.exports = Usuarios;