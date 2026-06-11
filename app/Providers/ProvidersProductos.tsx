'use client'
import React, { useEffect, useState, useContext } from 'react';
import { contextProductos } from '../Contexts/ContextProductos'; // Importa el contexto
import { IProductos } from '../models/IProductos';

export default function ProvidersProductos({ children }: { children: React.ReactNode }) {
  const [producto, setProducto] = useState<IProductos[]>([]);
  const API = "http://localhost:8080/productos";

  async function obtenerProductos() {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProducto(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.log("Error al cargar productos:", error);
    }
  }

  async function agregarProducto(producto: IProductos, opcion: number) {
    const url = opcion === 1 ? API : `${API}/${producto.idProductos}`;
    const method = opcion === 1 ? "POST" : "PUT";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    obtenerProductos(); 
  }

  async function eliminarProducto(id: number) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    obtenerProductos(); 
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
        agregarProducto,
        eliminarProducto,
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