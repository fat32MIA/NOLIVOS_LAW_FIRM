// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Datos mock para desarrollo
const mockUsers = [
  {
    id: 1,
    email: 'admin@nolivoslaw.com',
    name: 'Admin Usuario',
    role: 'admin'
  },
  {
    id: 2,
    email: 'abogado@nolivoslaw.com',
    name: 'Carlos Rodríguez',
    role: 'lawyer'
  },
  {
    id: 3,
    email: 'paralegal@nolivoslaw.com',
    name: 'Maria Gómez',
    role: 'paralegal'
  },
  {
    id: 4,
    email: 'cliente1@example.com',
    name: 'Juan Pérez',
    role: 'client'
  }
];

export async function GET() {
  // En una implementación real, esto verificaría las cookies de autenticación
  // y consultaría la base de datos para obtener el usuario actual
  
  // Por ahora devolvemos un usuario mock
  const user = mockUsers[3]; // Juan Pérez como predeterminado
  
  return NextResponse.json(user);
}
