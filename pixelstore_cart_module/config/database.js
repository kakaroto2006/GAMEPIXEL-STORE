const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pixelstore_DB', 'root', 'tu_contraseña', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Cambiar a console.log para ver las consultas SQL
});

module.exports = sequelize;
