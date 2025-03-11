'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, FileText, Clock } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-blue-100 p-1.5 text-blue-600">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <span className={trend.positive ? "text-green-600" : "text-red-600"}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
            <span className="text-xs text-gray-500 ml-1">desde el mes pasado</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Clientes Totales"
        value="128"
        description="Clientes activos en el sistema"
        icon={<Users className="h-5 w-5" />}
        trend={{ value: "12%", positive: true }}
      />
      <StatsCard
        title="Casos Activos"
        value="42"
        description="Casos en proceso actualmente"
        icon={<Briefcase className="h-5 w-5" />}
        trend={{ value: "8%", positive: true }}
      />
      <StatsCard
        title="Documentos"
        value="284"
        description="Documentos procesados"
        icon={<FileText className="h-5 w-5" />}
        trend={{ value: "24%", positive: true }}
      />
      <StatsCard
        title="Tiempo Promedio"
        value="18 días"
        description="Tiempo promedio de resolución"
        icon={<Clock className="h-5 w-5" />}
        trend={{ value: "5%", positive: false }}
      />
    </div>
  );
}