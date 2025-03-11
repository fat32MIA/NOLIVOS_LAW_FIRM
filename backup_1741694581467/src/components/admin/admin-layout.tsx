// src/components/admin/admin-layout.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Database, Settings, Server, Users, Shield, LogOut, Menu, X, BarChart3 } from 'lucide-react'
import { ThemeToggle } from "@/components/theme-toggle"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Base de Datos", href: "/admin/database", icon: Database },
    { name: "Redis", href: "/admin/redis", icon: Server },
    { name: "Usuarios", href: "/admin/users", icon: Users },
    { name: "Seguridad", href: "/admin/security", icon: Shield },
    { name: "Estadísticas", href: "/admin/stats", icon: BarChart3 },
    { name: "Configuración", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1 rounded">
                <Shield className="h-5 w-5" />
              </div>
              <span className="font-semibold">Admin Panel</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto py-4 px-3">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="p-4 border-t">
            <Button variant="outline" className="w-full justify-start gap-2" size="sm">
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background border-b h-16">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="text-sm breadcrumbs hidden sm:block">
                <span className="text-muted-foreground">Panel de Administración</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
