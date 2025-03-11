"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function DocumentOCR() {
  const [file, setFile] = useState<File | null>(null)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResult(null)
    }
  }

  const handleScan = async () => {
    if (!file) return

    setScanning(true)
    
    // Simulación de escaneo OCR
    setTimeout(() => {
      setResult("Documento escaneado correctamente. Se ha extraído el texto del documento.")
      setScanning(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Escáner de Documentos</CardTitle>
        <CardDescription>
          Sube un documento para extraer su texto mediante OCR.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="file"
            accept="image/png,image/jpeg,application/pdf"
            onChange={handleFileChange}
          />
          <p className="text-sm text-gray-500">
            Formatos soportados: PDF, JPG, PNG
          </p>
        </div>
        
        {file && (
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="font-medium">Archivo seleccionado:</p>
            <p>{file.name}</p>
          </div>
        )}
        
        {result && (
          <div className="p-4 border rounded-md bg-green-50 text-green-700">
            {result}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleScan} 
          disabled={!file || scanning}
        >
          {scanning ? 'Escaneando...' : 'Escanear documento'}
        </Button>
      </CardFooter>
    </Card>
  )
}
