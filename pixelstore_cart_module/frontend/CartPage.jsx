import React, { useState, useEffect } from 'react';

export default function CartPage() {
  // ID de usuario para pruebas (puedes cambiarlo dinámicamente según el usuario logueado)
  const userId = 1; 
  
  // Estado para almacenar los productos del carrito y el resumen de compra (Order Summary)
  const [cartData, setCartData] = useState({ items: [], summary: { subtotal: 0, tax: 0, total: 0 } });
  const [loading, setLoading] = useState(true);

  // 1. GET: Cargar los productos del carrito llamando a la API del Backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/cart/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCartData(data); // Guarda productos, subtotal, impuesto (10%) y total estimado
      }
    } catch (error) {
      console.error("Error al conectar con la API de PixelStore:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 2. PUT: Modificar la cantidad al tocar los botones + y -
  const handleUpdateQty = async (idDetalle, currentQty, operation) => {
    const nuevaCantidad = operation === 'add' ? currentQty + 1 : currentQty - 1;
    if (nuevaCantidad < 1) return; // Evita cantidades menores a 1

    try {
      const response = await fetch(`http://localhost:3000/api/cart/item/${idDetalle}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cantidad: nuevaCantidad })
      });
      if (response.ok) {
        fetchCart(); // Refresca los subtotales e impuestos en tiempo real
      }
    } catch (error) {
      console.error("Error al actualizar la cantidad:", error);
    }
  };

  // 3. DELETE: Eliminar un videojuego por completo al presionar el basurero
  const handleRemoveItem = async (idDetalle) => {
    try {
      const response = await fetch(`http://localhost:3000/api/cart/item/${idDetalle}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchCart(); // Refresca la interfaz de inmediato
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  if (loading && cartData.items.length === 0) {
    return <div className="text-center p-10 text-white font-sans bg-[#0f111a] min-h-screen">Cargando el carrito de PixelStore...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f111a] text-gray-200 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Tu Carrito de Compras
        </h1>

        {cartData.items.length === 0 ? (
          <div className="bg-[#161925] border border-gray-800 rounded-xl p-10 text-center">
            <p className="text-gray-400 text-lg mb-4">No tienes videojuegos en tu carrito actualmente.</p>
            <button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition">
              Explorar Tienda
            </button>
          </div>
        ) : (
          /* Diseño de Cuadrícula de 2 Columnas (Listado a la izquierda, Resumen a la derecha) */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLUMNA IZQUIERDA: LISTADO DE PRODUCTOS */}
            <div className="lg:col-span-2 space-y-4">
              {cartData.items.map((item) => (
                <div key={item.idDetalle} className="bg-[#161925] border border-gray-800 rounded-xl p-4 flex items-center justify-between transition hover:border-gray-700">
                  <div className="flex items-center space-x-4">
                    {/* Imagen del Videojuego / Producto */}
                    <img 
                      src={item.imagen || "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=150"} 
                      alt={item.nombre} 
                      className="w-20 h-20 object-cover rounded-lg bg-[#22263f]"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-white">{item.nombre}</h3>
                      <p className="text-purple-400 font-medium">${item.precio.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Controles de Cantidad y Botón de Borrar */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center bg-[#1f2336] rounded-lg border border-gray-700 overflow-hidden">
                      <button 
                        onClick={() => handleUpdateQty(item.idDetalle, item.cantidad, 'sub')}
                        className="px-3 py-1 bg-[#252a41] hover:bg-[#2d334e] transition text-gray-300 font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-white font-medium">{item.cantidad}</span>
                      <button 
                        onClick={() => handleUpdateQty(item.idDetalle, item.cantidad, 'add')}
                        className="px-3 py-1 bg-[#252a41] hover:bg-[#2d334e] transition text-gray-300 font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal de esta tarjeta (Precio * Cantidad) */}
                    <div className="text-right min-w-[70px]">
                      <p className="text-white font-semibold">${item.subtotalItem.toFixed(2)}</p>
                    </div>

                    {/* Icono de Papelera de Eliminación */}
                    <button 
                      onClick={() => handleRemoveItem(item.idDetalle)}
                      className="text-red-500 hover:text-red-400 p-2 bg-red-950/30 rounded-lg hover:bg-red-950/60 transition"
                      title="Eliminar del carrito"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* COLUMNA DERECHA: RESUMEN DE COMPRA (ORDER SUMMARY) */}
            <div className="bg-[#161925] border border-gray-800 rounded-xl p-6 h-fit sticky top-6">
              <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-gray-800">
                Resumen de Orden
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${cartData.summary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Impuestos (10% ISV)</span>
                  <span className="text-white font-medium">${cartData.summary.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-800 pt-4 flex justify-between text-lg font-bold">
                  <span className="text-white">Total Estimado</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    ${cartData.summary.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-purple-900/30">
                Proceder al Pago
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}