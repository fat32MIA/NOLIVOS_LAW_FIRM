// fix-sql-client.js
const fs = require('fs');
const path = require('path');

console.log('🔧 Corrigiendo problema de SQLite en el cliente...');

// Crear directorio de servicios si no existe
const libDir = path.join(process.cwd(), 'lib');
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// Crear usuario básico en el cliente
const userClientCode = `// lib/user-client.ts
"use client";

// Tipos de usuario
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'lawyer' | 'paralegal' | 'client';
}

// Tipos de enlaces de navegación
export interface NavLink {
  href: string;
  label: string;
  icon: string;
}

// Función para obtener los enlaces de navegación basados en el rol del usuario
export function getNavLinks(role: string): NavLink[] {
  const commonLinks: NavLink[] = [
    { href: "/", label: "Inicio", icon: "Home" }
  ];

  switch (role) {
    case 'admin':
      return [
        ...commonLinks,
        { href: "/admin/dashboard", label: "Dashboard", icon: "BarChart2" },
        { href: "/admin/clients", label: "Clientes", icon: "Users" },
        { href: "/admin/cases", label: "Casos", icon: "Briefcase" },
        { href: "/admin/settings", label: "Configuración", icon: "Settings" }
      ];
    case 'lawyer':
      return [
        ...commonLinks,
        { href: "/lawyer/dashboard", label: "Dashboard", icon: "BarChart2" },
        { href: "/lawyer/cases", label: "Mis Casos", icon: "Briefcase" },
        { href: "/lawyer/calendar", label: "Calendario", icon: "Calendar" },
        { href: "/immigration-assistant", label: "Asistente", icon: "HelpCircle" }
      ];
    case 'paralegal':
      return [
        ...commonLinks,
        { href: "/paralegal/dashboard", label: "Dashboard", icon: "BarChart2" },
        { href: "/paralegal/documents", label: "Documentos", icon: "FileText" },
        { href: "/paralegal/tasks", label: "Tareas", icon: "CheckSquare" }
      ];
    case 'client':
      return [
        ...commonLinks,
        { href: "/client/dashboard", label: "Dashboard", icon: "BarChart2" },
        { href: "/client/cases", label: "Mis Casos", icon: "Briefcase" },
        { href: "/document-scanner", label: "Documentos", icon: "FileText" },
        { href: "/immigration-assistant", label: "Asistente", icon: "HelpCircle" }
      ];
    default:
      return [
        ...commonLinks,
        { href: "/dashboard", label: "Dashboard", icon: "BarChart2" },
        { href: "/immigration-assistant", label: "Asistente", icon: "HelpCircle" },
        { href: "/document-scanner", label: "Documentos", icon: "FileText" },
        { href: "/login", label: "Iniciar Sesión", icon: "User" }
      ];
  }
}

// Mock de usuario para desarrollo
export function getMockUser(): User {
  return {
    id: 1,
    email: 'ejemplo@nolivoslaw.com',
    name: 'Juan Pérez',
    role: 'client'
  };
}
`;

// Escribir el archivo de usuario cliente
const userClientPath = path.join(libDir, 'user-client.ts');
fs.writeFileSync(userClientPath, userClientCode);
console.log('✅ Creado: lib/user-client.ts');

// Crear un archivo API para obtener datos de usuario
const apiDir = path.join(process.cwd(), 'app', 'api', 'user');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

const userApiCode = `// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Datos mock para desarrollo
const mockUsers = [
  {
    id: 1,
    email: 'admin@nolivoslaw.com',
    name: 'Admin Usuario',
    role: 'admin'
  },
  {
    id: 2,
    email: 'abogado@nolivoslaw.com',
    name: 'Carlos Rodríguez',
    role: 'lawyer'
  },
  {
    id: 3,
    email: 'paralegal@nolivoslaw.com',
    name: 'Maria Gómez',
    role: 'paralegal'
  },
  {
    id: 4,
    email: 'cliente1@example.com',
    name: 'Juan Pérez',
    role: 'client'
  }
];

export async function GET() {
  // En una implementación real, esto verificaría las cookies de autenticación
  // y consultaría la base de datos para obtener el usuario actual
  
  // Por ahora devolvemos un usuario mock
  const user = mockUsers[3]; // Juan Pérez como predeterminado
  
  return NextResponse.json(user);
}
`;

