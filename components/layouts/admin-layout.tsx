"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Calendar,
  Bot,
  Key,
  Globe,
} from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Determinar el rol basado en la URL
  const role = pathname.includes("/admin")
    ? "admin"
    : pathname.includes("/lawyer")
      ? "lawyer"
      : pathname.includes("/paralegal")
        ? "paralegal"
        : "client"

  // Configurar los enlaces de navegación según el rol
  const navLinks = [
    {
      title: "Dashboard",
      href: `/${role}/dashboard`,
      icon: LayoutDashboard,
      roles: ["admin", "lawyer", "paralegal", "client"],
    },
    {
      title: "Clientes",
      href: `/${role}/clients`,
      icon: Users,
      roles: ["admin", "lawyer", "paralegal"],
    },
    {
      title: "Documentos",
      href: `/${role}/documents`,
      icon: FileText,
      roles: ["admin", "lawyer", "paralegal", "client"],
    },
    {
      title: "Mensajes",
      href: `/${role}/messages`,
      icon: MessageSquare,
      roles: ["admin", "lawyer", "paralegal", "client"],
    },
    {
      title: "Calendario",
      href: `/${role}/calendar`,
      icon: Calendar,
      roles: ["admin", "lawyer", "paralegal", "client"],
    },
    {
      title: "Asistente Legal",
      href: "/legal-assistant",
      icon: Bot,
      roles: ["admin", "lawyer", "paralegal", "client"],
    },
    {
      title: "Asistente de Inmigración",
      href: "/immigration-assistant",
      icon: Globe,
      roles: ["admin", "lawyer", "paralegal", "client"],
    },
    {
      title: "Configuración API",
      href: "/admin/api-settings",
      icon: Key,
      roles: ["admin"],
    },
    {
      title: "Configuración",
      href: `/${role}/settings`,
      icon: Settings,
      roles: ["admin", "lawyer", "paralegal", "client"],
    },
  ]

  // Filtrar enlaces según el rol
  const filteredNavLinks = navLinks.filter((link) => link.roles.includes(role))

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar para escritorio */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold">Nolivos Law</h1>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {filteredNavLinks.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        isActive ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    />
                    {item.title}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Button variant="outline" className="w-full flex items-center" asChild>
              <Link href="/auth/logout">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Sidebar móvil */}
      <div className="md:hidden">
        <div className="fixed inset-0 flex z-40">
          <div
            className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-in-out duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div
            className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white transition ease-in-out duration-300 transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Cerrar sidebar</span>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold">Nolivos Law</h1>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                {filteredNavLinks.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                        isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon
                        className={`mr-4 flex-shrink-0 h-6 w-6 ${
                          isActive ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      {item.title}
                    </Link>
                  )
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <Button variant="outline" className="w-full flex items-center" asChild>
                <Link href="/auth/logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-lg font-semibold">
                {role === "admin"
                  ? "Panel de Administración"
                  : role === "lawyer"
                    ? "Panel de Abogado"
                    : role === "paralegal"
                      ? "Panel de Paralegal"
                      : "Portal de Cliente"}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Aquí puedes agregar notificaciones, perfil, etc. */}
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}


