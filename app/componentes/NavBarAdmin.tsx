'use client'
import React from 'react'
import Link from 'next/link'
import { useContextProductos } from '../Providers/ProvidersProductos'
import { useContextUsuario } from '../Providers/ProvidersUsuarios'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import Perfil from './Perfil'

export default function NavBarAdmin() {
  const { producto} = useContextProductos()
  const { usuario, cerrarSesion } = useContextUsuario()
const router = useRouter()

  return (
    <nav className="bg-black text-white py-2 px-12 flex justify-between items-center">
            
        <Link href="MenuPrincipal">
  <Image 
    src='/logo pixel.png'    
    alt="logo PixelStore" 
    width={250}    
    height={20} 
    priority      
  />
</Link>
    <div className="flex items-center gap-8">
      <Link href="/Administracion" className="hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          Administracion
        </Link>
        <Link href="/ChartJS" className="hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          Ventas
        </Link>
        <Link href="/ChartJSProduct" className="hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          Productos
        </Link>
        </div>

<Perfil/>
    </nav>
  )
}