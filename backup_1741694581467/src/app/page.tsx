
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nolivos Law Firm
          </h1>
          <p className="text-xl text-gray-600">
            Soluciones legales integrales para inmigración y más
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portal de Administración */}
          <Card>
            <CardHeader>
              <CardTitle>Portal de Administración</CardTitle>
              <CardDescription>
                Gestión completa del sistema y usuarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Acceda al panel de administración para gestionar clientes, casos y configuraciones del sistema.</p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/dashboard" className="w-full">
                <Button className="w-full">Acceder</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Portal de Abogados */}
          <Card>
            <CardHeader>
              <CardTitle>Portal de Abogados</CardTitle>
              <CardDescription>
                Gestión de casos y clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Acceda al portal de abogados para gestionar sus casos, documentos y comunicaciones con clientes.</p>
            </CardContent>
            <CardFooter>
              <Link href="/lawyer/dashboard" className="w-full">
                <Button className="w-full">Acceder</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Portal de Paralegales */}
          <Card>
            <CardHeader>
              <CardTitle>Portal de Paralegales</CardTitle>
              <CardDescription>
                Asistencia y preparación de documentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Acceda al portal de paralegales para asistir en la preparación de documentos y seguimiento de casos.</p>
            </CardContent>
            <CardFooter>
              <Link href="/paralegal/dashboard" className="w-full">
                <Button className="w-full">Acceder</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Portal de Clientes */}
          <Card>
            <CardHeader>
              <CardTitle>Portal de Clientes</CardTitle>
              <CardDescription>
                Seguimiento de su caso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Acceda al portal de clientes para ver el estado de su caso, documentos y comunicarse con su abogado.</p>
            </CardContent>
            <CardFooter>
              <Link href="/client/dashboard" className="w-full">
                <Button className="w-full">Acceder</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Herramientas de IA */}
          <Card>
            <CardHeader>
              <CardTitle>Asistente de Inmigración</CardTitle>
              <CardDescription>
                Asistente virtual con IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Utilice nuestro asistente virtual impulsado por IA para obtener respuestas a preguntas comunes sobre inmigración.</p>
            </CardContent>
            <CardFooter>
              <Link href="/immigration-assistant" className="w-full">
                <Button className="w-full">Acceder</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Escáner de Documentos */}
          <Card>
            <CardHeader>
              <CardTitle>Escáner de Documentos</CardTitle>
              <CardDescription>
                Análisis automático de documentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Utilice nuestro escáner de documentos para analizar y extraer información relevante de sus documentos legales.</p>
            </CardContent>
            <CardFooter>
              <Link href="/document-scanner" className="w-full">
                <Button className="w-full">Acceder</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
