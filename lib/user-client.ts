// lib/user-client.ts
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
