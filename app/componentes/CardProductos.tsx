'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useContextProductos } from '../Providers/ProvidersProductos'
import { useContextCarrito } from '../Providers/ProvidersCarrito'

export default function CardProductos() {
  const router = useRouter()

  const { producto, categoriaActiva } = useContextProductos()
  // ✅ CORRECCIÓN 1: Agregar los paréntesis al hook
  const { agregarCarrito } = useContextCarrito() 

  const productosFiltrados =
    categoriaActiva === 'Todas'
      ? producto
      : producto.filter(
          (p) =>
            (p.categoria?.nombre_categoria || 'Sin categoría') === categoriaActiva
        )
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {productosFiltrados.map((item) => (
        <div
          key={item.idProductos}
          className="
            bg-gray-900
            border border-gray-800
            rounded-2xl
            overflow-hidden
            shadow-lg
            hover:border-green-500
            hover:-translate-y-2
            transition-all
            duration-300
          "
        >
          {/* ZONA QUE ABRE EL DETALLE */}
          <div
            onClick={() => router.push(`./detalle-producto/${item.idProductos}`)}
            className="cursor-pointer"
          >
            <div className="w-full h-64 overflow-hidden">
              <img
                src={item.imagen_product}
                alt={item.nombre_producto}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="p-5">
              <h3 className="text-white text-xl font-bold mb-2">
                {item.nombre_producto}
              </h3>

              <p className="inline-block bg-white/10 text-green-400 text-xs px-3 py-1 rounded-full mb-4">
                {item.marca}
              </p>

              <h2 className="text-green-500 text-xl font-extrabold">
                L. {item.precio}
              </h2>
            </div>
          </div>

   
          <div className="px-5 pb-5">
            <button
              
              onClick={() => {
    console.log("¡Clic realizado!");
    agregarCarrito(item);
  }}
              className="
                w-full
                bg-green-600
                hover:bg-green-500
                text-black
                font-bold
                py-2
                rounded-xl
                transition
                uppercase
              "
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}