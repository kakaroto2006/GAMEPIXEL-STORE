'use client'

import React, { useMemo } from 'react'
import { useContextProductos } from '../../Providers/ProvidersProductos'
import CardProductos from '../../componentes/CardProductos'

export default function Page() {

  const {
    producto,
    categoriaActiva,
    setCategoriaActiva
  } = useContextProductos()

  const categorias = useMemo(() => {
    const cats = producto.map(
      (p) => p.categoria?.nombre_categoria || 'Sin categoría'
    )
    return ['Todas', ...new Set(cats)]
  }, [producto])

  return (
    <main className="bg-black min-h-screen text-white">

      <section className="relative h-[80vh] w-full flex items-center px-12 overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80"
          alt="Banner Gamer"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent z-0"></div>

        <div className="relative z-10 max-w-2xl">

          <span className="text-green-500 font-bold uppercase tracking-widest text-sm">
            Tu Zona Gamer
          </span>

          <h1 className="text-6xl font-black mt-4 mb-6 leading-tight">
            SUMÉRGETE EN LA EXPERIENCIA GAMER
          </h1>

          <p className="text-gray-300 mb-8 text-lg">
            Descubre los últimos videojuegos, consolas y accesorios para llevar tu aventura al siguiente nivel.
          </p>

          <button className="bg-green-600 hover:bg-green-500 text-black font-bold py-3 px-10 transition uppercase">
            Descubre Ahora
          </button>

        </div>

      </section>
      

      <section className="py-16">
  
  <div className="max-w-7xl mx-auto px-7">

    <div className="mb-4">
      <h2 className="text-3xl font-bold text-white tracking-wider text-center">
        EXPLORA NUESTRO CATÁLOGO
      </h2>

      <p className="text-gray-400 text-center mt-2">
        Encuentra tus juegos, consolas y accesorios favoritos
      </p>
    </div>
    <section className="mb-5 bg-black/30 backdrop-blur-sm">

        <div className="flex flex-wrap gap-4 justify-center">

          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={`px-2 py-1 rounded-full border transition
                ${categoriaActiva === categoria
                  ? 'bg-green-600 text-black'
                  : 'border-green-600 text-green-400 hover:bg-green-600 hover:text-black'
                }`}
            >
              {categoria}
            </button>
          ))}

        </div>

      </section>
    <CardProductos />

  </div>

</section>

    </main>
  )
}