'use client'
import React from 'react'
import { useContextProductos } from '../../Providers/ProvidersProductos'
import CardProductos from '../../componentes/CardProductos'

export default function page() {
  const { producto } = useContextProductos()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {producto.map((item) => (
        <CardProductos key={item.idProductos} item={item} />
      ))}
    </div>
  )
}