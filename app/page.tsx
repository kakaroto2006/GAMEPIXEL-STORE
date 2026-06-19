'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useContextUsuario } from './Providers/ProvidersUsuarios'

export default function HomePage() {

  const router = useRouter()
  const { login } = useContextUsuario()

  const [correo, setCorreo] = useState('')
  const [pass, setPass] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario') || 'null')

    if (user) {
      if (user.rol === 'ADMIN') {
        router.push('/Administracion')
      } else {
        router.push('/MenuPrincipal')
      }
    }

    setLoading(false)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const ok = await login(correo, pass)

    if (!ok) return

    const user = JSON.parse(localStorage.getItem('usuario') || 'null')

    if (!user) return

    if (user.rol === 'ADMIN') {
      router.push('/Administracion')
    } else {
      router.push('/MenuPrincipal')
    }
  }

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-[40%_60%] bg-gray-900 text-white">

      {/* IZQUIERDA */}
      <section className="flex items-center justify-center p-8 md:p-12 lg:p-16 bg-gray-950 min-h-screen">

        <div className="w-full max-w-md">

          <div className="flex flex-col items-center text-center mb-10">
            <img src="/logo pixel.png" alt="Logo" className="w-40 mb-4" />
            <h1 className="text-3xl font-semibold">Inicio de Sesión</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold text-gray-200">
                Correo
              </label>
              <input
                type="text"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">

              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-200">
                  Contraseña
                </label>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-emerald-400"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>

              <input
                type={showPassword ? 'text' : 'password'}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-500 text-white py-3 font-bold rounded"
            >
              Iniciar Sesión
            </button>

            <div className="text-center text-xs text-emerald-400 pt-2">
              <a href="/Registro">¿No tienes una cuenta? Regístrate</a>
            </div>

          </form>

        </div>
      </section>

      {/* DERECHA */}
      <section className="hidden md:flex items-center justify-center">
        <img
          src="https://eu.aimcontrollers.com/wp-content/uploads/2024/09/pc_controllers_lp_1_banner.jpg"
          className="w-full h-full object-cover"
          alt="Banner"
        />
      </section>

    </main>
  )
}