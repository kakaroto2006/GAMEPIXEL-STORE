'use client'

import React, { useEffect } from 'react';
import { useContextFavoritos } from '@/app/Providers/ProvidersFavoritos';
import { useContextCarrito } from '@/app/Providers/ProvidersCarrito';
import { useRouter } from 'next/navigation';

export default function FavoritosPage() {
  const { favoritos, obtenerFavoritos, eliminarFavorito } = useContextFavoritos();
  const { agregarCarrito } = useContextCarrito();
  const router = useRouter();

  useEffect(() => {
    obtenerFavoritos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-white text-center sm:text-left">
          Mis Favoritos
        </h1>

        {favoritos.length === 0 ? (
          <div className="text-center py-20 px-4">
            <p className="text-gray-400 text-lg">Aún no tienes productos en favoritos.</p>
            <button 
                onClick={() => router.push('/MenuPrincipal')}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition"
            >
               Ir al Menú Principal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoritos.map((item) => (
              <div
                key={item.idFavoritos}
                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:border-green-500 hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                <div
                  onClick={() => router.push(`/detalle-producto/${item.producto?.idProductos}`)}
                  className="cursor-pointer group"
                >
                  <div className="w-full h-64 overflow-hidden">
                    <img
                      src={item.producto?.imagen_product}
                      alt={item.producto?.nombre_producto}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">
                      {item.producto?.nombre_producto}
                    </h3>
                    <span className="inline-block bg-white/10 text-green-400 text-xs px-3 py-1 rounded-full mb-4">
                      {item.producto?.marca || 'Producto'}
                    </span>
                    <h2 className="text-green-500 text-xl font-extrabold">
                      L. {item.producto?.precio}
                    </h2>
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-2 mt-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.producto) agregarCarrito(item.producto);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-black font-bold py-2 rounded-xl transition uppercase text-sm tracking-wider"
                  >
                    Carrito
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      eliminarFavorito(item.idFavoritos);
                    }}
                    className="p-3 rounded-xl border bg-red-600/10 border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition-all active:scale-95"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}