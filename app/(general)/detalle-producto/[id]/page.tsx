'use client'

import { useParams } from 'next/navigation'
import { useContextProductos } from '@/app/Providers/ProvidersProductos'

export default function DetalleProducto() {
  const params = useParams()
  const { producto } = useContextProductos()

  const item = producto.find(
    p => p.idProductos === Number(params.id)
  )

  if (!item) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Cargando producto...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* Imagen */}
        <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">

          <img
            src={item.imagen_product}
            alt={item.nombre_producto}
            className="w-full h-[700px] object-cover"
          />

        </div>

        {/* Información */}
        <div className="space-y-6">

          <h1 className="text-5xl font-bold">
            {item.nombre_producto}
          </h1>

          <span className="inline-block px-4 py-2 bg-zinc-900 rounded-full text-sm">
            {item.categoria?.nombre_categoria}
          </span>

          <div className="flex items-center gap-2">

            <span className="text-red-600 text-xl">
              ★★★★★
            </span>

            <span className="text-gray-400">
              4.9 (120 reseñas)
            </span>

          </div>

          <h2 className="text-5xl font-bold text-red-600">
            ${item.precio}
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            {item.descripcion_product}
          </p>

          <span className="inline-block bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full">
            Stock disponible: {item.stock}
          </span>

          {/* Beneficios */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">

            <div>
              🚚 Envío gratis en compras superiores a $50
            </div>

            <div>
              🔒 Pago seguro
            </div>

            <div>
              📦 Entrega rápida
            </div>

          </div>

          <button
            className="
              w-full
              bg-red-600
              hover:bg-red-700
              py-4
              rounded-xl
              font-bold
              transition
            "
          >
            Agregar al carrito
          </button>

        </div>

      </div>

      {/* Reseñas */}

      <section className="max-w-7xl mx-auto mt-16">

        <h2 className="text-3xl font-bold mb-6">
          Reseñas
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">

            <div className="flex justify-between mb-3">

              <h3 className="font-bold">
                Usuario 1
              </h3>

              <span className="text-red-600">
                ★★★★★
              </span>

            </div>

            <p className="text-gray-400">
              Excelente producto.
            </p>

          </div>

          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">

            <div className="flex justify-between mb-3">

              <h3 className="font-bold">
                Usuario 2
              </h3>

              <span className="text-red-600">
                ★★★★★
              </span>

            </div>

            <p className="text-gray-400">
              Muy recomendado.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}