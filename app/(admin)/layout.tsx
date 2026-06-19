
import ProvidersProductos from "@/app/Providers/ProvidersProductos";
import NavBarAdmin from "../componentes/NavBarAdmin";
import ProviderCarrito from "../Providers/ProvidersCarrito";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProviderCarrito>
        <ProvidersProductos>
          <NavBarAdmin/>
          {children}
        </ProvidersProductos>
        </ProviderCarrito>
   </div>
  );
}