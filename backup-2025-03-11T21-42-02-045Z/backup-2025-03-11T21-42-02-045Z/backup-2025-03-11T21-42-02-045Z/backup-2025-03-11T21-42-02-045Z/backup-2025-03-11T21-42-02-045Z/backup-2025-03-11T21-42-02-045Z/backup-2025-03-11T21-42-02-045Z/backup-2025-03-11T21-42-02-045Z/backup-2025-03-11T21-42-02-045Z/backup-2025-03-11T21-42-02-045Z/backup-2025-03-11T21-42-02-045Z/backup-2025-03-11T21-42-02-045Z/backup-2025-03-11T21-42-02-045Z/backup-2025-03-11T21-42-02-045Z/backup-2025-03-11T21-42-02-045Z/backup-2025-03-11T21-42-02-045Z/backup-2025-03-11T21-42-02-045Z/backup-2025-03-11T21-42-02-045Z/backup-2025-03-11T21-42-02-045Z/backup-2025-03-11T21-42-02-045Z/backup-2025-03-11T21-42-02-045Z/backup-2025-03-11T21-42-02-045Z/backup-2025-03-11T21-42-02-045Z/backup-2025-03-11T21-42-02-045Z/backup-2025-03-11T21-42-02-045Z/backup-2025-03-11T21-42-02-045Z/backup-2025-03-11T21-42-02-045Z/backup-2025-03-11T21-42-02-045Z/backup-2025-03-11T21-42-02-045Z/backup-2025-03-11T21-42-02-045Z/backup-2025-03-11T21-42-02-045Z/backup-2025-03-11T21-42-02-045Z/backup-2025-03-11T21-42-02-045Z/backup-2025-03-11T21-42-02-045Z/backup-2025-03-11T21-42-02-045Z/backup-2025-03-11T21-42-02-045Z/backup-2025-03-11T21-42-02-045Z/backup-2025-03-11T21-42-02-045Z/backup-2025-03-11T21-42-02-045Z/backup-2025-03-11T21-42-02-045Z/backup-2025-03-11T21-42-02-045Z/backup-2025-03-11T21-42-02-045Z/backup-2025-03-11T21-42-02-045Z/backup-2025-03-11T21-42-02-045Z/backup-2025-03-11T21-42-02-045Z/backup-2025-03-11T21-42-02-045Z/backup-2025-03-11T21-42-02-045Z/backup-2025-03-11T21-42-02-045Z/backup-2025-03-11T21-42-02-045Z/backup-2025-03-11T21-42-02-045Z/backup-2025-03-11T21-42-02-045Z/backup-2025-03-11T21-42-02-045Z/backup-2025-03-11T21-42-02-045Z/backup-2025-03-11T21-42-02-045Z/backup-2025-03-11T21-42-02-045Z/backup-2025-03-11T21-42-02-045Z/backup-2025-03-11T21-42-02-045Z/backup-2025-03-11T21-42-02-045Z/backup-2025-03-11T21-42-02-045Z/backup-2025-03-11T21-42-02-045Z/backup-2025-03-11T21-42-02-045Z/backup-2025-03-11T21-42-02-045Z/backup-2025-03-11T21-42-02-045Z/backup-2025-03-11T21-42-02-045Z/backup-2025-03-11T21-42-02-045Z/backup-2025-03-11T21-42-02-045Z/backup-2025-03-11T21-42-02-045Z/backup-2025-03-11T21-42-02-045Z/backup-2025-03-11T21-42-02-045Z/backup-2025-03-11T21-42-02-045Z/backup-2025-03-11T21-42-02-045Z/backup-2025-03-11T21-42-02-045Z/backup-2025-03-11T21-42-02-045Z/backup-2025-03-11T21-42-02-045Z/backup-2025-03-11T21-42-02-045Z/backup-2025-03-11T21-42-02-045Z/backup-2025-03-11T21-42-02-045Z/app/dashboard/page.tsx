'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import DashboardStats from '@/components/dashboard/stats';
import RecentActivity from '@/components/dashboard/recent-activity';
import DashboardChart from '@/components/dashboard/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Users, Calendar, Bell } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-500">Bienvenido de nuevo, Juan Pérez</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendario</span>
              </Button>
              <Button className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>Nuevo Caso</span>
              </Button>
            </div>
          </div>
          
          <DashboardStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <DashboardChart />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
          
          <div className="mt-8">
            <Tabs defaultValue="cases">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="cases">Casos</TabsTrigger>
                  <TabsTrigger value="clients">Clientes</TabsTrigger>
                  <TabsTrigger value="documents">Documentos</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  Ver todos
                </Button>
              </div>
              
              <TabsContent value="cases">
                <Card>
                  <CardHeader>
                    <CardTitle>Casos Recientes</CardTitle>
                    <CardDescription>
                      Los últimos casos en los que has trabajado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Visa de trabajo H-1B</h4>
                              <p className="text-sm text-gray-500">Actualizado hace 3 días</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Ver detalles</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="clients">
                <Card>
                  <CardHeader>
                    <CardTitle>Clientes Recientes</CardTitle>
                    <CardDescription>
                      Los últimos clientes con los que has trabajado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-4">
                              <Users className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">María López</h4>
                              <p className="text-sm text-gray-500">Cliente desde Enero 2023</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Ver perfil</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentos Recientes</CardTitle>
                    <CardDescription>
                      Los últimos documentos que has procesado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Formulario I-485</h4>
                              <p className="text-sm text-gray-500">Subido hace 2 días</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Descargar</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}