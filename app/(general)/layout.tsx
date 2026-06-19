import NavBar from "../componentes/NavBar";
import ProvidersProductos from "@/app/Providers/ProvidersProductos";
import ProvidersCarrito from "../Providers/ProvidersCarrito";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      
      <ProvidersCarrito>
        <ProvidersProductos>
          <NavBar/>
          {children}
        </ProvidersProductos>
        </ProvidersCarrito>
   </div>
  );
}