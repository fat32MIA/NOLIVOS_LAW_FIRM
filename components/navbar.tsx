"use client";

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
}