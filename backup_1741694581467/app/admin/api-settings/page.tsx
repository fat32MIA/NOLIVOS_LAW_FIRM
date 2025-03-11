"use client"

import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ApiKeySettings from '../../../components/admin/api-key-settings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ApiSettingsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configuración de API</h1>
          <p className="text-muted-foreground">Gestiona las claves API para los servicios de inteligencia artificial</p>
        </div>

        <Tabs defaultValue="openai" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="openai">OpenAI</TabsTrigger>
            <TabsTrigger value="ia-migrante">IA Migrante</TabsTrigger>
            <TabsTrigger value="other">Otros Servicios</TabsTrigger>
          </TabsList>

          <TabsContent value="openai">
            <ApiKeySettings userRole="admin" />
          </TabsContent>

          <TabsContent value="ia-migrante">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de API de IA Migrante</CardTitle>
                <CardDescription>Configura tu clave API para el servicio de IA Migrante</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">La configuración de IA Migrante se implementará próximamente.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other">
            <Card>
              <CardHeader>
                <CardTitle>Otros Servicios de API</CardTitle>
                <CardDescription>Configura claves API para servicios adicionales</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  La configuración de servicios adicionales se implementará próximamente.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

