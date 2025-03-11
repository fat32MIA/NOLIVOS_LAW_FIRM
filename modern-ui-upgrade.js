const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Rutas principales
const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

// Asegurarse de que los directorios existen
function ensureDirectories() {
  const dirs = [
    path.join(APP_DIR, 'login'),
    path.join(APP_DIR, 'dashboard'),
    path.join(COMPONENTS_DIR, 'dashboard'),
    path.join(PUBLIC_DIR, 'images'),
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Creado directorio: ${path.relative(ROOT_DIR, dir)}`);
    }
  }
}

// Crear imágenes necesarias
function createImages() {
  // Logo
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
  <style>
    .text { font: bold 24px sans-serif; fill: #1a56db; }
    .subtext { font: 12px sans-serif; fill: #4b5563; }
  </style>
  <rect width="200" height="50" fill="none"/>
  <text x="10" y="30" class="text">NOLIVOS LAW</text>
  <text x="10" y="45" class="subtext">SERVICIOS LEGALES</text>
</svg>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'images', 'logo.svg'), logoSvg);
  console.log('✅ Creada imagen: logo.svg');
}

// Crear componentes modernos
function createModernComponents() {
  // Navbar moderno
  const navbarPath = path.join(COMPONENTS_DIR, 'navbar.tsx');
  const navbarContent = `'use client';

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
                className={\`\${isActive('/dashboard') 
                  ? 'border-blue-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} 
                  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium\`}
              >
                Dashboard
              </Link>
              <Link 
                href="/client/dashboard" 
                className={\`\${isActive('/client/dashboard') 
                  ? 'border-blue-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} 
                  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium\`}
              >
                Clientes
              </Link>
              <Link 
                href="/lawyer/dashboard" 
                className={\`\${isActive('/lawyer/dashboard') 
                  ? 'border-blue-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} 
                  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium\`}
              >
                Abogados
              </Link>
              <Link 
                href="/admin/dashboard" 
                className={\`\${isActive('/admin/dashboard') 
                  ? 'border-blue-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} 
                  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium\`}
              >
                Administración
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
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
}`;

  fs.writeFileSync(navbarPath, navbarContent);
  console.log('✅ Creado componente: navbar.tsx');

  // Footer moderno
  const footerPath = path.join(COMPONENTS_DIR, 'footer.tsx');
  const footerContent = `export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Nolivos Law Firm. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Términos
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Privacidad
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}`;

  fs.writeFileSync(footerPath, footerContent);
  console.log('✅ Creado componente: footer.tsx');

  // Dashboard Stats
  const dashboardStatsPath = path.join(COMPONENTS_DIR, 'dashboard', 'stats.tsx');
  const dashboardStatsContent = `'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, FileText, Clock } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-blue-100 p-1.5 text-blue-600">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <span className={trend.positive ? "text-green-600" : "text-red-600"}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
            <span className="text-xs text-gray-500 ml-1">desde el mes pasado</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Clientes Totales"
        value="128"
        description="Clientes activos en el sistema"
        icon={<Users className="h-5 w-5" />}
        trend={{ value: "12%", positive: true }}
      />
      <StatsCard
        title="Casos Activos"
        value="42"
        description="Casos en proceso actualmente"
        icon={<Briefcase className="h-5 w-5" />}
        trend={{ value: "8%", positive: true }}
      />
      <StatsCard
        title="Documentos"
        value="284"
        description="Documentos procesados"
        icon={<FileText className="h-5 w-5" />}
        trend={{ value: "24%", positive: true }}
      />
      <StatsCard
        title="Tiempo Promedio"
        value="18 días"
        description="Tiempo promedio de resolución"
        icon={<Clock className="h-5 w-5" />}
        trend={{ value: "5%", positive: false }}
      />
    </div>
  );
}`;

  fs.writeFileSync(dashboardStatsPath, dashboardStatsContent);
  console.log('✅ Creado componente: dashboard/stats.tsx');

  // Dashboard Recent Activity
  const recentActivityPath = path.join(COMPONENTS_DIR, 'dashboard', 'recent-activity.tsx');
  const recentActivityContent = `'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  target: string;
  date: string;
  status?: "completed" | "pending" | "in-progress";
}

const recentActivities: Activity[] = [
  {
    id: "1",
    user: {
      name: "María López",
      initials: "ML",
    },
    action: "actualizó el caso",
    target: "Visa de trabajo H-1B",
    date: "Hace 5 minutos",
    status: "in-progress",
  },
  {
    id: "2",
    user: {
      name: "Carlos Rodríguez",
      initials: "CR",
    },
    action: "subió un documento a",
    target: "Naturalización",
    date: "Hace 1 hora",
    status: "completed",
  },
  {
    id: "3",
    user: {
      name: "Ana Martínez",
      initials: "AM",
    },
    action: "creó un nuevo caso",
    target: "Asilo político",
    date: "Hace 3 horas",
    status: "pending",
  },
  {
    id: "4",
    user: {
      name: "Juan Pérez",
      initials: "JP",
    },
    action: "comentó en",
    target: "Renovación de Green Card",
    date: "Hace 5 horas",
  },
  {
    id: "5",
    user: {
      name: "Laura Sánchez",
      initials: "LS",
    },
    action: "programó una cita para",
    target: "Consulta inicial",
    date: "Ayer",
  },
];

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>
          Las últimas acciones realizadas en el sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <Avatar className="h-9 w-9">
                {activity.user.avatar && (
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                )}
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-3 space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user.name}</span>{" "}
                  {activity.action}{" "}
                  <span className="font-semibold">{activity.target}</span>
                  {activity.status && (
                    <Badge
                      className="ml-2"
                      variant={
                        activity.status === "completed"
                          ? "success"
                          : activity.status === "in-progress"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {activity.status === "completed"
                        ? "Completado"
                        : activity.status === "in-progress"
                        ? "En progreso"
                        : "Pendiente"}
                    </Badge>
                  )}
                </p>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}`;

  fs.writeFileSync(recentActivityPath, recentActivityContent);
  console.log('✅ Creado componente: dashboard/recent-activity.tsx');

  // Dashboard Chart
  const chartPath = path.join(COMPONENTS_DIR, 'dashboard', 'chart.tsx');
  const chartContent = `'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis de Casos</CardTitle>
        <CardDescription>
          Distribución de casos por tipo y estado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="monthly">Mensual</TabsTrigger>
              <TabsTrigger value="quarterly">Trimestral</TabsTrigger>
              <TabsTrigger value="yearly">Anual</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="monthly" className="space-y-4">
            <div className="h-[300px] w-full flex items-end justify-between px-2">
              {/* Simulación de gráfico de barras */}
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '120px' }}></div>
                <span className="text-xs mt-2">Ene</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '150px' }}></div>
                <span className="text-xs mt-2">Feb</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '100px' }}></div>
                <span className="text-xs mt-2">Mar</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '200px' }}></div>
                <span className="text-xs mt-2">Abr</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '180px' }}></div>
                <span className="text-xs mt-2">May</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '220px' }}></div>
                <span className="text-xs mt-2">Jun</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                <span>Casos nuevos</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="quarterly" className="space-y-4">
            <div className="h-[300px] w-full flex items-end justify-around px-2">
              {/* Simulación de gráfico de barras trimestral */}
              <div className="flex flex-col items-center">
                <div className="w-16 bg-blue-500 rounded-t-md" style={{ height: '150px' }}></div>
                <span className="text-xs mt-2">Q1</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 bg-blue-500 rounded-t-md" style={{ height: '220px' }}></div>
                <span className="text-xs mt-2">Q2</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 bg-blue-500 rounded-t-md" style={{ height: '180px' }}></div>
                <span className="text-xs mt-2">Q3</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 bg-blue-500 rounded-t-md" style={{ height: '200px' }}></div>
                <span className="text-xs mt-2">Q4</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                <span>Casos nuevos</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="yearly" className="space-y-4">
            <div className="h-[300px] w-full flex items-end justify-around px-2">
              {/* Simulación de gráfico de barras anual */}
              <div className="flex flex-col items-center">
                <div className="w-20 bg-blue-500 rounded-t-md" style={{ height: '150px' }}></div>
                <span className="text-xs mt-2">2021</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 bg-blue-500 rounded-t-md" style={{ height: '180px' }}></div>
                <span className="text-xs mt-2">2022</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 bg-blue-500 rounded-t-md" style={{ height: '220px' }}></div>
                <span className="text-xs mt-2">2023</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                <span>Casos nuevos</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}`;

  fs.writeFileSync(chartPath, chartContent);
  console.log('✅ Creado componente: dashboard/chart.tsx');
}

// Crear páginas modernas
function createModernPages() {
  // Layout principal moderno
  const layoutPath = path.join(APP_DIR, 'layout.tsx');
  const layoutContent = `import './globals.css';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nolivos Law Firm',
  description: 'Servicios legales de inmigración',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className + " min-h-screen flex flex-col"} suppressHydrationWarning>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}`;

  fs.writeFileSync(layoutPath, layoutContent);
  console.log('✅ Actualizado layout principal');

  // Página de inicio moderna
  const homePage = path.join(APP_DIR, 'page.tsx');
  const homePageContent = `'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Shield, Globe, Scale, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Image 
                src="/images/logo.svg" 
                alt="Nolivos Law" 
                width={200} 
                height={50} 
                priority
                className="mb-6"
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Servicios Legales de Inmigración
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Soluciones legales personalizadas para todos tus trámites migratorios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                    Ver Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Consulta Rápida</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="tu@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={3} placeholder="¿Cómo podemos ayudarte?"></textarea>
                  </div>
                  <Button className="w-full">Enviar Consulta</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Nuestros Servicios</h2>
            <p className="mt-4 text-xl text-gray-600">Soluciones legales para todas tus necesidades migratorias</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <CardTitle>Visas y Permisos</CardTitle>
                <CardDescription>Asesoría en todo tipo de visas y permisos de trabajo</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Ofrecemos asesoría completa para visas de trabajo, turismo, estudios y reunificación familiar.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Más Información <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle>Asilo y Refugio</CardTitle>
                <CardDescription>Protección para personas en situación vulnerable</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Ayudamos a personas que buscan protección por persecución o temor fundado en sus países de origen.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Más Información <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <Scale className="h-6 w-6" />
                </div>
                <CardTitle>Naturalización</CardTitle>
                <CardDescription>Proceso de ciudadanía y residencia permanente</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Guiamos a nuestros clientes en todo el proceso para obtener la ciudadanía o residencia permanente.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Más Información <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Nuestro equipo de abogados especializados está listo para ayudarte con tu caso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-600">
                Ver Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image 
                src="/images/logo.svg" 
                alt="Nolivos Law" 
                width={150} 
                height={40} 
                className="mb-4"
              />
              <p className="text-gray-400">
                Servicios legales de inmigración profesionales y personalizados.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Visas</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Asilo</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Naturalización</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Defensa Migratoria</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Sobre Nosotros</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Equipo</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Testimonios</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <address className="not-italic text-gray-400">
                <p>123 Calle Principal</p>
                <p>Ciudad, Estado 12345</p>
                <p className="mt-2">info@nolivoslaw.com</p>
                <p>(123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Nolivos Law Firm. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">Términos</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacidad</a>
              <a href="#" className="text-gray-400 hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}`;

  fs.writeFileSync(homePage, homePageContent);
  console.log('✅ Actualizada página principal');

  // Página de login
  const loginDir = path.join(APP_DIR, 'login');
  if (!fs.existsSync(loginDir)) {
    fs.mkdirSync(loginDir, { recursive: true });
  }
  
  const loginPath = path.join(loginDir, 'page.tsx');
  const loginContent = `'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de login
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-8">
        <Link href="/">
          <Image 
            src="/images/logo.svg" 
            alt="Nolivos Law" 
            width={200} 
            height={50} 
            priority
          />
        </Link>
      </div>
      
      <Card className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle>Iniciar Sesión</CardTitle>
                <CardDescription>
                  Ingresa tus credenciales para acceder a tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link href="#" className="text-sm text-blue-600 hover:text-blue-800">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Recordarme
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <CardHeader>
              <CardTitle>Crear Cuenta</CardTitle>
              <CardDescription>
                Regístrate para acceder a nuestros servicios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Nombre</Label>
                  <Input id="first-name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Apellido</Label>
                  <Input id="last-name" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm font-normal">
                  Acepto los{" "}
                  <Link href="#" className="text-blue-600 hover:text-blue-800">
                    términos y condiciones
                  </Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Registrarse</Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
      
      <p className="mt-6 text-center text-sm text-gray-600">
        ¿Necesitas ayuda?{" "}
        <Link href="#" className="text-blue-600 hover:text-blue-800">
          Contáctanos
        </Link>
      </p>
    </div>
  );
}`;

  fs.writeFileSync(loginPath, loginContent);
  console.log('✅ Creada página de login');

  // Dashboard moderno
  const dashboardDir = path.join(APP_DIR, 'dashboard');
  if (!fs.existsSync(dashboardDir)) {
    fs.mkdirSync(dashboardDir, { recursive: true });
  }
  
  const dashboardPath = path.join(dashboardDir, 'page.tsx');
  const dashboardContent = `'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import DashboardStats from '@/components/dashboard/stats';
import RecentActivity from '@/components/dashboard/recent-activity';
import DashboardChart from '@/components/dashboard/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Users, Calendar, Bell } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-500">Bienvenido de nuevo, Juan Pérez</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendario</span>
              </Button>
              <Button className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>Nuevo Caso</span>
              </Button>
            </div>
          </div>
          
          <DashboardStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <DashboardChart />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
          
          <div className="mt-8">
            <Tabs defaultValue="cases">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="cases">Casos</TabsTrigger>
                  <TabsTrigger value="clients">Clientes</TabsTrigger>
                  <TabsTrigger value="documents">Documentos</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  Ver todos
                </Button>
              </div>
              
              <TabsContent value="cases">
                <Card>
                  <CardHeader>
                    <CardTitle>Casos Recientes</CardTitle>
                    <CardDescription>
                      Los últimos casos en los que has trabajado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Visa de trabajo H-1B</h4>
                              <p className="text-sm text-gray-500">Actualizado hace 3 días</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Ver detalles</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="clients">
                <Card>
                  <CardHeader>
                    <CardTitle>Clientes Recientes</CardTitle>
                    <CardDescription>
                      Los últimos clientes con los que has trabajado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-4">
                              <Users className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">María López</h4>
                              <p className="text-sm text-gray-500">Cliente desde Enero 2023</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Ver perfil</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentos Recientes</CardTitle>
                    <CardDescription>
                      Los últimos documentos que has procesado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Formulario I-485</h4>
                              <p className="text-sm text-gray-500">Subido hace 2 días</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Descargar</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}`;

  fs.writeFileSync(dashboardPath, dashboardContent);
  console.log('✅ Creada página de dashboard');

  // Layout para dashboard
  const dashboardLayoutPath = path.join(dashboardDir, 'layout.tsx');
  const dashboardLayoutContent = `import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}`;

  fs.writeFileSync(dashboardLayoutPath, dashboardLayoutContent);
  console.log('✅ Creado layout para dashboard');
}

// Actualizar package.json para añadir dependencias necesarias
function updatePackageJson() {
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Añadir dependencias necesarias
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies["next"] = "^15.2.1";
    packageJson.dependencies["react"] = "^18.2.0";
    packageJson.dependencies["react-dom"] = "^18.2.0";
    packageJson.dependencies["lucide-react"] = "^0.294.0";
    packageJson.dependencies["next-themes"] = "^0.2.1";
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Actualizado package.json con dependencias necesarias');
  }
}

// Función para instalar dependencias
function installDependencies() {
  try {
    console.log('📦 Instalando dependencias...');
    execSync('npm install', { cwd: ROOT_DIR, stdio: 'inherit' });
    console.log('✅ Dependencias instaladas correctamente');
  } catch (error) {
    console.error('❌ Error al instalar dependencias:', error);
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando mejora de UI moderna...');
  
  // 1. Asegurarse de que los directorios existen
  ensureDirectories();
  
  // 2. Crear imágenes necesarias
  createImages();
  
  // 3. Crear componentes modernos
  createModernComponents();
  
  // 4. Crear páginas modernas
  createModernPages();
  
  // 5. Actualizar package.json
  updatePackageJson();
  
  // 6. Instalar dependencias
  installDependencies();
  
  console.log('');
  console.log('✅ UI moderna creada correctamente');
  console.log('');
  console.log('📋 Resumen de acciones:');
  console.log('1. Se han creado los directorios necesarios');
  console.log('2. Se han creado las imágenes necesarias');
  console.log('3. Se han creado componentes modernos (navbar, footer, dashboard)');
  console.log('4. Se han creado páginas modernas (home, login, dashboard)');
  console.log('5. Se ha actualizado package.json con las dependencias necesarias');
  console.log('6. Se han instalado las dependencias');
  console.log('');
  console.log('🏁 Ahora ejecuta:');
  console.log('   npm run dev');
  console.log('');
  console.log('Puedes acceder a las siguientes rutas:');
  console.log('- / (Página principal)');
  console.log('- /login (Página de inicio de sesión)');
  console.log('- /dashboard (Dashboard principal)');
  console.log('- /admin/dashboard (Dashboard de administrador)');
  console.log('- /lawyer/dashboard (Dashboard de abogado)');
  console.log('- /client/dashboard (Dashboard de cliente)');
}

main().catch(err => {
  console.error('❌ Error en el script:', err);
  process.exit(1);
});
