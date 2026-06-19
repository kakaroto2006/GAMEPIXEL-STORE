const express = require('express');
const router = express.Router();
const Favoritos = require('../modelos/Favoritos');
const Productos = require('../modelos/Productos');


router.post('/favoritos', async (req, res) => {
    try {
        const { Usuarios_idUsuarios, Productos_idProductos } = req.body;
        
        const existe = await Favoritos.findOne({ 
            where: { Usuarios_idUsuarios, Productos_idProductos } 
        });
        
        if (existe) return res.json({ mensaje: "Ya está en favoritos" });

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

router.get('/favoritos/:id', async (req, res) => {

    console.log("-> Petición GET recibida. Parámetros de URL:", req.params);

    try {

        const idUsuario = req.params.id; 

        if (!idUsuario || idUsuario === 'undefined') {
            return res.status(400).json({ error: "El ID del usuario no es válido o llegó vacío" });
        }

        const favoritos = await Favoritos.findAll({
            where: { Usuarios_idUsuarios: idUsuario },
            include: [
                {
                    model: Productos,
                    as: 'producto' 
                }
            ]
        });

        res.json(favoritos);
    } catch (error) {
        console.error("ERROR EN GET FAVORITOS:", error);
        res.status(500).json({ error: error.message });
    }
});


router.delete('/favoritos/:id', async (req, res) => {
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

module.exports = router;