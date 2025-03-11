"use client"

import { UnifiedLegalAssistant } from "@/components/unified-legal-assistant"
import DashboardLayout from "@/components/dashboard-layout"

export default function LegalAssistantPage() {
  return (
    <DashboardLayout userRole="client">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Asistente Legal de Inmigración</h1>
          <p className="text-muted-foreground">
            Consulta con nuestro asistente legal, genera documentos migratorios personalizados y mantente informado con
            las últimas noticias de inmigración
          </p>
        </div>

        <UnifiedLegalAssistant />
      </div>
    </DashboardLayout>
  )
}