// Escribir el archivo de API de usuario
const userApiPath = path.join(apiDir, 'route.ts');
fs.writeFileSync(userApiPath, userApiCode);
console.log('✅ Creado: app/api/user/route.ts');

// Crear rutas de API para navegación
const navApiDir = path.join(process.cwd(), 'app', 'api', 'navigation');
if (!fs.existsSync(navApiDir)) {
  fs.mkdirSync(navApiDir, { recursive: true });
}

const navApiCode = `// app/api/navigation/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Función para obtener los enlaces de navegación basados en el rol del usuario
function getNavLinks(role: string) {
  const commonLinks = [
    { href: "/", label: "Inicio", icon: "Home" }
  ];

  switch (role) {
    case 'admin':
      return [
        ...commonLinks,
        { href: "/admin/dashboard", label: "Dashboard", icon: "BarChart2" },
        { href: "/admin/clients", label: "Clientes", icon: "Users" },
        { href: "/admin/cases", label: "Casos", icon: "Briefcase" },
        { href: "/admin/settings", label: "Configuración", icon: "Settings" }
      ];
    case 'lawyer':
      return [
        ...commonLinks,
        { href: "/lawyer/dashboard", label: "Dashboard", icon: "BarChart2" },
        { href: "/lawyer/cases", label: "Mis Casos", icon: "Briefcase" },
        { href: "/lawyer/calendar", label: "Calendario", icon: "Calendar" },
        { href: "/immigration-assistant", label: "Asistente", icon: "HelpCircle" }
      ];
    case 'paralegal':
      return [
        ...commonLinks,
        { href: "/paralegal/dashboard", label: "Dashboard", icon: "BarChart2" },
        { href: "/paralegal/documents", label: "Documentos", icon: "FileText" },
        { href: "/paralegal/tasks", label: "Tareas", icon: "CheckSquare" }
      ];
    case 'client':
      return [
        ...commonLinks,
        { href: "/client/dashboard", label: "Dashboard", icon: "BarChart2" },
        { href: "/client/cases", label: "Mis Casos", icon: "Briefcase" },
        { href: "/document-scanner", label: "Documentos", icon: "FileText" },
        { href: "/immigration-assistant", label: "Asistente", icon: "HelpCircle" }
      ];
    default:
      return [
        ...commonLinks,
        { href: "/dashboard", label: "Dashboard", icon: "BarChart2" },
        { href: "/immigration-assistant", label: "Asistente", icon: "HelpCircle" },
        { href: "/document-scanner", label: "Documentos", icon: "FileText" },
        { href: "/login", label: "Iniciar Sesión", icon: "User" }
      ];
  }
}

export async function GET(request: Request) {
  // Obtener el parámetro de rol de la URL
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role') || 'client';
  
  const navLinks = getNavLinks(role);
  
  return NextResponse.json(navLinks);
}
`;

// Escribir el archivo de API de navegación
const navApiPath = path.join(navApiDir, 'route.ts');
fs.writeFileSync(navApiPath, navApiCode);
console.log('✅ Creado: app/api/navigation/route.ts');

