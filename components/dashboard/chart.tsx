'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis de Casos</CardTitle>
        <CardDescription>
          Distribución de casos por tipo y estado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="monthly">Mensual</TabsTrigger>
              <TabsTrigger value="quarterly">Trimestral</TabsTrigger>
              <TabsTrigger value="yearly">Anual</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="monthly" className="space-y-4">
            <div className="h-[300px] w-full flex items-end justify-between px-2">
              {/* Simulación de gráfico de barras */}
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '120px' }}></div>
                <span className="text-xs mt-2">Ene</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '150px' }}></div>
                <span className="text-xs mt-2">Feb</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '100px' }}></div>
                <span className="text-xs mt-2">Mar</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '200px' }}></div>
                <span className="text-xs mt-2">Abr</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '180px' }}></div>
                <span className="text-xs mt-2">May</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '220px' }}></div>
                <span className="text-xs mt-2">Jun</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                <span>Casos nuevos</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="quarterly" className="space-y-4">
            <div className="h-[300px] w-full flex items-end justify-around px-2">
              {/* Simulación de gráfico de barras trimestral */}
              <div className="flex flex-col items-center">
                <div className="w-16 bg-blue-500 rounded-t-md" style={{ height: '150px' }}></div>
                <span className="text-xs mt-2">Q1</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 bg-blue-500 rounded-t-md" style={{ height: '220px' }}></div>
                <span className="text-xs mt-2">Q2</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 bg-blue-500 rounded-t-md" style={{ height: '180px' }}></div>
                <span className="text-xs mt-2">Q3</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 bg-blue-500 rounded-t-md" style={{ height: '200px' }}></div>
                <span className="text-xs mt-2">Q4</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                <span>Casos nuevos</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="yearly" className="space-y-4">
            <div className="h-[300px] w-full flex items-end justify-around px-2">
              {/* Simulación de gráfico de barras anual */}
              <div className="flex flex-col items-center">
                <div className="w-20 bg-blue-500 rounded-t-md" style={{ height: '150px' }}></div>
                <span className="text-xs mt-2">2021</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 bg-blue-500 rounded-t-md" style={{ height: '180px' }}></div>
                <span className="text-xs mt-2">2022</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 bg-blue-500 rounded-t-md" style={{ height: '220px' }}></div>
                <span className="text-xs mt-2">2023</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                <span>Casos nuevos</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}