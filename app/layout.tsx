import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nolivos Law | Servicios Legales de Inmigración',
  description: 'Soluciones legales personalizadas para todos tus trámites migratorios.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
        >
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-slate-900 text-white py-6 text-center">
            <p>© {new Date().getFullYear()} Nolivos Law. Todos los derechos reservados.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}