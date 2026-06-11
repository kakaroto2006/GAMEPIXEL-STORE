'use client'
import React from 'react'
import { useContextProductos } from '../Providers/ProvidersProductos'
import { IProductos } from '../models/IProductos';

// Cambiamos a { item }: { item: IProductos } para que coincida con la prop enviada
export default function CardProductos({ item }: { item: IProductos }) {
  const { eliminarProducto } = useContextProductos();

  return (
    <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-lg transition-transform hover:scale-105 duration-300">
      
      <img 
        src={item.imagen_product} 
        alt={item.nombre_producto} 
        className="w-full h-40 object-cover rounded-lg mb-4" 
      />
      
      <h3 className="font-bold text-lg text-white truncate">{item.nombre_producto}</h3>
      <p>{item.marca} - {item.categoria?.nombre_categoria}</p>
      <p className="text-green-400 font-bold mt-1">L. {item.precio}</p>
      
      <button 
        className="bg-green-600 hover:bg-green-500 text-black font-bold px-4 py-2 mt-4 rounded-md w-full transition-colors uppercase tracking-wider text-sm"
      >
        Agregar al Carrito
      </button>
    </div>
  )
}