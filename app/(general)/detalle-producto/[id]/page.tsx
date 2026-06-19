'use client'

import { useParams } from 'next/navigation'
import { useContextProductos } from '@/app/Providers/ProvidersProductos'
import { useContextCarrito } from '@/app/Providers/ProvidersCarrito'

export default function DetalleProducto() {
  const params = useParams()
  const { producto } = useContextProductos()
  const { agregarCarrito } = useContextCarrito()

  const item = producto.find(p => p.idProductos === Number(params.id))

  if (!item) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Cargando producto...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-10">
        
        <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
          <img
            src={item.imagen_product}
            alt={item.nombre_producto}
            className="w-full h-80 md:h-500px object-cover"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold">{item.nombre_producto}</h1>

          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 bg-zinc-900 rounded-full text-sm">{item.categoria?.nombre_categoria}</span>
            <span className="px-4 py-2 bg-zinc-900 rounded-full text-sm">{item.marca}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-600">★★★★★</span>
            <span className="text-gray-400">4.9 (120 reseñas)</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-green-600">L. {item.precio}</h2>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            {item.descripcion_product}
          </p>

          <span className="inline-block bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full text-sm">
            Stock disponible: {item.stock}
          </span>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3 text-sm md:text-base">
            <div>🚚 Envío Rápido</div>
            <div>🔒 Pago seguro</div>
            <div>📦 Seguimiento de pedidos</div>
          </div>

          <button
            onClick={() => agregarCarrito(item)}
            className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold transition duration-300"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </main>
  )
}