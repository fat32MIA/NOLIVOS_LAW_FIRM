// app/api/navigation/route.ts
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
