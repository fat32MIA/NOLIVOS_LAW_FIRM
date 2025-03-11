'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Clientes</CardTitle>
            <CardDescription>Gestión de clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Administra la información de los clientes.</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/clients" className="w-full">
              <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                Gestionar
              </button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Base de Datos</CardTitle>
            <CardDescription>Configuración de base de datos</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Configura la conexión a la base de datos.</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/database" className="w-full">
              <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                Configurar
              </button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Redis</CardTitle>
            <CardDescription>Configuración de Redis</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Configura la conexión a Redis para caché.</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/redis" className="w-full">
              <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                Configurar
              </button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
            <CardDescription>Ajustes generales</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Configura los ajustes generales del sistema.</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/settings" className="w-full">
              <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                Configurar
              </button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>API Settings</CardTitle>
            <CardDescription>Configuración de APIs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Configura las claves API para servicios externos.</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/api-settings" className="w-full">
              <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                Configurar
              </button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
