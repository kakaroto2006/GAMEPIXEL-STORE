'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { IUsuarios } from '../models/IUsuarios'
import { Vista } from '../models/Vista'
import { toast } from 'sonner'
import { ContextUsuario } from '../Contexts/ContextUsuario'

export default function UsuarioProvider({ children }: Vista) {

  const [usuario, setUsuario] = useState<IUsuarios | null>(null)

  const API = 'http://localhost:8080'


  const login = async (correo: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API}/inicio_Sesion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo_Usuario: correo,
          contrasenia_Usuario: pass,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message || 'Error al iniciar sesión')
        return false
      }

      setUsuario(data.data)
      localStorage.setItem('usuario', JSON.stringify(data.data))

      return true
    } catch {
      toast.error('Error de conexión')
      return false
    }
  }


  const registro = async (datos: IUsuarios) => {
    try {
      const res = await fetch(`${API}/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message || 'Error al registrar usuario')
        return false
      }

      toast.success('Usuario registrado correctamente')
      return true
    } catch {
      toast.error('Error de conexión con el servidor')
      return false
    }
  }


  const cerrarSesion = () => {
    setUsuario(null)
    localStorage.removeItem('usuario')
    toast.info('Sesión cerrada')
  }

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error("Error al cargar usuario", error);
      }
    }
  }, []);
  return (
    <ContextUsuario.Provider
      value={{
        usuario,
        login,
        registro,
        cerrarSesion,
      }}
    >
      {children}
    </ContextUsuario.Provider>
  )
}

export function useContextUsuario() {
  return useContext(ContextUsuario)
}