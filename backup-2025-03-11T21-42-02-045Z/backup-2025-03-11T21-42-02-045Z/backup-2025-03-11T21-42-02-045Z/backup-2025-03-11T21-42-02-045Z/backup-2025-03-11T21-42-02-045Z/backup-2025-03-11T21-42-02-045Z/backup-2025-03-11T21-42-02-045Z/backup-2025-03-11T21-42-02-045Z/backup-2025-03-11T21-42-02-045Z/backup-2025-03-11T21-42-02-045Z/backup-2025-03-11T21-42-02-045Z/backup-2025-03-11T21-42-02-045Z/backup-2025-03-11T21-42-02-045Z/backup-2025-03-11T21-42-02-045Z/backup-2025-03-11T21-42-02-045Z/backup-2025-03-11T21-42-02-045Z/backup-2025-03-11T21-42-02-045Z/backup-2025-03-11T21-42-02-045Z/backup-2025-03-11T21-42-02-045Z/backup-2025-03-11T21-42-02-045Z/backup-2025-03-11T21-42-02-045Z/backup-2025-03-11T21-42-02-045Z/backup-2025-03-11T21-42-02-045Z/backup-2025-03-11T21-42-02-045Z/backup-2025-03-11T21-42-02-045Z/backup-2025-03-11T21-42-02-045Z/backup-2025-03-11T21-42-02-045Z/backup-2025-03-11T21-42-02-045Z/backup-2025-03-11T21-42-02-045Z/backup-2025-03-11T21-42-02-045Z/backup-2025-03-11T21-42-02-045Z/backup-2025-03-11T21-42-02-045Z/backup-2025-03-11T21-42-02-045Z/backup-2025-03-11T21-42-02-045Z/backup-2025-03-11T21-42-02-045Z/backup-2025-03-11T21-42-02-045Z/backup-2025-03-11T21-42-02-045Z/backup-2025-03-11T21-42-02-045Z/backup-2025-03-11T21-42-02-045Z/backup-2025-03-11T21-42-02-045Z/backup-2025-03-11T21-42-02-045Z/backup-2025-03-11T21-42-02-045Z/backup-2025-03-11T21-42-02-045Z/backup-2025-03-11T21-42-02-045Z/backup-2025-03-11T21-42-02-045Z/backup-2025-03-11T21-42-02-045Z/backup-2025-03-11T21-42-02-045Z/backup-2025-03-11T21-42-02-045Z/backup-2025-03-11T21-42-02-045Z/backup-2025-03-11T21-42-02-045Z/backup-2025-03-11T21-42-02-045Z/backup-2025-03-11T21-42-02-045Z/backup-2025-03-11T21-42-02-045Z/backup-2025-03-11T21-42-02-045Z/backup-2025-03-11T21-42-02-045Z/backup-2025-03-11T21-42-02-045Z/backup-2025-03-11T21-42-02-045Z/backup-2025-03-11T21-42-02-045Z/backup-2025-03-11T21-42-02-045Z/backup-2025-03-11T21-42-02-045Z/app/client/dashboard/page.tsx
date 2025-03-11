'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCases, getDocuments } from "@/lib/db";
import { useEffect, useState } from "react";

export default function ClientDashboard() {
  const [cases, setCases] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Simulamos que el cliente actual tiene ID "1"
        const clientId = "1";
        const casesData = await getCases(clientId);
        const documentsData = await getDocuments();
        setCases(casesData);
        setDocuments(documentsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Portal del Cliente</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Mis Casos</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {loading ? "..." : cases.length}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Total de casos activos</p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Mis Documentos</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {loading ? "..." : documents.length}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Total de documentos</p>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue="cases" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="cases">Mis Casos</TabsTrigger>
          <TabsTrigger value="documents">Mis Documentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cases">
          <Card>
            <CardHeader>
              <CardTitle>Casos Activos</CardTitle>
              <CardDescription>
                Listado de tus casos en proceso
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Cargando casos...</p>
              ) : cases.length === 0 ? (
                <p>No tienes casos activos</p>
              ) : (
                <div className="space-y-4">
                  {cases.map((c) => (
                    <div key={c.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{c.title}</h3>
                          <p className="text-sm text-gray-500">{c.description}</p>
                        </div>
                        <Badge variant={
                          c.status === "completed" ? "success" : 
                          c.status === "in-progress" ? "default" : 
                          "secondary"
                        }>
                          {c.status === "completed" ? "Completado" : 
                           c.status === "in-progress" ? "En progreso" : 
                           "Pendiente"}
                        </Badge>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          Fecha de inicio: {new Date(c.createdAt).toLocaleDateString()}
                        </p>
                        <Button size="sm">Ver detalles</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>
                Documentos relacionados con tus casos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Cargando documentos...</p>
              ) : documents.length === 0 ? (
                <p>No tienes documentos disponibles</p>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{doc.name}</h3>
                          <p className="text-sm text-gray-500">Tipo: {doc.type}</p>
                        </div>
                        <Badge>Documento</Badge>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          Fecha: {new Date(doc.createdAt).toLocaleDateString()}
                        </p>
                        <Button size="sm">Descargar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