// Actualizar el navbar para que use la API en lugar de acceder directamente a la base de datos
const navbarCode = `// components/navbar.tsx
"use client";

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Menu, X, Sun, Moon, User, Home, FileText, Calendar, BarChart2, Users, Briefcase, Settings, HelpCircle, CheckSquare } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NavLink, getNavLinks, getMockUser } from '@/lib/user-client';

// Mapa de íconos por nombre
const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-5 h-5" />,
  BarChart2: <BarChart2 className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  User: <User className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  HelpCircle: <HelpCircle className="w-5 h-5" />,
  CheckSquare: <CheckSquare className="w-5 h-5" />
};

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
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // Función para obtener datos de usuario
    async function fetchUserData() {
      try {
        // Obtener usuario de la API
        const userResponse = await fetch('/api/user');
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserName(userData.name);
          
          // Obtener enlaces de navegación basados en el rol
          const links = getNavLinks(userData.role);
          setNavLinks(links);
        } else {
          // Fallback: usar datos mock
          const mockUser = getMockUser();
          setUserName(mockUser.name);
          setNavLinks(getNavLinks(mockUser.role));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback: usar datos mock
        const mockUser = getMockUser();
        setUserName(mockUser.name);
        setNavLinks(getNavLinks(mockUser.role));
      }
    }

    fetchUserData();
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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
    if (mounted) {
      updateSelector();
      window.addEventListener('resize', updateSelector);
      return () => window.removeEventListener('resize', updateSelector);
    }
  }, [mounted, pathName, navLinks]);

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
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/images/logo-backup.svg';
                }}
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
                      <span className="mr-2">{iconMap[link.icon] || <FileText className="w-5 h-5" />}</span>
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
                  aria-label="Cambiar tema"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </li>
              
              {/* User profile */}
              {userName && (
                <li className="ml-2">
                  <Link 
                    href="/profile" 
                    className="flex items-center px-3 py-2 text-white/80 hover:text-white"
                  >
                    <User className="w-5 h-5 mr-2" />
                    <span className="hidden lg:inline">{userName}</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-md text-white/80 hover:text-white focus:outline-none"
              aria-label="Cambiar tema"
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
              aria-label="Abrir menú"
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
                    <span className="mr-2">{iconMap[link.icon] || <FileText className="w-5 h-5" />}</span>
                    {link.label}
                  </div>
                </Link>
              </li>
            ))}
            
            {/* User profile for mobile */}
            {userName && (
              <li>
                <Link 
                  href="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white/80 hover:text-white hover:bg-[#0d2247]/80"
                  onClick={toggleMenu}
                >
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    {userName}
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}`;

// Escribir el navbar actualizado
const navbarPath = path.join(process.cwd(), 'components', 'navbar.tsx');
fs.writeFileSync(navbarPath, navbarCode);
console.log('✅ Actualizado: components/navbar.tsx');

// Corregir el problema del doble encabezado buscando cualquier importación duplicada de Navbar
const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  let layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Verificar si hay más de una instancia de Navbar en el contenido
  const navbarRegex = /<Navbar\s*\/>/g;
  const navbarMatches = layoutContent.match(navbarRegex);
  
  if (navbarMatches && navbarMatches.length > 1) {
    console.log('⚠️ Encontradas múltiples instancias de Navbar en layout.tsx');
    // Reemplazar todas las instancias y dejar solo una
    layoutContent = layoutContent.replace(navbarRegex, '');
    layoutContent = layoutContent.replace(
      /<body[^>]*>([\s\S]*?)<main/,
      '<body$1<Navbar />\n<main'
    );
    
    fs.writeFileSync(layoutPath, layoutContent);
    console.log('✅ Corregido: múltiples instancias de Navbar en layout.tsx');
  } else {
    console.log('✅ No se encontraron múltiples instancias de Navbar en layout.tsx');
  }
}

// Comprobar si hay alguna otra página que incluya Navbar
function findAndFixNavbarImports(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      // No procesar node_modules o .next
      if (!filePath.includes('node_modules') && !filePath.includes('.next')) {
        findAndFixNavbarImports(filePath);
      }
    } else if ((filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) && 
               !filePath.includes('navbar.tsx') && !filePath.includes('layout.tsx')) {
      // Leer el contenido del archivo
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Verificar si importa o usa Navbar
      if (content.includes('import Navbar') || content.includes('<Navbar')) {
        console.log(`⚠️ Encontrada referencia a Navbar en ${filePath}`);
        
        // Eliminar importación
        let newContent = content.replace(/import\s+Navbar\s+from\s+['"](.*?)['"];?\n?/g, '');
        
        // Eliminar uso de componente
        newContent = newContent.replace(/<Navbar\s*\/>\n?/g, '');
        newContent = newContent.replace(/<Navbar>\s*<\/Navbar>\n?/g, '');
        
        // Guardar el archivo modificado
        fs.writeFileSync(filePath, newContent);
        console.log(`✅ Eliminada referencia a Navbar en ${filePath}`);
      }
    }
  });
}

// Buscar y corregir referencias a Navbar en otras páginas
findAndFixNavbarImports(path.join(process.cwd(), 'app'));
findAndFixNavbarImports(path.join(process.cwd(), 'pages'));

console.log('\n✨ Correcciones completadas. Puedes intentar compilar de nuevo con:');
console.log('npm run build');
