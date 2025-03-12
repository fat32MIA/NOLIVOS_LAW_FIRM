// fix-navbar-issue.js
const fs = require('fs');
const path = require('path');

console.log('🔧 Corrigiendo problema del navbar...');

// Crear directorio de estilos si no existe
const stylesDir = path.join(process.cwd(), 'styles');
if (!fs.existsSync(stylesDir)) {
  fs.mkdirSync(stylesDir, { recursive: true });
  console.log('📁 Creado directorio styles/');
}

// Contenido para el archivo de estilos CSS
const navbarCssContent = `/* styles/navbar.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

.nav-item {
  position: relative;
  transition: all 0.3s ease;
}

.nav-link {
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  display: block;
  padding: 16px 20px;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: white;
}

.nav-item.active .nav-link {
  color: #0d2247;
}

.hori-selector {
  display: inline-block;
  position: absolute;
  height: 100%;
  top: 0px;
  left: 0px;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  background-color: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  z-index: -1;
}

.hori-selector .right,
.hori-selector .left {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #fff;
  bottom: 0;
}

.hori-selector .right {
  right: -10px;
}

.hori-selector .left {
  left: -10px;
}

.hori-selector .right:before,
.hori-selector .left:before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #0d2247;
}

.hori-selector .right:before {
  bottom: 0;
  right: -10px;
}

.hori-selector .left:before {
  bottom: 0;
  left: -10px;
}

/* Estilos para móvil */
@media (max-width: 768px) {
  .hori-selector {
    display: none;
  }
}`;

// Guardar el archivo CSS
fs.writeFileSync(path.join(stylesDir, 'navbar.css'), navbarCssContent);
console.log('✅ Creado archivo styles/navbar.css');

// Actualizar el archivo global.css para importar el CSS del navbar
const globalCssPath = path.join(process.cwd(), 'app', 'globals.css');
if (fs.existsSync(globalCssPath)) {
  let globalCssContent = fs.readFileSync(globalCssPath, 'utf8');
  
  // Verificar si ya existe la importación
  if (!globalCssContent.includes('@import "../styles/navbar.css"')) {
    globalCssContent = `@import "../styles/navbar.css";\n\n${globalCssContent}`;
    fs.writeFileSync(globalCssPath, globalCssContent);
    console.log('✅ Actualizado app/globals.css para importar los estilos del navbar');
  } else {
    console.log('ℹ️ La importación de estilos del navbar ya existe en globals.css');
  }
} else {
  console.log('⚠️ No se encontró el archivo app/globals.css');
}

