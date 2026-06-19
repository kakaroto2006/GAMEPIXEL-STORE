const express = require('express');
const router = express.Router();
const sequelize = require('../conexion/db');

const Carrito = require('../modelos/Carrito');
const DetalleCarrito = require('../modelos/DetalleCarrito');
const Productos = require('../modelos/Productos');

router.get('/carrito/:idUsuario', async (req, res) => {
  try {
    const { idUsuario } = req.params;

    let carrito = await Carrito.findOne({
      where: { Usuarios_idUsuarios: idUsuario }
    });

    if (!carrito) {
      return res.status(200).json({
        message: 'Carrito vacío',
        data: [] 
      });
    }

    const detalles = await DetalleCarrito.findAll({
      where: { Carrito_idCarrito: carrito.idCarrito },
      include: [{ model: Productos, as: 'producto' }]
    });

    return res.status(200).json({
      message: 'Carrito obtenido correctamente',
      data: detalles
    });

  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
  }
});


router.post('/carrito', async (req, res) => {
  try {

    const { Usuarios_idUsuarios, idProducto, cantidad } = req.body;

    console.log("Datos recibidos:", { Usuarios_idUsuarios, idProducto, cantidad });

    if (!Usuarios_idUsuarios) {
       return res.status(400).json({ message: "Falta el ID del usuario" });
    }

    let carrito = await Carrito.findOne({
      where: { Usuarios_idUsuarios: Usuarios_idUsuarios }
    });

    if (!carrito) {
      carrito = await Carrito.create({ Usuarios_idUsuarios: Usuarios_idUsuarios });
    }

    const nuevoDetalle = await DetalleCarrito.create({
      cantidad: cantidad,
      Carrito_idCarrito: carrito.idCarrito,
      Productos_idProductos: idProducto
    });

    return res.status(201).json({ message: 'Producto agregado', data: nuevoDetalle });

  } catch (error) {
    return res.status(500).json({ message: 'Error', error: error.message });
  }
});

router.put('/carrito/:idDetalle', async (req, res) => {
  try {
    const { idDetalle } = req.params;
    const { nuevaCantidad } = req.body;

    const detalle = await DetalleCarrito.findOne({
      where: { idDetalle_carrito: idDetalle }
    });

    if (!detalle) {
      return res.status(404).json({ message: 'El producto no está en el carrito' });
    }


    detalle.cantidad = nuevaCantidad;
    await detalle.save();

    return res.status(200).json({
      message: 'Cantidad actualizada correctamente',
      data: detalle
    });

  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar cantidad', error: error.message });
  }
});

router.delete('/carrito/:idDetalle', async (req, res) => {
  try {
    const { idDetalle } = req.params;

    const deleted = await DetalleCarrito.destroy({
      where: { idDetalle_carrito: idDetalle }
    });

    if (deleted) {
      return res.status(200).json({
        message: 'Producto eliminado del carrito correctamente'
      });
    } else {
      return res.status(404).json({
        message: 'El producto no se encontró en el carrito'
      });
    }

  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
});


module.exports = router;