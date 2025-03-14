// components/navbar.tsx
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
        top: `${activeItem.offsetTop}px`,
        left: `${activeItem.offsetLeft}px`,
        height: `${rect.height}px`,
        width: `${rect.width}px`,
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
                    className={`relative ${isActive ? 'text-[#0d2247]' : 'text-white/80 hover:text-white'}`}
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
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathName === link.href 
                      ? 'bg-white text-[#0d2247]' 
                      : 'text-white/80 hover:text-white hover:bg-[#0d2247]/80'
                  }`}
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
}