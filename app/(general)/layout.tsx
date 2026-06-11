import NavBar from "../componentes/NavBar";
import ProvidersProductos from "@/app/Providers/ProvidersProductos";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <ProvidersProductos>
          <NavBar/>
          {children}
        </ProvidersProductos>
   </div>
  );
}