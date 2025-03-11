
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DocumentGenerator() {
  const [documentType, setDocumentType] = useState('I-589 Asylum Application');
  const [clientName, setClientName] = useState('');
  const [clientDetails, setClientDetails] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  
  const handleGenerateDocument = async () => {
    setIsGenerating(true);
    setGenerationComplete(false);
    
    try {
      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentType,
          format: 'pdf',
          clientData: {
            name: clientName,
            details: clientDetails,
          },
        }),
      });
      
      if (!response.ok) {
        throw new Error('Error generando el documento');
      }
      
      // Si la respuesta es un PDF, descargarlo
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/pdf')) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${documentType.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      } else {
        // Si no es un PDF, mostrar el contenido
        const data = await response.json();
        console.log('Documento generado:', data);
        // Aquí podrías mostrar el contenido en la UI
      }
      
      setGenerationComplete(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Error generando el documento. Por favor intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Generador de Documentos Legales</CardTitle>
        <CardDescription>
          Completa el formulario para generar un documento legal personalizado
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="document-type">Tipo de Documento</Label>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger id="document-type">
              <SelectValue placeholder="Selecciona un tipo de documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="I-589 Asylum Application">Solicitud de Asilo (I-589)</SelectItem>
              <SelectItem value="I-130 Petition for Alien Relative">Petición para Familiar Extranjero (I-130)</SelectItem>
              <SelectItem value="I-485 Adjustment of Status">Ajuste de Estatus (I-485)</SelectItem>
              <SelectItem value="I-751 Remove Conditions on Residence">Remover Condiciones de Residencia (I-751)</SelectItem>
              <SelectItem value="N-400 Application for Naturalization">Solicitud de Naturalización (N-400)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="client-name">Nombre del Cliente</Label>
          <Input
            id="client-name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Nombre completo"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="client-details">Detalles del Caso</Label>
          <Textarea
            id="client-details"
            value={clientDetails}
            onChange={(e) => setClientDetails(e.target.value)}
            placeholder="Proporciona detalles relevantes para el documento (situación, fechas, etc.)"
            rows={6}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerateDocument} 
          disabled={isGenerating || !clientName || !clientDetails}
          className="w-full"
        >
          {isGenerating ? 'Generando...' : generationComplete ? 'Documento Generado' : 'Generar Documento'}
        </Button>
      </CardFooter>
    </Card>
  );
}