// Contenido correcto para el componente navbar.tsx
const navbarTsxContent = `// components/navbar.tsx
"use client";

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Menu, X, Sun, Moon, User, Home, FileText, Calendar, BarChart2, Users } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathName = usePathname();
  const navbarRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLLIElement | null>(null);
  const [selectorStyle, setSelectorStyle] = useState({
    top: '0px',
    left: '0px',
    height: '0px',
    width: '0px',
    opacity: 0
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Navigation links
  const navLinks = [
    { href: "/", label: "Inicio", icon: <Home className="w-5 h-5" /> },
    { href: "/dashboard", label: "Dashboard", icon: <BarChart2 className="w-5 h-5" /> },
    { href: "/immigration-assistant", label: "Asistente", icon: <FileText className="w-5 h-5" /> },
    { href: "/document-scanner", label: "Documentos", icon: <FileText className="w-5 h-5" /> },
    { href: "/login", label: "Iniciar Sesión", icon: <User className="w-5 h-5" /> }
  ];

  // Update selector position when active item changes
  const updateSelector = () => {
    if (!activeTabRef.current || !mounted) return;
    
    const activeItem = activeTabRef.current;
    const rect = activeItem.getBoundingClientRect();
    const navRect = navbarRef.current?.getBoundingClientRect();
    
    if (navRect) {
      setSelectorStyle({
        top: \`\${activeItem.offsetTop}px\`,
        left: \`\${activeItem.offsetLeft}px\`,
        height: \`\${rect.height}px\`,
        width: \`\${rect.width}px\`,
        opacity: 1
      });
    }
  };

  // Set up effects
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      updateSelector();
      window.addEventListener('resize', updateSelector);
      return () => window.removeEventListener('resize', updateSelector);
    }
  }, [mounted, pathName]);

  return (
    <nav className="bg-[#0d2247] text-white shadow-md w-full z-10" ref={navbarRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo-inolpng.png" 
                alt="Nolivos Law" 
                width={150} 
                height={40} 
                className="h-8 w-auto"
                onError={() => console.log("Error loading image")}
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center">
            <ul className="flex items-center space-x-1 relative">
              {/* Selector indicator */}
              <div 
                className="absolute bg-white rounded-t-md transition-all duration-300"
                style={{
                  top: selectorStyle.top,
                  left: selectorStyle.left,
                  height: selectorStyle.height,
                  width: selectorStyle.width,
                  opacity: selectorStyle.opacity
                }}
              >
                <div className="absolute -left-2.5 bottom-0 w-5 h-5 bg-[#0d2247]">
                  <div className="absolute w-10 h-10 rounded-full bg-[#0d2247] -left-5 bottom-0"></div>
                </div>
                <div className="absolute -right-2.5 bottom-0 w-5 h-5 bg-[#0d2247]">
                  <div className="absolute w-10 h-10 rounded-full bg-[#0d2247] -right-5 bottom-0"></div>
                </div>
              </div>

              {/* Navigation Items */}
              {navLinks.map((link) => {
                const isActive = pathName === link.href;
                return (
                  <li 
                    key={link.href}
                    ref={isActive ? activeTabRef : null}
                    className={\`relative \${isActive ? 'text-[#0d2247]' : 'text-white/80 hover:text-white'}\`}
                  >
                    <Link 
                      href={link.href} 
                      className="flex items-center px-4 py-4 transition-colors duration-300"
                      onClick={updateSelector}
                    >
                      <span className="mr-2">{link.icon}</span>
                      {link.label}
                    </Link>
                  </li>
                );
              })}

              {/* Theme toggle */}
              <li className="ml-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-white/80 hover:text-white focus:outline-none"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-md text-white/80 hover:text-white focus:outline-none"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-white/80 hover:text-white focus:outline-none"
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#1a3a75]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={\`block px-3 py-2 rounded-md text-base font-medium \${
                    pathName === link.href 
                      ? 'bg-white text-[#0d2247]' 
                      : 'text-white/80 hover:text-white hover:bg-[#0d2247]/80'
                  }\`}
                  onClick={toggleMenu}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{link.icon}</span>
                    {link.label}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}`;

// Guardar el archivo navbar.tsx corregido
const navbarComponentPath = path.join(process.cwd(), 'components', 'navbar.tsx');
fs.writeFileSync(navbarComponentPath, navbarTsxContent);
console.log('✅ Corregido components/navbar.tsx');

// Asegurarse de que la carpeta components existe
const componentsDir = path.join(process.cwd(), 'components');
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
  console.log('📁 Creado directorio components/');
}

// Asegurarse de que existe el proveedor de tema
const themeProviderDir = path.join(componentsDir, 'theme');
if (!fs.existsSync(themeProviderDir)) {
  fs.mkdirSync(themeProviderDir, { recursive: true });
  console.log('📁 Creado directorio components/theme/');
  
  // Contenido del proveedor de tema
  const themeProviderContent = `// components/theme/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}`;
  
  fs.writeFileSync(path.join(themeProviderDir, 'theme-provider.tsx'), themeProviderContent);
  console.log('✅ Creado components/theme/theme-provider.tsx');
}

console.log('\n✨ ¡Correcciones completadas!');
console.log('\nPróximos pasos:');
console.log('1. Asegúrate de tener instaladas las dependencias necesarias con:');
console.log('   npm install next-themes lucide-react');
console.log('2. Intenta compilar de nuevo:');
console.log('   npm run build');
