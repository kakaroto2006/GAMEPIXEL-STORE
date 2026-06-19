import { Toaster } from "sonner";
import UsuarioProvider from "../Providers/ProvidersUsuarios";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <UsuarioProvider>
          {children}
          <Toaster position="top-right" richColors />
        </UsuarioProvider>
         
   </div>
  );
}