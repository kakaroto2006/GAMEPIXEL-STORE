const express = require('express');
const router = express.Router();

const Favoritos = require('../modelos/Favoritos');
const Productos = require('../modelos/Productos');

// Agregar Favoritos
router.post('/agregar', async (req, res) => {
    try {
        const { Usuarios_idUsuarios, Productos_idProductos } = req.body;

        const existe = await Favoritos.findOne({
            where: { Usuarios_idUsuarios, Productos_idProductos }
        });

        if (existe) {
            return res.json({ mensaje: "Ya está en favoritos" });
        }

        const nuevo = await Favoritos.create({
            fecha_agregada: new Date(),
            Usuarios_idUsuarios,
            Productos_idProductos
        });

        res.json(nuevo);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener Favoritos Por Usuario
router.get('/usuario/:idUsuario', async (req, res) => {
    try {
        const { idUsuario } = req.params;

        const favoritos = await Favoritos.findAll({
            where: { Usuarios_idUsuarios: idUsuario },
            include: [
                {
                    model: Productos
                }
            ]
        });

        res.json(favoritos);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar Favorito
router.delete('/eliminar/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await Favoritos.destroy({
            where: { idFavoritos: id }
        });

        res.json({ mensaje: "Eliminado de favoritos" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;                                                                                                                                                                                             Mire ahora Marlon