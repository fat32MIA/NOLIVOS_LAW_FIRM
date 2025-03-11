// src/app/admin/redis/page.tsx
"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, RefreshCw, Play, AlertCircle, Trash2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RedisSettingsPage() {
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
          <h1 className="text-2xl font-bold tracking-tight">Configuración de Redis</h1>
          <p className="text-muted-foreground">
            Gestiona la conexión y configuración de Redis para caché y colas de trabajo
          </p>
        </div>
        
        <Tabs defaultValue="connection" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="connection">Conexión</TabsTrigger>
            <TabsTrigger value="cache">Caché</TabsTrigger>
            <TabsTrigger value="queues">Colas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connection">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Conexión a Redis</CardTitle>
                <CardDescription>
                  Configura los parámetros de conexión al servidor Redis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="redis-host">Host</Label>
                  <Input id="redis-host" placeholder="localhost" defaultValue="localhost" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="redis-port">Puerto</Label>
                    <Input id="redis-port" placeholder="6379" defaultValue="6379" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="redis-db">Base de Datos</Label>
                    <Input id="redis-db" placeholder="0" defaultValue="0" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="redis-password">Contraseña</Label>
                  <Input id="redis-password" type="password" placeholder="••••••••" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="redis-tls" />
                  <Label htmlFor="redis-tls">Usar TLS/SSL</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="redis-prefix">Prefijo de Clave</Label>
                  <Input id="redis-prefix" placeholder="nolivos:" defaultValue="nolivos:" />
                </div>
                
                {testStatus === "success" && (
                  <Alert className="bg-green-500/10 text-green-600 border-green-600/20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Conexión exitosa</AlertTitle>
                    <AlertDescription>
                      La conexión a Redis se ha establecido correctamente.
                    </AlertDescription>
                  </Alert>
                )}
                
                {testStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error de conexión</AlertTitle>
                    <AlertDescription>
                      No se pudo establecer conexión con Redis. Verifica los parámetros.
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
          
          <TabsContent value="cache">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Caché</CardTitle>
                <CardDescription>
                  Configura el comportamiento del sistema de caché basado en Redis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cache-ttl">Tiempo de Vida Predeterminado (TTL)</Label>
                  <div className="flex gap-2">
                    <Input id="cache-ttl" placeholder="3600" defaultValue="3600" />
                    <Select defaultValue="seconds">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Unidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seconds">Segundos</SelectItem>
                        <SelectItem value="minutes">Minutos</SelectItem>
                        <SelectItem value="hours">Horas</SelectItem>
                        <SelectItem value="days">Días</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="cache-enabled" defaultChecked />
                  <Label htmlFor="cache-enabled">Habilitar Caché</Label>
                </div>
                
                <div className="space-y-2">
                  <Label>Elementos a Cachear</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="cache-api" defaultChecked />
                      <Label htmlFor="cache-api">Respuestas API</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="cache-sessions" defaultChecked />
                      <Label htmlFor="cache-sessions">Sesiones</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="cache-templates" defaultChecked />
                      <Label htmlFor="cache-templates">Plantillas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="cache-queries" defaultChecked />
                      <Label htmlFor="cache-queries">Consultas DB</Label>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Estadísticas de Caché</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Tasa de aciertos:</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Claves almacenadas:</span>
                      <span className="text-sm">1,245</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Memoria utilizada:</span>
                      <span className="text-sm">24.5 MB</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Limpiar Caché
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="queues">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Colas</CardTitle>
                <CardDescription>
                  Configura las colas de trabajo basadas en Redis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="queue-prefix">Prefijo de Cola</Label>
                  <Input id="queue-prefix" placeholder="nolivos:queue:" defaultValue="nolivos:queue:" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="queue-workers">Número de Workers</Label>
                  <Input id="queue-workers" type="number" placeholder="3" defaultValue="3" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="queue-retry">Intentos de Reintento</Label>
                  <Input id="queue-retry" type="number" placeholder="3" defaultValue="3" />
                </div>
                
                <div className="space-y-2">
                  <Label>Colas Activas</Label>
                  <div className="border rounded-md divide-y">
                    {["emails", "documents", "notifications", "reports"].map((queue) => (
                      <div key={queue} className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium">{queue}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground">12 trabajos en espera</span>
                          <Button size="sm" variant="outline">Gestionar</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración de Colas
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
