// src/app/admin/database/page.tsx
"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Save, RefreshCw, Play, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DatabaseSettingsPage() {
  const [dbType, setDbType] = useState("postgresql")
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  
  const handleTestConnection = () => {
    setTestStatus("testing")
    setTimeout(() => {
      setTestStatus("success")
    }, 2000)
  }
  
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configuración de Base de Datos</h1>
          <p className="text-muted-foreground">
            Gestiona la conexión y configuración de la base de datos para la aplicación
          </p>
        </div>
        
        <Tabs defaultValue="connection" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="connection">Conexión</TabsTrigger>
            <TabsTrigger value="backup">Respaldos</TabsTrigger>
            <TabsTrigger value="migration">Migraciones</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connection">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Conexión</CardTitle>
                <CardDescription>
                  Configura los parámetros de conexión a la base de datos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="db-type">Tipo de Base de Datos</Label>
                  <Select value={dbType} onValueChange={setDbType}>
                    <SelectTrigger id="db-type">
                      <SelectValue placeholder="Selecciona el tipo de base de datos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="mongodb">MongoDB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="db-host">Host</Label>
                  <Input id="db-host" placeholder="localhost" defaultValue="localhost" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-port">Puerto</Label>
                    <Input id="db-port" placeholder="5432" defaultValue="5432" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-name">Nombre de la Base de Datos</Label>
                    <Input id="db-name" placeholder="nolivos_law" defaultValue="nolivos_law" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="db-user">Usuario</Label>
                  <Input id="db-user" placeholder="postgres" defaultValue="postgres" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="db-password">Contraseña</Label>
                  <Input id="db-password" type="password" placeholder="••••••••" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="db-ssl">SSL</Label>
                  <Select defaultValue="disable">
                    <SelectTrigger id="db-ssl">
                      <SelectValue placeholder="Configuración SSL" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disable">Desactivado</SelectItem>
                      <SelectItem value="require">Requerido</SelectItem>
                      <SelectItem value="verify-ca">Verificar CA</SelectItem>
                      <SelectItem value="verify-full">Verificación Completa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {testStatus === "success" && (
                  <Alert className="bg-green-500/10 text-green-600 border-green-600/20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Conexión exitosa</AlertTitle>
                    <AlertDescription>
                      La conexión a la base de datos se ha establecido correctamente.
                    </AlertDescription>
                  </Alert>
                )}
                
                {testStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error de conexión</AlertTitle>
                    <AlertDescription>
                      No se pudo establecer conexión con la base de datos. Verifica los parámetros.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleTestConnection} disabled={testStatus === "testing"}>
                  {testStatus === "testing" ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Probando...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Probar Conexión
                    </>
                  )}
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="backup">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Respaldos</CardTitle>
                <CardDescription>
                  Configura y gestiona los respaldos automáticos de la base de datos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contenido de respaldos */}
                <div className="space-y-2">
                  <Label htmlFor="backup-schedule">Programación de Respaldos</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backup-schedule">
                      <SelectValue placeholder="Frecuencia de respaldos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Cada hora</SelectItem>
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-retention">Retención de Respaldos</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="backup-retention">
                      <SelectValue placeholder="Período de retención" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 días</SelectItem>
                      <SelectItem value="30">30 días</SelectItem>
                      <SelectItem value="90">90 días</SelectItem>
                      <SelectItem value="365">1 año</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-path">Ruta de Almacenamiento</Label>
                  <Input id="backup-path" placeholder="/var/backups/nolivos_law" defaultValue="/var/backups/nolivos_law" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración de Respaldos
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="migration">
            <Card>
              <CardHeader>
                <CardTitle>Migraciones de Base de Datos</CardTitle>
                <CardDescription>
                  Gestiona las migraciones y actualizaciones de esquema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contenido de migraciones */}
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Estado de Migraciones</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Última migración aplicada:</span>
                      <span className="text-sm font-medium">20230615_add_user_roles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Fecha de aplicación:</span>
                      <span className="text-sm">15/06/2023 14:32:45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Migraciones pendientes:</span>
                      <span className="text-sm">0</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Migraciones Disponibles</h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-primary" />
                          <span className="text-sm">20230{i}01_update_schema_v{i}</span>
                        </div>
                        <Button size="sm" variant="outline">Aplicar</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  Revertir Última Migración
                </Button>
                <Button>
                  Aplicar Todas las Migraciones
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
