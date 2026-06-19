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

  async function cargarResenias() {
    try {
      const res = await fetch('http://localhost:8080/resenia')
      const data = await res.json()
      setResenias(data.data || [])
    } catch (error) {
      console.error('Error cargando reseñas:', error)
    }
  }

  useEffect(() => {
    cargarResenias()
  }, [])

  async function crearResenia() {
    if (!form.nombre_resenia || !form.comentario || !usuario) return

    try {
      await fetch('http://localhost:8080/resenia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          Usuarios_idUsuarios: usuario.idUsuarios
        })
      })
      setForm({ nombre_resenia: '', comentario: '', calificacion: 5 })
      cargarResenias()
    } catch (error) {
      console.error('Error creando reseña:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 md:p-10 flex justify-center">
      <div className="max-w-3xl w-full space-y-8">
        
        <div className="space-y-6">
          {resenias.map((r) => (
            <div key={r.idResenia} className="bg-white/95 rounded-3xl p-6 md:p-8 shadow-lg space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 font-bold flex items-center justify-center text-lg">
                  {r.usuario?.nombre_Usuario?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{r.usuario?.nombre_Usuario || 'Anónimo'}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(r.fecha_comentario).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div className="inline-flex items-center gap-1 border border-gray-200 px-3 py-1 rounded-full bg-gray-50 shadow-sm">
                <div className="flex text-red-500 text-sm">
                  {'★'.repeat(r.calificacion)}{'☆'.repeat(5 - r.calificacion)}
                </div>
                <span className="text-xs font-bold text-gray-700 ml-1">{r.calificacion}.0</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{r.nombre_resenia}</h2>
                <p className="text-gray-600 leading-relaxed">{r.comentario}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h2>Comentarios ({resenias.length})</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg space-y-4">
            <h3 className="font-semibold text-gray-700 text-sm">Deja tu comentario</h3>
            <input
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Título de la reseña"
              value={form.nombre_resenia}
              onChange={(e) => setForm({ ...form, nombre_resenia: e.target.value })}
            />
            <textarea
              rows={4}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
              placeholder="Comparte tu experiencia..."
              value={form.comentario}
              onChange={(e) => setForm({ ...form, comentario: e.target.value })}
            />
            <select
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-700"
              value={form.calificacion}
              onChange={(e) => setForm({ ...form, calificacion: Number(e.target.value) })}
            >
              {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} ★ {n === 5 ? 'Excelente' : n === 4 ? 'Muy bueno' : n === 3 ? 'Bueno' : n === 2 ? 'Regular' : 'Malo'}</option>)}
            </select>
            <div className="flex justify-end">
              <button
                onClick={crearResenia}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
              >
                Publicar reseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}