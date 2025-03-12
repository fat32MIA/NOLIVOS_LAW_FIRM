#!/usr/bin/env node
// implement-improvements.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando implementación de mejoras...');

// Asegurar que los directorios necesarios existan
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Creado directorio: ${dir}`);
  }
};

// Crear/actualizar archivo
const writeFile = (filePath, content) => {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`✅ Creado/actualizado: ${filePath}`);
};

// Directorios principales
ensureDir('app');
ensureDir('components');
ensureDir('components/theme');
ensureDir('lib');
ensureDir('public/images');
ensureDir('styles');

// next.config.js
const nextConfigContent = `// next.config.js
/** @type {import('next').NextConfig} */
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
    // Para compatibilidad con versiones anteriores (mostrado como advertencia)
    domains: ['images.unsplash.com', 'cdn.example.com'],
  },
  // Asegura que los estilos carguen correctamente
  webpack: (config) => {
    config.module.rules.push({
      test: /\\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });
    return config;
  },
};

module.exports = nextConfig;`;

// Navbar component
const navbarContent = `// components/navbar.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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
              <Link href="/document-scanner" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800">
                Escáner de Documentos
              </Link>
              <button
                onClick={toggleTheme}
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

          <div className="flex md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-md text-gray-300 hover:bg-slate-800 focus:outline-none"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-300 hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700" onClick={toggleMenu}>
              Inicio
            </Link>
            <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700" onClick={toggleMenu}>
              Dashboard
            </Link>
            <Link href="/immigration-assistant" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700" onClick={toggleMenu}>
              Asistente de Inmigración
            </Link>
            <Link href="/document-scanner" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700" onClick={toggleMenu}>
              Escáner de Documentos
            </Link>
            <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 text-center" onClick={toggleMenu}>
              Iniciar Sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}`;

// Server start script
const serverScriptContent = `// start-server.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando servidor...');

// Determinar si estamos en modo producción o desarrollo
const isProd = process.env.NODE_ENV === 'production';

// Verificar si existe el directorio standalone
const standalonePath = path.join(__dirname, '.next', 'standalone');
const hasStandalone = fs.existsSync(standalonePath);

try {
  if (isProd && hasStandalone) {
    console.log('Ejecutando en modo producción con standalone...');
    // Copiar carpetas estáticas necesarias
    if (!fs.existsSync(path.join(standalonePath, 'public'))) {
      console.log('Copiando carpeta public a standalone...');
      fs.cpSync(path.join(__dirname, 'public'), path.join(standalonePath, 'public'), { recursive: true });
    }
    
    // Iniciar servidor standalone
    console.log('Iniciando servidor standalone...');
    execSync('node .next/standalone/server.js', { stdio: 'inherit' });
  } else {
    // Modo desarrollo o sin standalone
    console.log('Ejecutando: next start');
    execSync('next start', { stdio: 'inherit' });
  }
} catch (error) {
  console.error('❌ Error al iniciar el servidor:', error.message);
  process.exit(1);
}`;

// Global styles
const globalStylesContent = `/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
  --primary-color: 59, 130, 246; /* blue-500 */
  --secondary-color: 17, 24, 39; /* gray-900 */
  --accent-color: 239, 68, 68; /* red-500 */
}

[data-theme='dark'] {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 17, 24, 39;
  --background-end-rgb: 31, 41, 55;
  --primary-color: 96, 165, 250; /* blue-400 */
  --secondary-color: 209, 213, 219; /* gray-300 */
  --accent-color: 248, 113, 113; /* red-400 */
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
  min-height: 100vh;
}

/* Estilos para formularios */
.form-input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1;
}

.form-button {
  @apply px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

/* Estilos para tarjetas */
.card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden;
}

.card-header {
  @apply px-6 py-4 border-b border-gray-200 dark:border-gray-700;
}

.card-title {
  @apply text-xl font-semibold text-gray-900 dark:text-white;
}

.card-body {
  @apply px-6 py-4;
}

.card-footer {
  @apply px-6 py-4 border-t border-gray-200 dark:border-gray-700;
}

/* Estilos para botones */
.btn {
  @apply inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
}

.btn-secondary {
  @apply bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500;
}

.btn-danger {
  @apply bg-red-600 text-white hover:bg-red-700 focus:ring-red-500;
}

/* Estilos para la página de inicio */
.hero-section {
  @apply py-16 md:py-24 bg-gradient-to-r from-blue-900 to-slate-900 text-white;
}

.services-section {
  @apply py-12 bg-gray-50 dark:bg-gray-900;
}

.contact-section {
  @apply py-12 bg-white dark:bg-gray-800;
}`;

// Layout principal
const layoutContent = `// app/layout.tsx
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
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-slate-900 text-white py-8">
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
}`;

// Theme provider
const themeProviderContent = `// components/theme/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}`;

