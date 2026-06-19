const { Carrito, DetalleCarrito, Producto } = require('../models');

// Obtener el carrito con cálculos integrados para el Frontend
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    let [carrito] = await Carrito.findOrCreate({
      where: { Usuarios_idUsuarios: userId }
    });

    const cartDetails = await DetalleCarrito.findAll({
      where: { Carrito_idCarrito: carrito.idCarrito },
      include: [{
        model: Producto,
        as: 'producto',
        attributes: ['idProductos', 'nombre_producto', 'precio', 'imagen_product']
      }]
    });

    let subtotal = 0;
    const items = cartDetails.map(item => {
      const itemSubtotal = parseFloat(item.producto.precio) * item.cantidad;
      subtotal += itemSubtotal;

      return {
        idDetalle: item.idDetalle_carrito,
        idProducto: item.producto.idProductos,
        nombre: item.producto.nombre_producto,
        precio: parseFloat(item.producto.precio),
        imagen: item.producto.imagen_product,
        cantidad: item.cantidad,
        subtotalItem: itemSubtotal
      };
    });

    const tax = subtotal * 0.10; // 10% impuesto basado en tu UI
    const total = subtotal + tax;

    return res.status(200).json({
      idCarrito: carrito.idCarrito,
      items,
      summary: {
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        total: parseFloat(total.toFixed(2))
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
  }
};

// Agregar o incrementar producto en el carrito
exports.addToCart = async (req, res) => {
  try {
    const { userId, idProducto, cantidad } = req.body;
    const qty = cantidad ? parseInt(cantidad) : 1;

    let [carrito] = await Carrito.findOrCreate({
      where: { Usuarios_idUsuarios: userId }
    });

    let detalle = await DetalleCarrito.findOne({
      where: {
        Carrito_idCarrito: carrito.idCarrito,
        Productos_idProductos: idProducto
      }
    });

    if (detalle) {
      detalle.cantidad += qty;
      await detalle.save();
    } else {
      detalle = await DetalleCarrito.create({
        cantidad: qty,
        Carrito_idCarrito: carrito.idCarrito,
        Productos_idProductos: idProducto
      });
    }

    return res.status(201).json({ message: 'Producto agregado al carrito', detalle });
  } catch (error) {
    return res.status(500).json({ message: 'Error al agregar al carrito', error: error.message });
  }
};

// Actualizar cantidad (+ y -)
exports.updateQuantity = async (req, res) => {
  try {
    const { idDetalle } = req.params;
    const { cantidad } = req.body;

    if (cantidad <= 0) {
      return res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
    }

    const detalle = await DetalleCarrito.findByPk(idDetalle);
    if (!detalle) {
      return res.status(404).json({ message: 'Detalle no encontrado' });
    }

    detalle.cantidad = cantidad;
    await detalle.save();

    return res.status(200).json({ message: 'Cantidad actualizada', detalle });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar cantidad', error: error.message });
  }
};

// Eliminar un producto por completo del carrito
exports.removeItem = async (req, res) => {
  try {
    const { idDetalle } = req.params;

    const destruido = await DetalleCarrito.destroy({
      where: { idDetalle_carrito: idDetalle }
    });

    if (!destruido) {
      return res.status(404).json({ message: 'El producto no estaba en el carrito' });
    }

    return res.status(200).json({ message: 'Producto removido exitosamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};
