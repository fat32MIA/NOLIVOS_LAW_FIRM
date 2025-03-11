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
  Clock,
  ChevronRight,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Clock3,
  Bot,
} from "lucide-react"
import AdminLayout from "@/components/admin/admin-layout"

// Datos de ejemplo
const recentDocuments = [
  {
    id: 1,
    title: "Formulario I-485",
    client: "Maria Garcia",
    status: "completed",
    date: "2023-12-18",
  },
  {
    id: 2,
    title: "Declaración Jurada",
    client: "Juan Rodriguez",
    status: "pending",
    date: "2023-12-17",
  },
  {
    id: 3,
    title: "Carta de Invitación",
    client: "Carlos Mendez",
    status: "in-progress",
    date: "2023-12-15",
  },
  {
    id: 4,
    title: "Formulario I-130",
    client: "Ana Sofia Perez",
    status: "completed",
    date: "2023-12-14",
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
    type: "Revisión de Documentos",
  },
  {
    id: 3,
    client: "Ana Sofia Perez",
    date: "2023-12-22",
    time: "11:15 AM",
    type: "Seguimiento",
  },
]

const tasks = [
  {
    id: 1,
    title: "Revisar documentos de Maria Garcia",
    priority: "high",
    dueDate: "2023-12-19",
  },
  {
    id: 2,
    title: "Preparar formularios para Juan Rodriguez",
    priority: "medium",
    dueDate: "2023-12-20",
  },
  {
    id: 3,
    title: "Llamar a Carlos Mendez para actualización",
    priority: "low",
    dueDate: "2023-12-21",
  },
  {
    id: 4,
    title: "Enviar correo de seguimiento a Ana Sofia Perez",
    priority: "medium",
    dueDate: "2023-12-19",
  },
]

export default function ParalegalDashboardPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard de Paralegal</h1>
          <p className="text-muted-foreground">Bienvenido al panel de control para paralegales de Nolivos Law</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documentos Pendientes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 desde ayer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">+3 desde la semana pasada</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Programadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Para los próximos 7 días</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">5 de alta prioridad</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Documentos Recientes</CardTitle>
              <CardDescription>Últimos documentos trabajados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">Cliente: {doc.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          doc.status === "completed"
                            ? "default"
                            : doc.status === "in-progress"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {doc.status === "completed"
                          ? "Completado"
                          : doc.status === "in-progress"
                            ? "En Progreso"
                            : "Pendiente"}
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
                <Link href="/paralegal/documents">Ver todos los documentos</Link>
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
                <Link href="/paralegal/calendar">Ver calendario completo</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Tareas Pendientes</CardTitle>
              <CardDescription>Tareas asignadas y pendientes de completar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      {task.priority === "high" ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      ) : task.priority === "medium" ? (
                        <Clock3 className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Vence: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja"}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/paralegal/tasks">Ver todas las tareas</Link>
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
                  <Link href="/paralegal/clients">
                    <Users className="mr-2 h-4 w-4" />
                    Gestión de Clientes
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/paralegal/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Mensajes
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/paralegal/calendar">
                    <Calendar className="mr-2 h-4 w-4" />
                    Calendario
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          <ApiKeySettings userRole="paralegal" />
        </div>
      </div>
    </AdminLayout>
  )
}

