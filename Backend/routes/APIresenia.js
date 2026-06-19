const express = require('express');
const router = express.Router();

const Resenia = require('../modelos/Resenia')
const Usuario = require('../modelos/Usuarios')

router.get('/resenia', async (req, res) => {
  const data = await Resenia.findAll({
    include: [{
      model: Usuario,
      as: 'usuario'
    }]
  })

  res.json({ data })
})

router.post('/resenia', async (req, res) => {
  try {

    const body = {
      ...req.body,
      fecha_comentario: new Date()
    }

    const nueva = await Resenia.create(body)

    res.json({
      message: 'Reseña creada',
      data: nueva
    })

  } catch (error) {
    res.status(500).json({
      message: 'Error creando reseña',
      error: error.message
    })
  }
})

module.exports = router;