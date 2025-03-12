// simple-fix.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Función para crear directorios
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Creado directorio: ${dir}`);
  }
};

// Función para escribir archivos
const writeFile = (filePath, content) => {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`✅ Creado/actualizado: ${filePath}`);
};

// Crear estructura básica
console.log('🚀 Creando estructura básica...');
ensureDir('app');
ensureDir('components/theme');
ensureDir('public/images');

// Crear archivos principales
console.log('📝 Creando archivos principales...');

// next.config.js
writeFile('next.config.js', `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;`);

// tailwind.config.js
writeFile('tailwind.config.js', `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`);

// postcss.config.mjs
writeFile('postcss.config.mjs', `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`);

// app/globals.css
writeFile('app/globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

[data-theme='dark'] {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 17, 24, 39;
  --background-end-rgb: 31, 41, 55;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-start-rgb));
  min-height: 100vh;
}`);

// theme-provider.tsx
writeFile('components/theme/theme-provider.tsx', `"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}`);

// navbar.tsx
writeFile('components/navbar.tsx', `"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-slate-900 text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">NOLIVOS LAW</span>
              <span className="ml-2 text-sm text-gray-400">SERVICIOS LEGALES</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800">
                Inicio
              </Link>
              <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800">
                Dashboard
              </Link>
              <Link href="/immigration-assistant" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800">
                Asistente de Inmigración
              </Link>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md text-gray-300 hover:bg-slate-800 focus:outline-none"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <Link href="/login" className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700">
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}`);

// app/layout.tsx
writeFile('app/layout.tsx', `import './globals.css';
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
}`);

// app/page.tsx
writeFile('app/page.tsx', `import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section className="py-16 bg-gradient-to-r from-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Servicios Legales de Inmigración
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Soluciones legales personalizadas para todos tus trámites migratorios.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Iniciar Sesión
            </Link>
            <Link href="#consulta" className="px-6 py-3 bg-white text-blue-900 rounded-md hover:bg-gray-100">
              Consulta Gratuita
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">Visas y Permisos</h3>
              <p className="mb-4">Asesoría completa para visas de trabajo, turismo, estudios y reunificación familiar.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">Asilo y Refugio</h3>
              <p className="mb-4">Ayudamos a personas que buscan protección por persecución en sus países de origen.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">Escáner de Documentos</h3>
              <p className="mb-4">Digitaliza tus documentos legales de forma segura para agilizar tus trámites.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="consulta" className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Consulta Rápida
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Tu nombre</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block mb-1">Tu email</label>
              <input type="email" className="w-full p-2 border rounded" placeholder="tu@email.com" />
            </div>
            <div>
              <label className="block mb-1">¿Cómo podemos ayudarte?</label>
              <textarea rows={4} className="w-full p-2 border rounded" placeholder="Describe tu situación..."></textarea>
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Enviar Consulta
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}`);

// Actualizar package.json para añadir las dependencias
try {
  if (fs.existsSync('package.json')) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Añadir scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint"
    };
    
    // Asegurar dependencias esenciales
    packageJson.dependencies = {
      ...packageJson.dependencies,
      "next": "^14.0.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "next-themes": "^0.2.1",
      "lucide-react": "^0.290.0"
    };
    
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    console.log('✅ Actualizado: package.json');
  }
} catch (error) {
  console.error('❌ Error al actualizar package.json:', error.message);
}

// Instalar dependencias necesarias
console.log('\n📦 Instalando dependencias...');
try {
  execSync('npm install next-themes lucide-react', { stdio: 'inherit' });
  console.log('✅ Dependencias instaladas correctamente');
} catch (error) {
  console.error('⚠️ Error al instalar dependencias:', error.message);
  console.log('Por favor instala manualmente con: npm install next-themes lucide-react');
}

console.log('\n✨ Implementación básica completada');
console.log('\nPróximos pasos:');
console.log('1. Construye el proyecto: npm run build');
console.log('2. Inicia el servidor: npm run start');
console.log('3. Haz un commit de los cambios:');
console.log('   git add .');
console.log('   git commit -m "Implementación básica de mejoras"');
console.log('   git push origin main');
