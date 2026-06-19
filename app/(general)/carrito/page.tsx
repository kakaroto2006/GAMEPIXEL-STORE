'use client'

import React, { useEffect } from 'react';
import { useContextCarrito } from '@/app/Providers/ProvidersCarrito';

export default function Page() {
  const { carrito, obtenerProductosCarrito, actualizarCantidad, eliminarDelCarrito } = useContextCarrito();

  useEffect(() => {
    obtenerProductosCarrito();
  }, []);

  // Calculamos los totales usando 'item.producto' (el alias definido en el backend)
  const subtotal = carrito.reduce((acc, item) => {
    // Asegúrate de que item.producto y item.producto.precio existan
    const precio = item.producto?.precio || 0;
    return acc + (precio * item.cantidad);
  }, 0);

  const tax = subtotal * 0.15;
  const total = subtotal + tax;
  const envio = subtotal * 0.02

  

  return (
    <div className="min-h-screen bg-[#0f111a] text-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Tu Carrito</h1>

        {carrito.length === 0 ? (
          <p className="text-center text-gray-400">El carrito está vacío.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {carrito.map((item) => (
                <div key={item.idDetalle_carrito} className="bg-[#161925] p-4 flex items-center justify-between rounded-xl">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.producto?.imagen_product} 
                      alt={item.producto?.nombre_producto}
                      className="w-16 h-16 object-cover rounded" 
                    />
                    <div>
                      <h3 className="text-white font-semibold">{item.producto?.nombre_producto}</h3>
                      <p className="text-green-600">L. {item.producto?.precio}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center bg-blue-950 rounded-lg">
  {/* Botón de restar */}
  <button 
    onClick={() => {
        // Evitamos que la cantidad sea menor a 1
        if (item.cantidad > 1) {
            actualizarCantidad(item.idDetalle_carrito, item.cantidad - 1);
        }
    }}
    className="px-3 py-1 hover:bg-blue-800 rounded-l-lg transition"
  >
    -
  </button>

  {/* Contador */}
  <span className="px-4 py-2 font-bold text-white">
    {item.cantidad}
  </span>

  {/* Botón de sumar */}
  <button 
    onClick={() => {
        // Aumentamos la cantidad
        actualizarCantidad(item.idDetalle_carrito, item.cantidad + 1);
    }}
    className="px-3 py-1 hover:bg-blue-800 rounded-r-lg transition"
  >
    +
  </button>
</div>

                    <p className="text-white font-semibold">
                      L. {(item.producto?.precio * item.cantidad).toFixed(2)}
                    </p>

                    <button 
                      onClick={() => eliminarDelCarrito(item.idDetalle_carrito)}
                     className="mt-1 bg-red-600 hover:bg-red-900 py-2 px-4 rounded-xl text-white font-bold transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen */}
            <div className="bg-[#161925] p-6 h-fit rounded-xl">
              <h2 className="text-xl font-bold mb-4">Resumen de Carrito</h2>
              <div className="space-y-2 border-b border-gray-700 pb-4 mb-4">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>L. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Impuesto (15%):</span>
                    <span>L. {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Costo de envio:</span>
                    <span>L. {envio.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>L.{total.toFixed(2)}</span>
              </div>
              <button className="w-full mt-6 bg-green-600 hover:bg-green-800 py-3 rounded-xl text-white font-bold transition">
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
