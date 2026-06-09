const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/db'); 

const Categoria = sequelize.define('Categoria', {
    idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_categoria: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'Categoria',
    timestamps: false
});

module.exports = Categoria;