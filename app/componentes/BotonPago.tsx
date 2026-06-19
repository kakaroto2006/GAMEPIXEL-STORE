'use client';

import React, { useState } from 'react';
import { registrarPago } from '../servicios/api';
import { useContextCarrito } from '../Providers/ProvidersCarrito';
import { toast } from 'sonner';

export default function BotonPago() {
  const [procesando, setProcesando] = useState(false);
  const { carrito } = useContextCarrito();
  
  const productosValidos = carrito.filter((item: any) => item.producto);

  const totalCalculado = productosValidos.reduce(
    (acc: number, item: any) => acc + (Number(item.producto.precio) * (item.cantidad || 1)),
    0
  );

  const ejecutarPago = async () => {
    if (productosValidos.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    const usuarioJson = localStorage.getItem('usuario');
    if (!usuarioJson) {
      toast.error('Por favor, inicia sesión para pagar.');
      return;
    }
    const usuario = JSON.parse(usuarioJson);

    setProcesando(true);
    const loadingToast = toast.loading('Procesando transacción...');

    const datosCompra = {
      idUsuario: usuario.idUsuarios,
      total: totalCalculado,
      productos: productosValidos.map((item: any) => ({
        idProductos: item.producto.idProductos,
        cantidad: item.cantidad || 1,
        precio: item.producto.precio,
      })),
    };

    try {
      const respuesta = await registrarPago(datosCompra);
      toast.dismiss(loadingToast);
      toast.success(respuesta.mensaje || '¡Compra realizada con éxito!');
    } catch (err: any) {
      console.error(err);
      toast.dismiss(loadingToast);
      const msg = err.response?.data?.error || 'Ocurrió un error al procesar la transacción.';
      toast.error(msg);
    } finally {
      setProcesando(false);
    }
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
      {procesando ? 'Procesando...' : `Pagar Orden (L. ${totalCalculado.toFixed(2)})`}
    </button>
  );
}