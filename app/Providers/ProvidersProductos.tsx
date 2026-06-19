'use client'
import React, { useEffect, useState, useContext } from 'react';
import { contextProductos } from '../Contexts/ContextProductos';
import { Vista } from '../models/Vista';
import { IProductos } from '../models/IProductos';

export default function ProvidersProductos({ children }: Vista) {
  const [producto, setProducto] = useState<IProductos[]>([]);
  const API = "http://localhost:8080/productos";
  const [categoriaActiva, setCategoriaActiva] = useState('Todas')

  async function obtenerProductos() {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProducto(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.log("Error al cargar productos:", error);
    }
  }

async function obtenerProductoPorId(id: number | string) {
  try {
    const res = await fetch(`${API}/${id}`)
    const data = await res.json()
    
    console.log("RESPUESTA DETALLE API:", data)
  
    return data.data ? data.data : data;
  } catch (error) {
    console.log("Error al obtener producto por id:", error)
    return null
  }
}

 async function agregarProducto(producto: IProductos, opcion: number) {
  try {
    const url = opcion === 1
      ? API
      : `${API}/${producto.idProductos}`

    const method = opcion === 1 ? "POST" : "PUT"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    })

    const data = await res.json()

    if (!res.ok) {
      console.log("ERROR BACKEND:", data)
      return false
    }

    console.log("OK:", data)

    await obtenerProductos()

    return true

  } catch (error) {
    console.log("ERROR FETCH:", error)
    return false
  }
}

  async function desactivarProducto(id: number) {

  await fetch(
    `http://localhost:8080/productos/desactivar/${id}`,
    {
      method: 'PUT'
    }
  )

  obtenerProductos()

}

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div>
    <contextProductos.Provider
      value={{
        producto,
        obtenerProductos,
        obtenerProductoPorId,
        agregarProducto,
        desactivarProducto,
        categoriaActiva,
        setCategoriaActiva
      }}
    >
      {children}
    </contextProductos.Provider>
    </div>
  );
}


export function useContextProductos() {
  return useContext(contextProductos);
}