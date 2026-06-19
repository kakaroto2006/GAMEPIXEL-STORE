const express = require('express')
const router = express.Router()

const Usuarios = require('../modelos/Usuarios')

router.post('/registrar', async (req, res) => {
  try {
    const usuario = await Usuarios.create(req.body)

    return res.status(201).json({
      message: 'Usuario creado correctamente',
      data: usuario
    })

  } catch (error) {
    return res.status(500).json({
      message: 'Error al registrar usuario',
      error: error.message
    })
  }
})


router.post('/inicio_Sesion', async (req, res) => {
  try {

    const { correo_Usuario, contrasenia_Usuario } = req.body

    const usuario = await Usuarios.findOne({
      where: {
        correo_Usuario
      }
    })

    if (!usuario) {
      return res.status(404).json({
        message: 'El usuario no existe'
      })
    }

    if (usuario.contrasenia_Usuario !== contrasenia_Usuario) {
      return res.status(401).json({
        message: 'Contraseña incorrecta'
      })
    }

    if (usuario.estado_Usuario !== 1) {
      return res.status(403).json({
        message: 'Usuario inactivo'
      })
    }

    return res.status(200).json({
      message: 'Login correcto',
      data: usuario
    })

  } catch (error) {
    return res.status(500).json({
      message: 'Error en login',
      error: error.message
    })
  }
})


router.get('/usuarios', async (req, res) => {
  try {

    const usuarios = await Usuarios.findAll()

    return res.json({
      message: 'Usuarios obtenidos',
      data: usuarios
    })

  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener usuarios',
      error: error.message
    })
  }
})

module.exports = router