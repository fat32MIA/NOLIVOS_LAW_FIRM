const fs = require('fs');
const path = require('path');

// Obtener la ruta absoluta del directorio actual
const ROOT_DIR = process.cwd();
console.log(`Directorio raíz: ${ROOT_DIR}`);

// Función para asegurarse de que un directorio existe
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Creado directorio: ${dirPath}`);
  }
}

// Función para escribir un archivo y verificar que se haya creado
function writeAndVerifyFile(filePath, content) {
  try {
    // Asegurarse de que el directorio existe
    const dir = path.dirname(filePath);
    ensureDir(dir);
    
    // Escribir el archivo
    fs.writeFileSync(filePath, content);
    
    // Verificar que el archivo existe
    if (fs.existsSync(filePath)) {
      console.log(`✅ Creado archivo: ${filePath}`);
      return true;
    } else {
      console.error(`❌ No se pudo verificar la creación del archivo: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error al crear archivo ${filePath}:`, error.message);
    return false;
  }
}

// Crear componente Select
const selectPath = path.join(ROOT_DIR, 'components', 'ui', 'select.tsx');
const selectContent = `"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}`;

// Crear componente DashboardLayout
const dashboardLayoutPath = path.join(ROOT_DIR, 'components', 'dashboard-layout.tsx');
const dashboardLayoutContent = `'use client';

import React from 'react';
import Navbar from '@/components/navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}`;

// Crear componente UnifiedLegalAssistant
const unifiedLegalAssistantPath = path.join(ROOT_DIR, 'components', 'unified-legal-assistant.tsx');
const unifiedLegalAssistantContent = `'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot } from 'lucide-react';

export default function UnifiedLegalAssistant() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: '¡Hola! Soy tu asistente legal. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Añadir mensaje del usuario
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setIsLoading(true);
    
    // Simular respuesta del asistente
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Gracias por tu consulta. Estoy procesando tu solicitud. Para casos de inmigración, necesitaría más detalles específicos sobre tu situación para poder brindarte la mejor orientación posible.' 
        }
      ]);
      setIsLoading(false);
    }, 1500);
    
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="mr-2 h-6 w-6 text-blue-600" />
            Asistente Legal
          </CardTitle>
          <CardDescription>
            Consulta cualquier duda legal relacionada con inmigración
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={\`flex \${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }\`}
              >
                <div
                  className={\`max-w-[80%] rounded-lg px-4 py-2 \${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                  }\`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex w-full items-center space-x-2">
            <Input
              placeholder="Escribe tu consulta legal aquí..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}`;

// Simplificar página legal-assistant
const legalAssistantPath = path.join(ROOT_DIR, 'app', 'legal-assistant', 'page.tsx');
const legalAssistantContent = `'use client';

import DashboardLayout from '@/components/dashboard-layout';
import UnifiedLegalAssistant from '@/components/unified-legal-assistant';

export default function LegalAssistantPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Asistente Legal de Inmigración</h1>
        <div className="grid grid-cols-1 gap-6">
          <UnifiedLegalAssistant />
        </div>
      </div>
    </DashboardLayout>
  );
}`;

// Simplificar página admin/database
const adminDatabasePath = path.join(ROOT_DIR, 'app', 'admin', 'database', 'page.tsx');
const adminDatabaseContent = `'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DatabaseConfigPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Configuración de Base de Datos</h1>
      
      <Tabs defaultValue="connection" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="connection">Conexión</TabsTrigger>
          <TabsTrigger value="options">Opciones</TabsTrigger>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="db-host">Host</Label>
                  <Input id="db-host" placeholder="localhost" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-port">Puerto</Label>
                  <Input id="db-port" placeholder="5432" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-name">Nombre de la Base de Datos</Label>
                <Input id="db-name" placeholder="nolivos_law" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-user">Usuario</Label>
                <Input id="db-user" placeholder="postgres" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-password">Contraseña</Label>
                <Input id="db-password" type="password" placeholder="Contraseña" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar configuración</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="options">
          <Card>
            <CardHeader>
              <CardTitle>Opciones Avanzadas</CardTitle>
              <CardDescription>
                Configura opciones avanzadas de la base de datos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db-pool-size">Tamaño del Pool de Conexiones</Label>
                <Input id="db-pool-size" placeholder="10" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-timeout">Tiempo de Espera (ms)</Label>
                <Input id="db-timeout" placeholder="5000" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-ssl">SSL</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="db-ssl" className="h-4 w-4 rounded border-gray-300" />
                  <Label htmlFor="db-ssl">Habilitar SSL</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar opciones</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}`;

