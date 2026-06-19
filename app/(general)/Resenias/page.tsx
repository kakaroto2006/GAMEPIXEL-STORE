'use client'

import { useEffect, useState } from 'react'
import { IResenia } from '@/app/models/IResenia'
import { useContextUsuario } from '@/app/Providers/ProvidersUsuarios'

export default function page() {

  const [resenias, setResenias] = useState<IResenia[]>([])

  const [form, setForm] = useState({
    nombre_resenia: '',
    comentario: '',
    calificacion: 5
  })

  const { usuario } = useContextUsuario()

  /* ================= CARGAR ================= */
  async function cargarResenias() {
    try {
      const res = await fetch('http://localhost:8080/resenia')
      const data = await res.json()

      setResenias(data.data || [])
    } catch (error) {
      console.log('Error cargando reseñas:', error)
    }
  }

  useEffect(() => {
    cargarResenias()
  }, [])

  async function crearResenia() {
    if (!form.nombre_resenia || !form.comentario) return

    if (!usuario) {
      console.log("No hay usuario logueado")
      return
    }

    try {
      await fetch('http://localhost:8080/resenia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_resenia: form.nombre_resenia,
          comentario: form.comentario,
          calificacion: Number(form.calificacion),
          Usuarios_idUsuarios: usuario.idUsuarios
        })
      })

      setForm({
        nombre_resenia: '',
        comentario: '',
        calificacion: 5
      })

      cargarResenias()

    } catch (error) {
      console.log('Error creando reseña:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 md:p-10 flex justify-center">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* ================= LISTA DE RESEÑAS (POSTS) ================= */}
        <div className="space-y-6">
          {resenias.map((r) => (
            <div
              key={r.idResenia}
              className="bg-white/70 rounded-3xl p-6 md:p-8 shadow-sm space-y-4"
            >
              {/* ENCABEZADO: Avatar y Nombre */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 text-[#E63946] font-bold flex items-center justify-center text-lg">
                  {r.usuario?.nombre_Usuario?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1A1A1A]">
                    {r.usuario?.nombre_Usuario || 'anonimo'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {new Date(r.fecha_comentario).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <hr className="border-[#E9ECEF]" />

              {/* CALIFICACIÓN (Badge de estrellas como tu captura) */}
              <div className="inline-flex items-center gap-1 border border-[#E9ECEF] px-3 py-1 rounded-full bg-white shadow-sm">
                <div className="flex text-[#FF4D4D] text-sm">
                  {'★'.repeat(r.calificacion)}{'☆'.repeat(5 - r.calificacion)}
                </div>
                <span className="text-xs font-bold text-gray-700 ml-1">
                  {r.calificacion}.0
                </span>
              </div>

              {/* CONTENIDO: Título y Comentario */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">
                  {r.nombre_resenia}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {r.comentario}
                </p>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-[#E9ECEF] my-8" />

        {/* ================= SECCIÓN DE COMENTARIOS (FORMULARIO) ================= */}
        <div className="space-y-4">
          {/* Contador de comentarios con el icono */}
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h2>Comentarios ({resenias.length})</h2>
          </div>

          {/* Caja del Formulario */}
          <div className="bg-white border border-[#E9ECEF] rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-700 text-sm">Deja tu Comentario</h3>
            
            <div className="space-y-3">
              {/* Input para el Título */}
              <input
                className="w-full p-3 bg-white border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:border-gray-400 placeholder-gray-400"
                placeholder="Titulo de la Review"
                value={form.nombre_resenia}
                onChange={(e) =>
                  setForm({ ...form, nombre_resenia: e.target.value })
                }
              />

              {/* Textarea para el Comentario */}
              <textarea
                rows={4}
                className="w-full p-4 bg-white border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:border-gray-400 placeholder-gray-400 resize-none"
                placeholder="Comparte tu experiencia"
                value={form.comentario}
                onChange={(e) =>
                  setForm({ ...form, comentario: e.target.value })
                }
              />

              {/* Selector de Estrellas estilizado */}
              <div className="relative">
                <select
                  className="w-full p-3 bg-white border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:border-gray-400 appearance-none text-gray-700"
                  value={form.calificacion}
                  onChange={(e) =>
                    setForm({ ...form, calificacion: Number(e.target.value) })
                  }
                >
                  <option value={5}>5 ★ Excelente</option>
                  <option value={4}>4 ★ Muy bueno</option>
                  <option value={3}>3 ★ Bueno</option>
                  <option value={2}>2 ★ Regular</option>
                  <option value={1}>1 ★ Malo</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  ▼
                </div>
              </div>
            </div>

            {/* Botón de Enviar aligned a la derecha */}
            <div className="flex justify-end">
              <button
                onClick={crearResenia}
                className="bg-green-950 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors duration-200"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}