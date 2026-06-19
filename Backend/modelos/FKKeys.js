
const Productos = require('./Productos');
const Categoria = require('./Categoria');
const Resenia = require('./Resenia')
const Usuario = require('./Usuarios')
const DetalleCarrito = require('./DetalleCarrito'); 
const Carrito=require('./Carrito')
const Favoritos = require('./Favoritos')

Productos.belongsTo(Categoria, {
  foreignKey: 'Categoria_idCategoria',
  as: 'categoria'
})

Categoria.hasMany(Productos, {
  foreignKey: 'Categoria_idCategoria',
  as: 'productos'
})

Resenia.belongsTo(Usuario, {
  foreignKey: 'Usuarios_idUsuarios',
  as: 'usuario'
})

Usuario.hasMany(Resenia, {
  foreignKey: 'Usuarios_idUsuarios',
  as: 'resenias'
})

Productos.hasMany(DetalleCarrito, {
  foreignKey: 'Productos_idProductos',
  as: 'detalle_carrito'
});


DetalleCarrito.belongsTo(Productos, {
  foreignKey: 'Productos_idProductos',
  as: 'producto'
});


Carrito.hasMany(DetalleCarrito, {
  foreignKey: 'Carrito_idCarrito',
  as: 'detalles'
});
DetalleCarrito.belongsTo(Carrito, {
  foreignKey: 'Carrito_idCarrito',
  as: 'carrito'
});

Usuario.hasOne(Carrito, { 
    foreignKey: 'Usuarios_idUsuarios', 
    as: 'carrito' 
});
Carrito.belongsTo(Usuario, { 
    foreignKey: 'Usuarios_idUsuarios', 
    as: 'usuario' 
});

Favoritos.belongsTo(Productos, {
  foreignKey: 'Productos_idProductos',
  as: 'producto'
});

Productos.hasMany(Favoritos, {
  foreignKey: 'Productos_idProductos',
  as: 'favoritos'
});