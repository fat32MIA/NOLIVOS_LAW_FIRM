// lib/user-service.ts
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
}