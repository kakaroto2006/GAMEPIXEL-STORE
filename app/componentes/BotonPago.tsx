'use client';

import React, { useState } from 'react';
import { registrarPago } from '../servicios/api';
import { useContextCarrito } from '../Providers/ProvidersCarrito';

export default function BotonPago() {
  const [procesando, setProcesando] = useState(false);
  const { carrito } = useContextCarrito();
  
  const productosValidos = carrito.filter((item: any) => item.producto);

  const totalCalculado = productosValidos.reduce(
    (acc: number, item: any) => acc + (Number(item.producto.precio) * (item.cantidad || 1)),
    0
  );

  const ejecutarPago = () => {
    if (productosValidos.length === 0) return alert('El carrito está vacío');

    const usuarioJson = localStorage.getItem('usuario');
    if (!usuarioJson) return alert('Por favor, inicia sesión para pagar.');
    const usuario = JSON.parse(usuarioJson);

    setProcesando(true);

    const datosCompra = {
      idUsuario: usuario.idUsuarios,
      total: totalCalculado,
      productos: productosValidos.map((item: any) => ({
        idProductos: item.producto.idProductos,
        cantidad: item.cantidad || 1,
        precio: item.producto.precio,
      })),
    };

    registrarPago(datosCompra)
      .then((respuesta: any) => {
        alert(respuesta.mensaje);
      })
      .catch((err) => {
        console.error(err);
        alert('Ocurrió un error al procesar la transacción.');
      })
      .finally(() => {
        setProcesando(false);
      });
  };

  return (
    <button
      onClick={ejecutarPago}
      disabled={procesando || productosValidos.length === 0}
      className={`w-full font-bold py-3 px-6 rounded-xl transition uppercase tracking-wider text-sm sm:text-base flex items-center justify-center gap-2
        ${procesando || productosValidos.length === 0
          ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
          : 'bg-green-600 hover:bg-green-500 text-black shadow-lg'
        }`}
    >
      {procesando ? 'Procesando Transacción...' : `Pagar Orden (L. ${totalCalculado.toFixed(2)})`}
    </button>
  );
}