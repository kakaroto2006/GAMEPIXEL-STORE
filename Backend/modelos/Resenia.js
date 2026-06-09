const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/db'); 

const Resenia = sequelize.define('Resenia', {
    idResenia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_resenia: {
        type: DataTypes.STRING,
    },
    comentario: {
        type: DataTypes.STRING,
    },
    calificacion: {
        type: DataTypes.INTEGER
    },
    fecha_comentario: {
        type: DataTypes.DATE
    },
    Usuarios_idUsuarios: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Resenia',
    timestamps: false
});

module.exports = Resenia;