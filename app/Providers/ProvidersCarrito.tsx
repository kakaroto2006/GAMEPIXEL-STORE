'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Vista } from '../models/Vista';
import { ICarritoDetalle } from '../models/ICarritoDetalle';
import { contextCarrito } from '../Contexts/ContextCarrito';
import { IProductos } from '../models/IProductos';

export default function ProviderCarrito({ children }: Vista) {
  const [carrito, setCarrito] = useState<ICarritoDetalle[]>([]);

  const obtenerUsuario = () => {
    const usuarioJson = localStorage.getItem('usuario');
    return usuarioJson ? JSON.parse(usuarioJson) : null;
  };

 async function obtenerProductosCarrito() {
  const usuario = obtenerUsuario();

  console.log("Usuario:", usuario);

  if (!usuario?.idUsuarios) {
    console.log("No existe idUsuarios");
    return;
  }

  console.log(`http://localhost:8080/carrito/${usuario.idUsuarios}`);

  const response = await fetch(
    `http://localhost:8080/carrito/${usuario.idUsuarios}`
  );

  console.log("Status:", response.status);

  const data = await response.json();

  console.log("Respuesta:", data);

  setCarrito(data.data || []);
}

  async function agregarCarrito(producto: IProductos) {
    const usuario = obtenerUsuario();
    if (!usuario) return alert("Por favor, inicia sesión.");

    try {
      const response = await fetch('http://localhost:8080/carrito', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Usuarios_idUsuarios: usuario.idUsuarios,
          idProducto: producto.idProductos,
          cantidad: 1
        }),
      });

      if (response.ok) {
        alert('Producto agregado al carrito');
        obtenerProductosCarrito();
      }
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  }

  async function actualizarCantidad(idDetalle: number, nuevaCantidad: number) {
    try {
      const response = await fetch(`http://localhost:8080/carrito/${idDetalle}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nuevaCantidad }),
      });

      if (response.ok) obtenerProductosCarrito();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  }

  async function eliminarDelCarrito(idDetalle: number) {
    try {
      const response = await fetch(`http://localhost:8080/carrito/${idDetalle}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        obtenerProductosCarrito();
        alert('Producto eliminado correctamente');
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('usuario')) {
      obtenerProductosCarrito();
    }
  }, []);

  return (
    <contextCarrito.Provider value={{ carrito, actualizarCantidad, agregarCarrito, obtenerProductosCarrito, eliminarDelCarrito }}>
      {children}
    </contextCarrito.Provider>
  );
}

  export function useContextCarrito() {
    return useContext(contextCarrito);
  }