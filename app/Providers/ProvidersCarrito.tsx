'use client'
import React, { useContext, useEffect } from 'react'
import { Vista } from '../models/Vista';
import { useState } from 'react';
import { ICarritoDetalle } from '../models/ICarritoDetalle';
import { contextCarrito } from '../Contexts/ContextCarrito';
import { IProductos } from '../models/IProductos';


export default function ProviderCarrito({ children }: Vista) {
  
  const [carrito, setCarrito] = useState<ICarritoDetalle[]>([]);

async function obtenerProductosCarrito() {
    const usuarioJson = localStorage.getItem('usuario');
    if (!usuarioJson) return;

    try {
        const usuario = JSON.parse(usuarioJson);
        // CAMBIO: usa idUsuarios, no id
        const idReal = usuario.idUsuarios; 

        if (!idReal) return;

        const response = await fetch(`http://localhost:8080/carrito/${idReal}`);
        
        if (response.ok) {
            const data = await response.json();
            // Esto es crucial: verifica si data.data es lo que esperas
            setCarrito(data.data || []);
        }
    } catch (error) {
        console.log('Error obteniendo carrito:', error);
    }
}

  async function agregarCarrito(producto: IProductos) {
  const usuarioJson = localStorage.getItem('usuario');
  
  if (!usuarioJson) {
      alert("Por favor, inicia sesión.");
      return;
  }

  const usuario = JSON.parse(usuarioJson);
  const idReal = usuario.idUsuarios;

  const payload = {
  Usuarios_idUsuarios: idReal,
  idProducto: producto.idProductos,
  cantidad: 1
};


  try {
    const response = await fetch('http://localhost:8080/carrito', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert('Producto agregado al carrito');
      obtenerProductosCarrito();
    } else {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
}

async function actualizarCantidad(idDetalle: number, nuevaCantidad: number) {
    try {

        const response = await fetch(`http://localhost:8080/carrito/${idDetalle}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nuevaCantidad }),
        });

        if (response.ok) {
            obtenerProductosCarrito(); 
        }
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
      console.log('Error al eliminar:', error);
    }
  }

  useEffect(() => {
  const usuarioJson = localStorage.getItem('usuario');
  if (usuarioJson) {
     obtenerProductosCarrito(); 
  }
}, []);

  return (
    <contextCarrito.Provider value={{ carrito, agregarCarrito, obtenerProductosCarrito, eliminarDelCarrito }}>
      {children}
    </contextCarrito.Provider>
  )
}

  export function useContextCarrito() {
    return useContext(contextCarrito);
  }