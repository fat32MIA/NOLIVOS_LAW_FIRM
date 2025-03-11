
import './globals.css';

export const metadata = {
  title: 'Nolivos Law Firm',
  description: 'Servicios legales de inmigración',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
