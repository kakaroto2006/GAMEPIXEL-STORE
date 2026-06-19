import NavBar from "../componentes/NavBar";
import ProvidersProductos from "@/app/Providers/ProvidersProductos";
import ProvidersCarrito from "../Providers/ProvidersCarrito";
import ProviderFavoritos from "../Providers/ProvidersFavoritos";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProviderFavoritos>
      <ProvidersCarrito>
        <ProvidersProductos>
          <NavBar/>
          {children}
        </ProvidersProductos>
        </ProvidersCarrito>
        </ProviderFavoritos>
   </div>
  );
}