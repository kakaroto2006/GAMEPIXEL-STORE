'use client'
import Image from "next/image";
import ProvidersProductos from "./Providers/ProvidersProductos";
import NavBar from "./componentes/NavBar";
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function HomePage() {
    const router = useRouter()

  function iniciarSesion() {
    console.log("Iniciar sesión");
    router.push("/carrito");
  }
  return (
    <main>
       <div className="flex flex-col flex-1 items-center justify-center bg-white text-black">
          <h1>Pagina principal</h1>

          <form className="form-control">
            <h3>Iniciar sesión</h3>
            <input type="email" placeholder="Email" className="form-control" /> <br />
            <input type="password" placeholder="Contraseña" className="form-control" /> <br />
            <button type="button" className="btn btn-primary" onClick={iniciarSesion}>Iniciar sesión</button>
          </form>
          
          {/* Pequeña corrección: le agregué texto al Link para que no sea invisible en tu diseño */}
          <Link href="/MenuPrincipal" className="btn btn-warning">Ir al Carrito Directamente</Link>
      </div>
    </main>
  )
}