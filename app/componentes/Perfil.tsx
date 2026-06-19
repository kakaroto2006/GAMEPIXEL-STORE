'use client'

import { useState } from 'react'
import { useContextUsuario } from '../Providers/ProvidersUsuarios'
import { useRouter } from 'next/navigation'

export default function Perfil() {
    const router = useRouter()
    const { usuario, cerrarSesion } = useContextUsuario()
    const [open, setOpen] = useState(false)


    return (
        <div className="relative">


            <button
                onClick={() => setOpen(!open)}
                className="bg-gray-800 px-4 py-2 rounded text-white hover:bg-gray-700"
            >
                Perfil
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded p-4 shadow-lg z-50">

                    <p className="text-gray-400 text-sm">Nombre</p>
                    <p className="mb-2 font-semibold text-white">
                        {usuario?.nombre_Usuario || 'No disponible'}
                    </p>

                    <p className="text-gray-400 text-sm">Correo</p>
                    <p className="font-semibold text-white">
                        {usuario?.correo_Usuario || 'No disponible'}
                    </p>
                    <button
                        onClick={() => {
                            cerrarSesion()
                            router.push('/')
                        }}
                        className="text-red-400 hover:text-red-300"
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}

        </div>
    )
}