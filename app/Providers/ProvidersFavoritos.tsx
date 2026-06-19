'use client'
import React, { useContext, useState, useEffect } from 'react';
import { contextFavoritos } from '../Contexts/ContextFavoritos';
import { IFavoritos } from '../models/IFavoritos';
import { IProductos } from '../models/IProductos';
import { Vista } from '../models/Vista';

export default function ProviderFavoritos({ children }: Vista) {
  const [favoritos, setFavoritos] = useState<IFavoritos[]>([]);

  async function obtenerFavoritos() {
    const usuarioJson = localStorage.getItem('usuario');
    if (!usuarioJson) return;

    try {
      const usuario = JSON.parse(usuarioJson);
      const response = await fetch(`http://localhost:8080/favoritos/usuario/${usuario.idUsuarios}`);
      if (response.ok) {
        const data = await response.json();
        setFavoritos(data || []);
      }
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
    }
  }

  async function agregarAFavoritos(producto: IProductos) {
    const usuarioJson = localStorage.getItem('usuario');
    if (!usuarioJson) return alert("Inicia sesión");

    const usuario = JSON.parse(usuarioJson);
    try {
      const response = await fetch('http://localhost:8080/favoritos/agregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            Usuarios_idUsuarios: usuario.idUsuarios, 
            Productos_idProductos: producto.idProductos 
        }),
      });

      // AGREGA ESTO:
      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (response.ok) {
        obtenerFavoritos();
      } else {
        alert("Error: " + (data.mensaje || "No se pudo agregar"));
      }
    } catch (error) {
      console.error("Error completo:", error);
    }
}

  async function eliminarFavorito(idFavorito: number) {
    try {
      await fetch(`http://localhost:8080/favoritos/eliminar/${idFavorito}`, {
        method: 'DELETE',
      });
      obtenerFavoritos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  }

  return (
    <contextFavoritos.Provider value={{ favoritos, agregarAFavoritos, obtenerFavoritos, eliminarFavorito }}>
      {children}
    </contextFavoritos.Provider>
  );
}

export const useContextFavoritos = () => 
    useContext(contextFavoritos);