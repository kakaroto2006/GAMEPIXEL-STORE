
import ProvidersProductos from "@/app/Providers/ProvidersProductos";
import NavBarAdmin from "../componentes/NavBarAdmin";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <ProvidersProductos>
          <NavBarAdmin/>
          {children}
        </ProvidersProductos>
   </div>
  );
}