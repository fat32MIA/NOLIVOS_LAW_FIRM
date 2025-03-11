"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ApiKeySettings from '../../../components/admin/api-key-settings'
import {
  FileText,
  Users,
  Calendar,
  ChevronRight,
  MessageSquare,
  Bot,
  DollarSign,
  BarChart,
  Briefcase,
} from "lucide-react"
import AdminLayout from "@/components/admin/admin-layout"

// Datos de ejemplo
const recentClients = [
  {
    id: 1,
    name: "Maria Garcia",
    caseType: "Naturalización",
    status: "active",
    lastContact: "2023-12-18",
  },
  {
    id: 2,
    name: "Juan Rodriguez",
    caseType: "Visa de Trabajo",
    status: "pending",
    lastContact: "2023-12-17",
  },
  {
    id: 3,
    name: "Carlos Mendez",
    caseType: "Asilo",
    status: "active",
    lastContact: "2023-12-15",
  },
  {
    id: 4,
    name: "Ana Sofia Perez",
    caseType: "Residencia Permanente",
    status: "active",
    lastContact: "2023-12-14",
  },
]

const upcomingAppointments = [
  {
    id: 1,
    client: "Maria Garcia",
    date: "2023-12-20",
    time: "10:00 AM",
    type: "Consulta",
  },
  {
    id: 2,
    client: "Roberto Sanchez",
    date: "2023-12-21",
    time: "2:30 PM",
    type: "Revisión de Caso",
  },
  {
    id: 3,
    client: "Ana Sofia Perez",
    date: "2023-12-22",
    time: "11:15 AM",
    type: "Audiencia",
  },
]

const pendingCases = [
  {
    id: 1,
    client: "Maria Garcia",
    caseType: "Naturalización",
    nextDeadline: "2023-12-25",
    status: "En Progreso",
  },
  {
    id: 2,
    client: "Juan Rodriguez",
    caseType: "Visa de Trabajo",
    nextDeadline: "2023-12-30",
    status: "Pendiente de Documentos",
  },
  {
    id: 3,
    client: "Carlos Mendez",
    caseType: "Asilo",
    nextDeadline: "2024-01-15",
    status: "Audiencia Programada",
  },
  {
    id: 4,
    client: "Ana Sofia Perez",
    caseType: "Residencia Permanente",
    nextDeadline: "2024-01-05",
    status: "En Revisión",
  },
]

export default function LawyerDashboardPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard de Abogado</h1>
          <p className="text-muted-foreground">Bienvenido al panel de control para abogados de Nolivos Law</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Casos Activos</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Totales</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">+5 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Pendientes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Para los próximos 14 días</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,240</div>
              <p className="text-xs text-muted-foreground">+12% respecto al mes anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Casos Pendientes</CardTitle>
              <CardDescription>Casos activos con próximas fechas límite</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingCases.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{caseItem.client}</p>
                        <p className="text-xs text-muted-foreground">
                          {caseItem.caseType} - {caseItem.status}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Próxima fecha: {new Date(caseItem.nextDeadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="#">
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/lawyer/cases">Ver todos los casos</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Próximas Citas</CardTitle>
              <CardDescription>Citas programadas para los próximos días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{appointment.client}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString()} - {appointment.time}
                        </p>
                        <p className="text-xs text-muted-foreground">{appointment.type}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="#">
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/lawyer/calendar">Ver calendario completo</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Clientes Recientes</CardTitle>
              <CardDescription>Últimos clientes atendidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.caseType}</p>
                        <p className="text-xs text-muted-foreground">
                          Último contacto: {new Date(client.lastContact).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          client.status === "active" ? "default" : client.status === "pending" ? "outline" : "secondary"
                        }
                      >
                        {client.status === "active" ? "Activo" : client.status === "pending" ? "Pendiente" : "Inactivo"}
                      </Badge>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href="#">
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/lawyer/clients">Ver todos los clientes</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accesos Rápidos</CardTitle>
              <CardDescription>Herramientas y recursos frecuentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/legal-assistant">
                    <Bot className="mr-2 h-4 w-4" />
                    Asistente Legal
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/legal-document-editor">
                    <FileText className="mr-2 h-4 w-4" />
                    Editor de Documentos
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/lawyer/clients">
                    <Users className="mr-2 h-4 w-4" />
                    Gestión de Clientes
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/lawyer/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Mensajes
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/lawyer/calendar">
                    <Calendar className="mr-2 h-4 w-4" />
                    Calendario
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/lawyer/billing">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Facturación
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/lawyer/stats">
                    <BarChart className="mr-2 h-4 w-4" />
                    Estadísticas
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          <ApiKeySettings userRole="lawyer" />
        </div>
      </div>
    </AdminLayout>
  )
}


