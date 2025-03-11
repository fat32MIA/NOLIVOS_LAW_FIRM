"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Home,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  ChevronDown,
  Bot,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProfessionalHeader } from "@/components/professional-header"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "client" | "lawyer"
  showHeader?: boolean
}

export default function DashboardLayout({ children, userRole, showHeader = false }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const clientNavItems = [
    { name: "Dashboard", href: "/dashboard/client", icon: Home },
    { name: "Documents", href: "/dashboard/client/documents", icon: FileText },
    { name: "Messages", href: "/dashboard/client/messages", icon: MessageSquare },
    { name: "Appointments", href: "/dashboard/client/appointments", icon: Calendar },
    { name: "Legal Assistant", href: "/legal-assistant", icon: Bot },
    { name: "Settings", href: "/dashboard/client/settings", icon: Settings },
  ]

  const lawyerNavItems = [
    { name: "Dashboard", href: "/dashboard/lawyer", icon: Home },
    { name: "Clients", href: "/dashboard/lawyer/clients", icon: Users },
    { name: "Documents", href: "/dashboard/lawyer/documents", icon: FileText },
    { name: "Calendar", href: "/dashboard/lawyer/calendar", icon: Calendar },
    { name: "Messages", href: "/dashboard/lawyer/messages", icon: MessageSquare },
    { name: "Legal Assistant", href: "/legal-assistant", icon: Bot },
    { name: "Legal Document Editor", href: "/legal-document-editor", icon: FileText },
    { name: "Settings", href: "/dashboard/lawyer/settings", icon: Settings },
  ]

  const navItems = userRole === "client" ? clientNavItems : lawyerNavItems

  return (
    <div className="flex min-h-screen bg-background">
      {showHeader && <ProfessionalHeader />}

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
            <Link href="/" className="flex items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-inolpng-YtLwdxbVEOzITNQbc3Gfyiz6KQ7q0b.png"
                alt="Nolivos Law"
                className="h-8"
              />
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
              Logout
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
                <span className="text-muted-foreground">
                  {userRole === "client" ? "Client Dashboard" : "Attorney Dashboard"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden sm:inline-block">
                      {userRole === "client" ? "Maria Garcia" : "Guillermo Nolivos"}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

