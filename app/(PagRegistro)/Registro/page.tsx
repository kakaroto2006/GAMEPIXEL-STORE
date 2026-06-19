'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useContextUsuario } from '@/app/Providers/ProvidersUsuarios'

export default function RegisterPage() {

  const router = useRouter()
  const { registro } = useContextUsuario()

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [pass, setPass] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await registro({
      nombre_Usuario: nombre,
      correo_Usuario: correo,
      contrasenia_Usuario: pass,
      rol: 'USER',
      estado_Usuario: 1
    })

    router.push('/')
  }

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-[40%_60%] bg-gray-900 text-white">

  
      <section className="flex items-center justify-center p-8 md:p-12 lg:p-16 bg-gray-950">

        <div className="w-full max-w-md">


          <div className="flex flex-col items-center text-center mb-10">
            <img
              src="/logo pixel.png"
              alt="Logo"
              className="w-40 mb-4"
            />
            <h1 className="text-3xl font-semibold">
              Crear Cuenta
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">


            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-emerald-500"
              required
            />

            <input
              type="text"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-emerald-500"
              required
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-emerald-500"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-emerald-400 hover:underline"
            >
              {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            </button>


            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-500 text-white py-3 font-bold rounded transition"
            >
              Registrarse
            </button>

    
            <div className="text-center text-sm text-emerald-400 pt-2">
              <span
                onClick={() => router.push('/')}
                className="cursor-pointer hover:underline"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </span>
            </div>

          </form>

        </div>
      </section>

      <section className="hidden md:flex relative items-center justify-center overflow-hidden">

        <img
          src="https://images.pexels.com/photos/159369/xbox-xbox-one-microsoft-joystick-159369.jpeg"
          alt="Banner"
          className="w-full h-full object-cover"
        />

      </section>

    </main>
  )
}