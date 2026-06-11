'use client'
import React from 'react'
import { useContextProductos } from '../../Providers/ProvidersProductos'
import CardProductos from '../../componentes/CardProductos'

export default function Page() {
  const { producto } = useContextProductos()

  return (
    <main className="bg-black min-h-screen text-white">
      
      {/* SECCIÓN HERO (Banner principal estilo GamerX) */}
      <section className="relative h-[80vh] w-full flex items-center px-12 bg-gray-900 overflow-hidden">
        {/* Fondo oscuro con degradado */}
        <div className="absolute inset-0 bg-black/70 z-0"></div> 
        
        <div className="relative z-10 max-w-2xl">
          <span className="text-green-500 font-bold uppercase tracking-widest text-sm">Tu Zona Gamer</span>
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

      {/* SECCIÓN DE PRODUCTOS */}
      <section className="px-12 py-16">
        <h2 className="text-3xl font-bold text-white mb-10 tracking-wider">
          LATEST GAME TITLES
        </h2>
        
        {/* Aquí pasamos el item correctamente al componente */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {producto.map((item) => (
            <CardProductos key={item.idProductos} item={item} />
          ))}
        </div>
      </section>

      
    </main>
  )
}