// Home page
const homePageContent = `// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Servicios Legales de Inmigración
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              Soluciones legales personalizadas para todos tus trámites migratorios. Experiencia y compromiso para guiarte en cada paso del proceso.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/login" 
                className="btn btn-primary px-6 py-3 text-base md:text-lg"
              >
                Iniciar Sesión
              </Link>
              <Link 
                href="#consulta" 
                className="btn bg-white text-blue-900 hover:bg-gray-100 px-6 py-3 text-base md:text-lg"
              >
                Consulta Gratuita
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Nuestros Servicios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Visas y Permisos */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Visas y Permisos</h3>
              </div>
              <div className="card-body">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Ofrecemos asesoría completa para visas de trabajo, turismo, estudios y reunificación familiar.
                </p>
                <Link 
                  href="/immigration-assistant" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Más Información →
                </Link>
              </div>
            </div>

            {/* Asilo y Refugio */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Asilo y Refugio</h3>
              </div>
              <div className="card-body">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Ayudamos a personas que buscan protección por persecución o temor fundado en sus países de origen.
                </p>
                <Link 
                  href="/immigration-assistant" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Más Información →
                </Link>
              </div>
            </div>

            {/* Escáner de Documentos */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Escáner de Documentos</h3>
              </div>
              <div className="card-body">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Digitaliza y procesa tus documentos legales de forma segura para agilizar tus trámites migratorios.
                </p>
                <Link 
                  href="/document-scanner" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Más Información →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Consulta */}
      <section id="consulta" className="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Consulta Rápida
            </h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="nombre" className="form-label">Tu nombre</label>
                <input 
                  type="text" 
                  id="nombre" 
                  placeholder="Tu nombre" 
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="form-label">Tu email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="tu@email.com" 
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="mensaje" className="form-label">¿Cómo podemos ayudarte?</label>
                <textarea 
                  id="mensaje" 
                  rows={4} 
                  placeholder="Describe brevemente tu situación legal..." 
                  className="form-input"
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="w-full form-button"
                >
                  Enviar Consulta
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}`;

// Login page simple
const loginPageContent = `// app/login/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular proceso de login
    setTimeout(() => {
      setIsLoading(false);
      // Redireccionar según el tipo de usuario (en una implementación real)
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Accede a tu cuenta para gestionar tus trámites
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Correo electrónico</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}`;

// Tailwind config
const tailwindConfigContent = `// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}`;

// PostCSS Config
const postcssConfigContent = `// postcss.config.mjs
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

// Package.json updates
const updatePackageJson = () => {
  if (!fs.existsSync('package.json')) {
    console.error('❌ No se encontró el archivo package.json');
    return;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Añadir scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: "next dev",
      build: "next build",
      start: "next start",
      "start:custom": "node start-server.js",
      lint: "next lint"
    };
    
    // Asegurar dependencias esenciales
    packageJson.dependencies = {
      ...packageJson.dependencies,
      "next": "^14.0.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "next-themes": "^0.2.1",
      "lucide-react": "^0.290.0",
      "tailwindcss": "^3.3.0",
      "postcss": "^8.4.31",
      "autoprefixer": "^10.4.16",
      "tailwindcss-animate": "^1.0.7"
    };
    
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    console.log('✅ Actualizado: package.json');
  } catch (error) {
    console.error('❌ Error al actualizar package.json:', error.message);
  }
};

// Escribir todos los archivos
writeFile('next.config.js', nextConfigContent);
writeFile('tailwind.config.js', tailwindConfigContent);
writeFile('postcss.config.mjs', postcssConfigContent);
writeFile('components/navbar.tsx', navbarContent);
writeFile('components/theme/theme-provider.tsx', themeProviderContent);
writeFile('app/page.tsx', homePageContent);
writeFile('app/login/page.tsx', loginPageContent);
writeFile('start-server.js', serverScriptContent);

// Actualizar package.json
updatePackageJson();

// Crear un archivo README.md básico
const readmeContent = `# Nolivos Law

Sitio web para el bufete de abogados Nolivos Law, especializado en servicios legales de inmigración.

## Características

- Interfaz moderna y profesional con tema oscuro/claro
- Página de inicio con presentación de servicios
- Sistema de autenticación
- Panel de administración
- Asistente de inmigración
- Escáner de documentos
- Formulario de contacto

## Tecnologías

- Next.js
- React
- TailwindCSS
- Next Themes
- Lucide React

## Instalación

\`\`\`bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm run start:custom
\`\`\`
`;

writeFile('README.md', readmeContent);

// Instalar dependencias
console.log('\n📦 Instalando dependencias necesarias...');
try {
  execSync('npm install next-themes lucide-react tailwindcss-animate', { stdio: 'inherit' });
  console.log('✅ Dependencias instaladas correctamente');
} catch (error) {
  console.error('⚠️ Error al instalar dependencias:', error.message);
  console.log('Por favor, instala manualmente ejecutando: npm install next-themes lucide-react tailwindcss-animate');
}

console.log('\n✨ Implementación completada con éxito');
console.log('\nPara continuar:');
console.log('1. Construye el proyecto: npm run build');
console.log('2. Inicia el servidor: npm run start:custom');
console.log('3. Haz un commit de los cambios:');
console.log('   git add .');
console.log('   git commit -m "Implementación de mejoras visuales y funcionales"');
console.log('   git push -f origin main');
/globals.css', globalStylesContent);
writeFile('app/layout.tsx', layoutContent);
writeFile('app
