const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/db'); 

const Productos = sequelize.define('Productos', {
    idProductos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_producto: {
        type: DataTypes.STRING,
    },
    precio: {
        type: DataTypes.DECIMAL,
    },
    descripcion_product: {
        type: DataTypes.TEXT
    },
    stock: {
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    marca: {
        type: DataTypes.STRING,
    },
    imagen_product: {
        type: DataTypes.STRING,
    },
    Categoria_idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Productos',
    freezeTableName: true,
    timestamps: false
});

module.exports = Productos;