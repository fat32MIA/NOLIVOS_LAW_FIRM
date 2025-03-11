// src/app/admin/settings/page.tsx
"use client"

import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, RefreshCw } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configuración del Sistema</h1>
          <p className="text-muted-foreground">
            Gestiona la configuración general del sistema Nolivos Law
          </p>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Configuración General</CardTitle>
                <CardDescription>
                  Configura los ajustes generales de la aplicación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nombre del Sitio</Label>
                  <Input id="site-name" placeholder="Nolivos Law" defaultValue="Nolivos Law" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-url">URL del Sitio</Label>
                  <Input id="site-url" placeholder="https://nolivoslaw.com" defaultValue="https://nolivoslaw.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email de Administración</Label>
                  <Input id="admin-email" placeholder="admin@nolivoslaw.com" defaultValue="admin@nolivoslaw.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Select defaultValue="America/New_York">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Selecciona zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                      <SelectItem value="America/Chicago">America/Chicago</SelectItem>
                      <SelectItem value="America/Denver">America/Denver</SelectItem>
                      <SelectItem value="America/Los_Angeles">America/Los_Angeles</SelectItem>
                      <SelectItem value="America/Guayaquil">America/Guayaquil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-format">Formato de Fecha</Label>
                  <Select defaultValue="MM/DD/YYYY">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Selecciona formato de fecha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode">Modo de Mantenimiento</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Email</CardTitle>
                <CardDescription>
                  Configura el servidor de correo electrónico
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mail-driver">Driver de Email</Label>
                  <Select defaultValue="smtp">
                    <SelectTrigger id="mail-driver">
                      <SelectValue placeholder="Selecciona driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP</SelectItem>
                      <SelectItem value="sendmail">Sendmail</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="ses">Amazon SES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mail-host">Host SMTP</Label>
                  <Input id="mail-host" placeholder="smtp.example.com" defaultValue="smtp.gmail.com" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mail-port">Puerto SMTP</Label>
                    <Input id="mail-port" placeholder="587" defaultValue="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mail-encryption">Encriptación</Label>
                    <Select defaultValue="tls">
                      <SelectTrigger id="mail-encryption">
                        <SelectValue placeholder="Selecciona encriptación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="none">Ninguna</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mail-username">Usuario SMTP</Label>
                  <Input id="mail-username" placeholder="user@example.com" defaultValue="noreply@nolivoslaw.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mail-password">Contraseña SMTP</Label>
                  <Input id="mail-password" type="password" placeholder="••••••••" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mail-from-address">Dirección de Origen</Label>
                  <Input id="mail-from-address" placeholder="noreply@example.com" defaultValue="noreply@nolivoslaw.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mail-from-name">Nombre de Origen</Label>
                  <Input id="mail-from-name" placeholder="Example Inc." defaultValue="Nolivos Law" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Enviar Email de Prueba
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Seguridad</CardTitle>
                <CardDescription>
                  Configura los ajustes de seguridad del sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contenido de seguridad */}
                <div className="space-y-2">
                  <Label htmlFor="session-lifetime">Duración de Sesión (minutos)</Label>
                  <Input id="session-lifetime" type="number" placeholder="120" defaultValue="120" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="force-https" defaultChecked />
                  <Label htmlFor="force-https">Forzar HTTPS</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="two-factor" />
                  <Label htmlFor="two-factor">Autenticación de Dos Factores</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Política de Contraseñas</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger id="password-policy">
                      <SelectValue placeholder="Selecciona política" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básica (mínimo 8 caracteres)</SelectItem>
                      <SelectItem value="medium">Media (letras y números)</SelectItem>
                      <SelectItem value="strong">Fuerte (letras, números y símbolos)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Expiración de Contraseñas (días)</Label>
                  <Input id="password-expiry" type="number" placeholder="90" defaultValue="90" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración de Seguridad
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de API</CardTitle>
                <CardDescription>
                  Configura los ajustes de la API del sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="api-enabled" defaultChecked />
                  <Label htmlFor="api-enabled">Habilitar API</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-rate-limit">Límite de Tasa (peticiones por minuto)</Label>
                  <Input id="api-rate-limit" type="number" placeholder="60" defaultValue="60" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-token-expiry">Expiración de Token (días)</Label>
                  <Input id="api-token-expiry" type="number" placeholder="30" defaultValue="30" />
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Claves API</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Clave de Producción</p>
                        <p className="text-xs text-muted-foreground">Creada: 01/01/2023</p>
                      </div>
                      <Button size="sm" variant="outline">Regenerar</Button>
                    </div>
                    <Input readOnly value="sk_prod_••••••••••••••••••••••••••••••" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Clave de Desarrollo</p>
                        <p className="text-xs text-muted-foreground">Creada: 01/01/2023</p>
                      </div>
                      <Button size="sm" variant="outline">Regenerar</Button>
                    </div>
                    <Input readOnly value="sk_dev_••••••••••••••••••••••••••••••" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración de API
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
