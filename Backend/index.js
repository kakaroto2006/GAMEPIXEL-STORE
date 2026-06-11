const express = require('express');
const cors = require('cors');

const Productos = require('./modelos/Productos');
const Categoria = require('./modelos/Categoria');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

/* =========================
   RELACIÓN (IMPORTANTE)
========================= */
Productos.belongsTo(Categoria, {
  foreignKey: 'Categoria_idCategoria',
  as: 'categoria'
});

/* =========================
   GET PRODUCTOS
========================= */
app.get('/productos', async (req, res) => {
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

/* =========================
   POST PRODUCTO
========================= */
app.post('/productos', async (req, res) => {
  try {

    const producto = await Productos.create(req.body);

    if (producto) {
      return res.status(200).json({
        message: 'Producto creado correctamente',
        data: producto
      });
    } else {
      return res.status(400).json({
        message: 'No se pudo crear el producto',
        data: null
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: 'Error al crear producto',
      error: error.message
    });
  }
});

/* =========================
   PUT PRODUCTO
========================= */
app.put('/productos/:id', async (req, res) => {
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

/* =========================
   DELETE PRODUCTO
========================= */
app.delete('/productos/:id', async (req, res) => {
  try {

    const deleted = await Productos.destroy({
      where: {
        idProductos: req.params.id
      }
    });

    if (deleted) {
      return res.status(200).json({
        message: 'Producto eliminado correctamente'
      });
    } else {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar producto',
      error: error.message
    });
  }
});

/* =========================
   SERVER
========================= */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});