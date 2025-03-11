'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getClients, getCases } from "@/lib/db";
import { useEffect, useState } from "react";

export default function LawyerDashboard() {
  const [clients, setClients] = useState([]);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const clientsData = await getClients();
        const casesData = await getCases();
        setClients(clientsData);
        setCases(casesData);
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
      <h1 className="text-3xl font-bold mb-6">Panel de Abogado</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Clientes</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {loading ? "..." : clients.length}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Total de clientes activos</p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Casos</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {loading ? "..." : cases.length}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Total de casos en gestión</p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pendientes</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {loading ? "..." : cases.filter(c => c.status === "pending").length}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Casos pendientes de acción</p>
          </CardFooter>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Casos Recientes</h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Caso</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Cargando casos...</TableCell>
                </TableRow>
              ) : cases.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No hay casos disponibles</TableCell>
                </TableRow>
              ) : (
                cases.slice(0, 5).map((c) => {
                  const client = clients.find(client => client.id === c.clientId);
                  return (
                    <TableRow key={c.id}>
                      <TableCell>{client ? client.name : "Cliente desconocido"}</TableCell>
                      <TableCell>{c.title}</TableCell>
                      <TableCell>
                        <Badge variant={
                          c.status === "completed" ? "success" : 
                          c.status === "in-progress" ? "default" : 
                          "secondary"
                        }>
                          {c.status === "completed" ? "Completado" : 
                           c.status === "in-progress" ? "En progreso" : 
                           "Pendiente"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Ver detalles</Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end p-4">
          <Button variant="outline">Ver todos los casos</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