// Simplificar página admin/redis
const adminRedisPath = path.join(ROOT_DIR, 'app', 'admin', 'redis', 'page.tsx');
const adminRedisContent = `'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RedisConfigPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Configuración de Redis</h1>
      
      <Tabs defaultValue="connection" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="connection">Conexión</TabsTrigger>
          <TabsTrigger value="options">Opciones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connection">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Conexión</CardTitle>
              <CardDescription>
                Configura los parámetros de conexión a Redis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="redis-host">Host</Label>
                  <Input id="redis-host" placeholder="localhost" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="redis-port">Puerto</Label>
                  <Input id="redis-port" placeholder="6379" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="redis-password">Contraseña</Label>
                <Input id="redis-password" type="password" placeholder="Contraseña (opcional)" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="redis-database">Base de datos</Label>
                <Input id="redis-database" placeholder="0" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar configuración</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="options">
          <Card>
            <CardHeader>
              <CardTitle>Opciones Avanzadas</CardTitle>
              <CardDescription>
                Configura opciones avanzadas de Redis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="redis-tls" className="h-4 w-4 rounded border-gray-300" />
                  <Label htmlFor="redis-tls">Usar TLS</Label>
                </div>
                <p className="text-sm text-gray-500">
                  Habilitar conexión segura mediante TLS
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="redis-prefix">Prefijo de clave</Label>
                <Input id="redis-prefix" placeholder="app:" />
                <p className="text-sm text-gray-500">
                  Prefijo para todas las claves almacenadas
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="redis-timeout">Tiempo de espera (ms)</Label>
                <Input id="redis-timeout" placeholder="5000" />
                <p className="text-sm text-gray-500">
                  Tiempo máximo de espera para operaciones
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar opciones</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}`;

// Simplificar página admin/settings
const adminSettingsPath = path.join(ROOT_DIR, 'app', 'admin', 'settings', 'page.tsx');
const adminSettingsContent = `'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Configuración General</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
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
                <Label htmlFor="app-name">Nombre de la Aplicación</Label>
                <Input id="app-name" placeholder="Nolivos Law" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="app-url">URL de la Aplicación</Label>
                <Input id="app-url" placeholder="https://nolivoslaw.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="app-timezone">Zona Horaria</Label>
                <div className="relative">
                  <select
                    id="app-timezone"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="America/New_York">America/New_York</option>
                    <option value="America/Chicago">America/Chicago</option>
                    <option value="America/Denver">America/Denver</option>
                    <option value="America/Los_Angeles">America/Los_Angeles</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar configuración</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Seguridad</CardTitle>
              <CardDescription>
                Configura los ajustes de seguridad de la aplicación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Tiempo de Sesión (minutos)</Label>
                <Input id="session-timeout" placeholder="30" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-policy">Política de Contraseñas</Label>
                <div className="relative">
                  <select
                    id="password-policy"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="low">Básica</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                    <option value="custom">Personalizada</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="two-factor" className="h-4 w-4 rounded border-gray-300" />
                  <Label htmlFor="two-factor">Habilitar autenticación de dos factores</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar configuración</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>
                Configura cómo se envían las notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-from">Email Remitente</Label>
                <Input id="email-from" placeholder="no-reply@nolivoslaw.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-provider">Proveedor de Email</Label>
                <div className="relative">
                  <select
                    id="email-provider"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="smtp">SMTP</option>
                    <option value="sendgrid">SendGrid</option>
                    <option value="mailgun">Mailgun</option>
                    <option value="ses">Amazon SES</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="email-notifications" className="h-4 w-4 rounded border-gray-300" checked />
                  <Label htmlFor="email-notifications">Notificaciones por email</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="sms-notifications" className="h-4 w-4 rounded border-gray-300" />
                  <Label htmlFor="sms-notifications">Notificaciones por SMS</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar configuración</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}`;

// Crear archivos
console.log('Creando archivos...');

const createdFiles = [
  writeAndVerifyFile(selectPath, selectContent),
  writeAndVerifyFile(dashboardLayoutPath, dashboardLayoutContent),
  writeAndVerifyFile(unifiedLegalAssistantPath, unifiedLegalAssistantContent),
  writeAndVerifyFile(legalAssistantPath, legalAssistantContent),
  writeAndVerifyFile(adminDatabasePath, adminDatabaseContent),
  writeAndVerifyFile(adminRedisPath, adminRedisContent),
  writeAndVerifyFile(adminSettingsPath, adminSettingsContent)
];

// Verificar que todos los archivos se crearon correctamente
if (createdFiles.every(Boolean)) {
  console.log('');
  console.log('✅ Todos los archivos se crearon correctamente');
  console.log('');
  console.log('Ahora ejecuta:');
  console.log('   npm install @radix-ui/react-select --legacy-peer-deps');
  console.log('   npm run build');
} else {
  console.log('');
  console.log('⚠️ Algunos archivos no se pudieron crear correctamente');
  console.log('');
  console.log('Verifica los permisos de escritura en el directorio del proyecto');
}
