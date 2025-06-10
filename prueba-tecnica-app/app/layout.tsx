import './globals.css';
import { SWRProvider } from './swr-config'; 


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
