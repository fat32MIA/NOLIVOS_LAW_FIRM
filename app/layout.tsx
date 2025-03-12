// app/layout.tsx
import { neueCorp } from '@/lib/fonts';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nolivos Law | Servicios Legales de Inmigración',
  description: 'Soluciones legales personalizadas para todos tus trámites migratorios. Experiencia y compromiso para guiarte en cada paso del proceso.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={neueCorp.variable} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Barra de Navegación (una sola instancia) */}
          <Navbar />
          
          {/* Contenido Principal */}
          <main className="min-h-screen pt-16">
            {children}
          </main>
          
          {/* Pie de Página */}
          <footer className="bg-[#0d2247] text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">NOLIVOS LAW</h3>
                  <p className="text-gray-400">
                    Soluciones legales personalizadas para todos tus trámites migratorios.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                  <p className="text-gray-400 mb-2">+1 (555) 123-4567</p>
                  <p className="text-gray-400">contacto@nolivoslaw.com</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="/immigration-assistant" className="hover:text-white">Asistente de Inmigración</a></li>
                    <li><a href="/document-scanner" className="hover:text-white">Escáner de Documentos</a></li>
                    <li><a href="/login" className="hover:text-white">Iniciar Sesión</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>© {new Date().getFullYear()} Nolivos Law. Todos los derechos reservados.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
