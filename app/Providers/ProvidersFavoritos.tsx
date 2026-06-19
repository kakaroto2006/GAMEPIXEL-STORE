'use client';

import React, { useContext, useState } from 'react';
import { contextFavoritos } from '../Contexts/ContextFavoritos';
import { IFavoritos } from '../models/IFavoritos';
import { IProductos } from '../models/IProductos';
import { Vista } from '../models/Vista';

export default function ProviderFavoritos({ children }: Vista) {
  const [favoritos, setFavoritos] = useState<IFavoritos[]>([]);

  const obtenerUsuario = () => {
    const usuarioJson = localStorage.getItem('usuario');
    return usuarioJson ? JSON.parse(usuarioJson) : null;
  };

  async function obtenerFavoritos() {
    const usuario = obtenerUsuario();
    if (!usuario?.idUsuarios) return;

    try {
      const response = await fetch(`http://localhost:8080/favoritos/${usuario.idUsuarios}`);
      if (response.ok) {
        const data = await response.json();
        setFavoritos(Array.isArray(data) ? data : (data.data || []));
      }
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
    }
  }

  async function agregarAFavoritos(producto: IProductos) {
    const usuario = obtenerUsuario();
    if (!usuario) return alert("Inicia sesión para guardar favoritos.");

    try {
      const response = await fetch('http://localhost:8080/favoritos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          Usuarios_idUsuarios: usuario.idUsuarios, 
          Productos_idProductos: producto.idProductos 
        }),
      });

      if (response.ok) {
        obtenerFavoritos();
      } else {
        const error = await response.json();
        console.error("Error al añadir:", error);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  async function eliminarFavorito(idFavorito: number) {
    try {
      const response = await fetch(`http://localhost:8080/favoritos/${idFavorito}`, {
        method: 'DELETE',
      });
      if (response.ok) obtenerFavoritos();
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
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