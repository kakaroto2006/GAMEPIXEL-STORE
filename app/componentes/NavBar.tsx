'use client'
import React from 'react'
import Link from 'next/link'
import { useContextProductos } from '../Providers/ProvidersProductos'
import { useContextUsuario } from '../Providers/ProvidersUsuarios'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import Perfil from './Perfil'

export default function NavBar() {
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
  
      {/* Navegación centralizada */}
      <div className="flex items-center gap-8">
        <Link href="/MenuPrincipal" className="hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          Catalago
        </Link>
        <Link href="/favoritos" className="hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          Favoritos
        </Link>
        <Link href="/Resenias" className="hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          Blogs
        </Link>

      </div>
      <div className="flex items-center gap-6">
       <Link href="/carrito" className="relative text-gray-400 hover:text-green-500 transition-colors">
          Carrito
        </Link>
       
       <Perfil/>
        
     
        
      </div>
    </nav>
  )
}