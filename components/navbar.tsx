'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme/theme-switcher';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <Image 
                  src="/images/logo.svg" 
                  alt="Nolivos Law" 
                  width={150} 
                  height={40} 
                  priority
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/dashboard" 
                className={`${isActive('/dashboard') 
                  ? 'border-blue-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} 
                  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Dashboard
              </Link>
              <Link 
                href="/client/dashboard" 
                className={`${isActive('/client/dashboard') 
                  ? 'border-blue-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} 
                  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Clientes
              </Link>
              <Link 
                href="/lawyer/dashboard" 
                className={`${isActive('/lawyer/dashboard') 
                  ? 'border-blue-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} 
                  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Abogados
              </Link>
              <Link 
                href="/admin/dashboard" 
                className={`${isActive('/admin/dashboard') 
                  ? 'border-blue-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} 
                  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Administración
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center gap-2">
            <ThemeSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center text-sm">
                  <span className="mr-1">Juan Pérez</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={isOpen ? 'block sm:hidden' : 'hidden sm:hidden'}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/dashboard"
            className={isActive('/dashboard')
              ? 'bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'}
          >
            Dashboard
          </Link>
          <Link
            href="/client/dashboard"
            className={isActive('/client/dashboard')
              ? 'bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'}
          >
            Clientes
          </Link>
          <Link
            href="/lawyer/dashboard"
            className={isActive('/lawyer/dashboard')
              ? 'bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'}
          >
            Abogados
          </Link>
          <Link
            href="/admin/dashboard"
            className={isActive('/admin/dashboard')
              ? 'bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'}
          >
            Administración
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                JP
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">Juan Pérez</div>
              <div className="text-sm font-medium text-gray-500">juan@example.com</div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <a
              href="#"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              Perfil
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              Configuración
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              Cerrar sesión
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}