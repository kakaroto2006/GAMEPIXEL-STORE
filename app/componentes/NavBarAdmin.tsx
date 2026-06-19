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

<Perfil/>
    </nav>
  )
}