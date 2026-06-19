'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import Perfil from './Perfil'

export default function NavBar() {
  return (
    <nav className="bg-black text-white py-4 px-12 flex justify-between items-center border-b border-gray-800">
      <div className="flex items-center">
        <Link href="/MenuPrincipal">
          <Image 
            src='/logo pixel.png'    
            alt="logo PixelStore" 
            width={200}    
            height={40} 
            priority      
          />
        </Link>
      </div>
  
      <div className="flex items-center gap-8">
        <Link href="/MenuPrincipal" className="hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          Catálogo
        </Link>
        <Link href="/favoritos" className="hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          Favoritos
        </Link>
        <Link href="/Resenias" className="hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          Blogs
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/carrito" className="text-gray-400 hover:text-green-500 transition-colors uppercase text-xs font-bold tracking-widest">
          carrito
        </Link>
        <Perfil />
      </div>
    </nav>
  )
}