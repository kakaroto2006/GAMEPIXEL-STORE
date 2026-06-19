const Usuario = require('./Usuario');
const Producto = require('./Producto');
const Carrito = require('./Carrito');
const DetalleCarrito = require('./DetalleCarrito');

// Relaciones del Carrito
Usuario.hasOne(Carrito, { foreignKey: 'Usuarios_idUsuarios' });
Carrito.belongsTo(Usuario, { foreignKey: 'Usuarios_idUsuarios' });

Carrito.hasMany(DetalleCarrito, { foreignKey: 'Carrito_idCarrito', as: 'detalles' });
DetalleCarrito.belongsTo(Carrito, { foreignKey: 'Carrito_idCarrito' });

Producto.hasMany(DetalleCarrito, { foreignKey: 'Productos_idProductos' });
DetalleCarrito.belongsTo(Producto, { foreignKey: 'Productos_idProductos', as: 'producto' });

module.exports = {
  Usuario,
  Producto,
  Carrito,
  DetalleCarrito
};
