// enhance-navbar.js
const fs = require('fs');
const path = require('path');

console.log('🔧 Mejorando barra de navegación con integración de base de datos...');

// Contenido para el archivo de servicio de usuario
const userServiceContent = `// lib/user-service.ts
import { DbService } from './db-service';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'lawyer' | 'paralegal' | 'client';
}

export class UserService {
  private db: DbService;

  constructor() {
    this.db = DbService.getInstance();
  }

  // Obtener usuario actual (mock para cliente)
  public getCurrentUser(): User | null {
    // En producción, esto se conectaría con la autenticación
    return {
      id: 1,
      email: 'ejemplo@nolivoslaw.com',
      name: 'Juan Pérez',
      role: 'client'
    };
  }

  // Obtener usuario por ID
  public getUserById(id: number): User | null {
    return this.db.queryOne<User>(
      'SELECT id, email, name, role FROM users WHERE id = ?',
      [id]
    );
  }

  // Obtener menú de navegación según el rol del usuario
  public getNavMenuByRole(role: string): { href: string; label: string; icon: string }[] {
    const commonMenu = [
      { href: "/", label: "Inicio", icon: "Home" }
    ];

    switch(role) {
      case 'admin':
        return [
          ...commonMenu,
          { href: "/admin/dashboard", label: "Dashboard", icon: "BarChart2" },
          { href: "/admin/clients", label: "Clientes", icon: "Users" },
          { href: "/admin/cases", label: "Casos", icon: "Briefcase" },
          { href: "/admin/settings", label: "Configuración", icon: "Settings" }
        ];
      case 'lawyer':
        return [
          ...commonMenu,
          { href: "/lawyer/dashboard", label: "Dashboard", icon: "BarChart2" },
          { href: "/lawyer/cases", label: "Mis Casos", icon: "Briefcase" },
          { href: "/lawyer/calendar", label: "Calendario", icon: "Calendar" },
          { href: "/immigration-assistant", label: "Asistente", icon: "HelpCircle" }
        ];
      case 'paralegal':
        return [
          ...commonMenu,
          { href: "/paralegal/dashboard", label: "Dashboard", icon: "BarChart2" },
          { href: "/paralegal/documents", label: "Documentos", icon: "FileText" },
          { href: "/paralegal/tasks", label: "Tareas", icon: "CheckSquare" }
        ];
      case 'client':
        return [
          ...commonMenu,
          { href: "/client/dashboard", label: "Dashboard", icon: "BarChart2" },
          { href: "/client/cases", label: "Mis Casos", icon: "Briefcase" },
          { href: "/document-scanner", label: "Documentos", icon: "FileText" },
          { href: "/immigration-assistant", label: "Asistente", icon: "HelpCircle" }
        ];
      default:
        return commonMenu;
    }
  }
}`;

// Asegurarse de que el directorio lib existe
const libDir = path.join(process.cwd(), 'lib');
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// Guardar el archivo de servicio de usuario
fs.writeFileSync(path.join(libDir, 'user-service.ts'), userServiceContent);
console.log('✅ Creado servicio de usuario en lib/user-service.ts');

// Actualizar el archivo de navbar para usar el servicio de usuario
const navbarContent = `// components/navbar.tsx
"use client";

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Menu, X, Sun, Moon, User, Home, FileText, Calendar, BarChart2, Users, Briefcase, Settings, HelpCircle, CheckSquare } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserService } from '@/lib/user-service';

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
  const [navLinks, setNavLinks] = useState<{href: string; label: string; icon: string}[]>([]);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    try {
      // Intentar obtener los enlaces de navegación basados en el rol del usuario
      const userService = new UserService();
      const currentUser = userService.getCurrentUser();
      
      if (currentUser) {
        setUserName(currentUser.name);
        const menuItems = userService.getNavMenuByRole(currentUser.role);
        setNavLinks(menuItems);
      } else {
        // Enlaces por defecto si no hay usuario
        setNavLinks([
          { href: "/", label: "Inicio", icon: "Home" },
          { href: "/dashboard", label: "Dashboard", icon: "BarChart2" },
          { href: "/immigration-assistant", label: "Asistente", icon: "HelpCircle" },
          { href: "/document-scanner", label: "Documentos", icon: "FileText" },
          { href: "/login", label: "Iniciar Sesión", icon: "User" }
        ]);
      }
    } catch (error) {
      console.error("Error cargando navegación:", error);
      // Enlaces por defecto en caso de error
      setNavLinks([
        { href: "/", label: "Inicio", icon: "Home" },
        { href: "/dashboard", label: "Dashboard", icon: "BarChart2" },
        { href: "/immigration-assistant", label: "Asistente", icon: "FileText" },
        { href: "/document-scanner", label: "Documentos", icon: "FileText" },
        { href: "/login", label: "Iniciar Sesión", icon: "User" }
      ]);
    }
    
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

// Guardar el archivo de navbar actualizado
fs.writeFileSync(path.join(process.cwd(), 'components', 'navbar.tsx'), navbarContent);
console.log('✅ Actualizado components/navbar.tsx para usar datos de usuario');

console.log('✨ Integración de base de datos con navegación completada');
