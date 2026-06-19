import { createContext } from 'react'
import { IUsuarios } from '../models/IUsuarios'

export const ContextUsuario = createContext({
  usuario: null as IUsuarios | null,
 login: (correo: string, contraseña: string) => {},
  registro: (datos: IUsuarios) => {},
  cerrarSesion: () => {}
})