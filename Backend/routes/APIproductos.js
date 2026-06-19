const express = require('express');
const router = express.Router();

const Productos = require('../modelos/Productos');
const Categoria = require('../modelos/Categoria');

router.get('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params

    const producto = await Productos.findOne({
      where: {
        idProductos: id
      }
    })

    if (!producto) {
      return res.status(404).json({ message: 'No encontrado' })
    }

    res.json(producto)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


router.get('/productos', async (req, res) => {
  try {

    const productos = await Productos.findAll({
      include: [{
        model: Categoria,
        as: 'categoria'
      }]
    });

    if (productos.length > 0) {
      return res.status(200).json({
        message: 'Productos obtenidos correctamente',
        data: productos
      });
    } else {
      return res.status(200).json({
        message: 'No hay productos',
        data: []
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener productos',
      error: error.message
    });
  }
});


router.post('/productos', async (req, res) => {
  try {

    const body = {
      ...req.body,
      estado: req.body.estado ?? 1
    }

    const producto = await Productos.create(body);

    return res.status(200).json({
      message: 'Producto creado correctamente',
      data: producto
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Error al crear producto',
      error: error.message
    });
  }
});


router.put('/productos/:id', async (req, res) => {
  try {

    const [updated] = await Productos.update(req.body, {
      where: {
        idProductos: req.params.id
      }
    });

    if (updated) {
      return res.status(200).json({
        message: 'Producto actualizado correctamente'
      });
    } else {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar producto',
      error: error.message
    });
  }
});


router.put('/productos/desactivar/:id', async (req, res) => {

  try {

    const [updated] = await Productos.update(
      {
        estado: 0
      },
      {
        where: {
          idProductos: req.params.id
        }
      }
    )

    if (updated) {
      return res.status(200).json({
        message: 'Producto desactivado correctamente'
      })
    }

    return res.status(404).json({
      message: 'Producto no encontrado'
    })

  } catch (error) {

    return res.status(500).json({
      message: 'Error al desactivar producto',
      error: error.message
    })

  }

})

module.exports = router;
