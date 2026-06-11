'use client'
import React from 'react'
import Link from 'next/link'
import { useContextProductos } from '../Providers/ProvidersProductos'
import Image from 'next/image';

export default function NavBar() {
  const { producto } = useContextProductos()

  return (
    <nav className="bg-black text-white py-2 px-12 flex justify-between items-center border-b border-gray-800">
            
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
        <Link href="/" className="hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          Home
        </Link>
        <Link href="/Productos" className="hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          Favoritos
        </Link>
        <Link href="/Blog" className="hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          Blogs
        </Link>
        <Link href="/Contact" className="hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          Contactanos
        </Link>
      </div>

      {/* Iconos de acción */}
      <div className="flex items-center gap-6">
        {/* Aquí puedes añadir iconos de búsqueda/usuario/carrito */}
        <span className="text-gray-400 hover:text-white cursor-pointer">Busqueda</span>
        <span className="text-gray-400 hover:text-white cursor-pointer">Perfil</span>
        
        <Link href="/Carrito" className="relative text-gray-400 hover:text-green-500 transition-colors">
          Carrito
          <span className="absolute -top-2 -right-2 bg-green-500 text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {producto.length}
          </span>
        </Link>
      </div>
    </nav>
  )
}