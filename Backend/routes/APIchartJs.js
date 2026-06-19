const express = require('express');
const router = express.Router();
const sequelize = require('../conexion/db');
const VentaUsuario = require('../modelos/VentaUsuario');
const DetalleVentaUsuario = require('../modelos/DetalleVentaUsuario');
const Productos = require('../modelos/Productos');

router.post('/pagar', async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { idUsuario, total, productos } = req.body;

        const nuevaVenta = await VentaUsuario.create({
            fecha_venta: new Date(),
            total: total,
            Usuarios_idUsuarios: idUsuario
        }, { transaction: t });

        const detalles = productos.map(prod => ({
            cantidades: prod.cantidad,
            precio_unidad: prod.precio,
            subTotal_Venta: prod.cantidad * prod.precio,
            Venta_Usuario_idVenta_Usuario: nuevaVenta.idVenta_Usuario,
            Productos_idProductos: prod.idProductos
        }));

        await DetalleVentaUsuario.bulkCreate(detalles, { transaction: t });
        
        await t.commit();
        res.json({ mensaje: "¡Compra procesada y registrada con éxito!" });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: "Error interno al procesar el pago" });
    }
});

router.get('/grafica-ventas', async (req, res) => {
    try {
        const query = `
            SELECT 
                DATE(fecha_venta) as fecha, 
                SUM(total) as total_ventas 
            FROM Venta_Usuario 
            GROUP BY DATE(fecha_venta)
            ORDER BY fecha ASC
            LIMIT 7;
        `;

        const results = await sequelize.query(query, { 
            type: sequelize.QueryTypes.SELECT 
        });

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/grafica-stock', async (req, res) => {
    try {
        const results = await sequelize.query(
            "SELECT nombre_producto, stock FROM Productos ORDER BY stock ASC LIMIT 8", 
            { type: sequelize.QueryTypes.SELECT }
        );
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;