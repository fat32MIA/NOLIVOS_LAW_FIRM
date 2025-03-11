"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Calendar,
  ChevronRight,
  MessageSquare,
  Clock,
  DollarSign,
  FileCheck,
  Bot,
  Newspaper,
} from "lucide-react"
import AdminLayout from "@/components/admin/admin-layout"

// Datos de ejemplo
const myDocuments = [
  {
    id: 1,
    title: "Formulario I-485",
    status: "completed",
    date: "2023-12-10",
  },
  {
    id: 2,
    title: "Declaración Jurada",
    status: "in-progress",
    date: "2023-12-15",
  },
  {
    id: 3,
    title: "Carta de Invitación",
    status: "pending",
    date: "2023-12-18",
  },
]

const upcomingAppointments = [
  {
    id: 1,
    lawyer: "Guillermo Nolivos",
    date: "2023-12-20",
    time: "10:00 AM",
    type: "Consulta",
  },
  {
    id: 2,
    lawyer: "Ana Martinez",
    date: "2023-12-28",
    time: "2:30 PM",
    type: "Revisión de Documentos",
  },
]

const caseUpdates = [
  {
    id: 1,
    title: "Documentos recibidos por USCIS",
    date: "2023-12-15",
    description: "Sus documentos han sido recibidos y están siendo procesados.",
  },
  {
    id: 2,
    title: "Cita biométrica programada",
    date: "2023-12-10",
    description: "Se ha programado su cita para toma de datos biométricos.",
  },
  {
    id: 3,
    title: "Solicitud de evidencia adicional",
    date: "2023-12-05",
    description: "USCIS ha solicitado documentación adicional para su caso.",
  },
]

export default function ClientDashboardPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mi Portal de Cliente</h1>
          <p className="text-muted-foreground">Bienvenido a su portal personal de Nolivos Law</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estado de mi Caso</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-500">En Progreso</div>
              <p className="text-xs text-muted-foreground">Última actualización: 15 de diciembre, 2023</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próxima Cita</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">20 de diciembre, 2023</div>
              <p className="text-xs text-muted-foreground">10:00 AM - Consulta con Guillermo Nolivos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documentos Pendientes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">2</div>
              <p className="text-xs text-muted-foreground">Requieren su atención</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensajes No Leídos</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">3</div>
              <p className="text-xs text-muted-foreground">Desde su último inicio de sesión</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Actualizaciones de mi Caso</CardTitle>
              <CardDescription>Últimas actualizaciones sobre su proceso migratorio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseUpdates.map((update) => (
                  <div key={update.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{update.title}</p>
                        <p className="text-xs text-muted-foreground">{new Date(update.date).toLocaleDateString()}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{update.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/client/case-status">Ver historial completo</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Mis Próximas Citas</CardTitle>
              <CardDescription>Citas programadas con su abogado</CardDescription>
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
                        <p className="text-sm font-medium">{appointment.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString()} - {appointment.time}
                        </p>
                        <p className="text-xs text-muted-foreground">Con: {appointment.lawyer}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Reprogramar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/client/appointments">Ver todas las citas</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Mis Documentos</CardTitle>
              <CardDescription>Documentos relacionados con su caso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Fecha: {new Date(doc.date).toLocaleDateString()}
                        </p>
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
                <Link href="/client/documents">Ver todos los documentos</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accesos Rápidos</CardTitle>
              <CardDescription>Herramientas y recursos para usted</CardDescription>
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
                  <Link href="/client/documents">
                    <FileText className="mr-2 h-4 w-4" />
                    Mis Documentos
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/client/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Mensajes
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/client/appointments">
                    <Calendar className="mr-2 h-4 w-4" />
                    Programar Cita
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/client/payments">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Pagos
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/client/news">
                    <Newspaper className="mr-2 h-4 w-4" />
                    Noticias de Inmigración
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

