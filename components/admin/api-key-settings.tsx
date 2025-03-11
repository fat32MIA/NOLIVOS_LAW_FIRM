"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function ApiKeySettings() {
  const [openaiKey, setOpenaiKey] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Aquí iría la lógica para guardar la clave API
    console.log('Guardando clave API:', openaiKey)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de API Keys</CardTitle>
        <CardDescription>
          Configura las claves API necesarias para el funcionamiento del sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="openai-key">OpenAI API Key</Label>
          <Input
            id="openai-key"
            type="password"
            placeholder="sk-..."
            value={openaiKey}
            onChange={(e) => setOpenaiKey(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            Esta clave se utiliza para el asistente de inmigración y la generación de documentos.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>
          {saved ? '¡Guardado!' : 'Guardar configuración'}
        </Button>
      </CardFooter>
    </Card>
  )
}
