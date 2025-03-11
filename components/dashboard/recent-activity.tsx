'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  target: string;
  date: string;
  status?: "completed" | "pending" | "in-progress";
}

const recentActivities: Activity[] = [
  {
    id: "1",
    user: {
      name: "María López",
      initials: "ML",
    },
    action: "actualizó el caso",
    target: "Visa de trabajo H-1B",
    date: "Hace 5 minutos",
    status: "in-progress",
  },
  {
    id: "2",
    user: {
      name: "Carlos Rodríguez",
      initials: "CR",
    },
    action: "subió un documento a",
    target: "Naturalización",
    date: "Hace 1 hora",
    status: "completed",
  },
  {
    id: "3",
    user: {
      name: "Ana Martínez",
      initials: "AM",
    },
    action: "creó un nuevo caso",
    target: "Asilo político",
    date: "Hace 3 horas",
    status: "pending",
  },
  {
    id: "4",
    user: {
      name: "Juan Pérez",
      initials: "JP",
    },
    action: "comentó en",
    target: "Renovación de Green Card",
    date: "Hace 5 horas",
  },
  {
    id: "5",
    user: {
      name: "Laura Sánchez",
      initials: "LS",
    },
    action: "programó una cita para",
    target: "Consulta inicial",
    date: "Ayer",
  },
];

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>
          Las últimas acciones realizadas en el sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <Avatar className="h-9 w-9">
                {activity.user.avatar && (
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                )}
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-3 space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user.name}</span>{" "}
                  {activity.action}{" "}
                  <span className="font-semibold">{activity.target}</span>
                  {activity.status && (
                    <Badge
                      className="ml-2"
                      variant={
                        activity.status === "completed"
                          ? "success"
                          : activity.status === "in-progress"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {activity.status === "completed"
                        ? "Completado"
                        : activity.status === "in-progress"
                        ? "En progreso"
                        : "Pendiente"}
                    </Badge>
                  )}
                </p>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}