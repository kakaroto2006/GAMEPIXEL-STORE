'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useContextProductos } from '../Providers/ProvidersProductos'
import { useContextCarrito } from '../Providers/ProvidersCarrito'
import { useContextFavoritos } from '../Providers/ProvidersFavoritos'

export default function CardProductos() {
  const router = useRouter()

  const { producto, categoriaActiva } = useContextProductos()

  const { favoritos, agregarAFavoritos, eliminarFavorito } = useContextFavoritos()
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
      {productosFiltrados.map((item) => {
   
        const esFavorito = favoritos?.some(fav => fav.Productos_idProductos === item.idProductos);

        return (
          <div
            key={item.idProductos}
            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:border-green-500 hover:-translate-y-2 transition-all duration-300"
          >

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
                <h3 className="text-white text-xl font-bold mb-2">{item.nombre_producto}</h3>
                <p className="inline-block bg-white/10 text-green-400 text-xs px-3 py-1 rounded-full mb-4">
                  {item.marca}
                </p>
                <h2 className="text-green-500 text-xl font-extrabold">L. {item.precio}</h2>
              </div>
            </div>

            <div className="px-5 pb-5 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  agregarCarrito(item);
                }}
                className="flex-1 bg-green-600 hover:bg-green-500 text-black font-bold py-2 rounded-xl transition uppercase text-sm"
              >
                Agregar al carrito
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  
                  if (esFavorito) {
                    const favExistente = favoritos.find(fav => fav.Productos_idProductos === item.idProductos);
                    if (favExistente) eliminarFavorito(favExistente.idFavoritos);
                  } else {
                    agregarAFavoritos(item);
                  }
                }}
                
                className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-center active:scale-95
                  ${esFavorito 
                    ? 'bg-red-600/10 border-red-500 text-red-500 hover:bg-red-600 hover:text-white' 
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-red-500 hover:border-red-500/50'
                  }`}
                title={esFavorito ? "Quitar de Favoritos" : "Agregar a Favoritos"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={esFavorito ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="w-5 h-5 transition-transform duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  )
}