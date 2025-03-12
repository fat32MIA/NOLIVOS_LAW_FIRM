import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './db-service';

const TOKEN_NAME = 'nolivos_auth_token';
const JWT_SECRET = 'your-secret-key'; // En producción, usar una variable de entorno

// Función auxiliar para simular JWT en entorno de desarrollo
function createToken(payload: any): string {
  // Esta es una simplificación. En producción, usar una biblioteca como jsonwebtoken
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

function verifyToken(token: string): any {
  try {
    // Esta es una simplificación. En producción, usar una biblioteca como jsonwebtoken
    return JSON.parse(Buffer.from(token, 'base64').toString());
  } catch (error) {
    return null;
  }
}

// Iniciar sesión de usuario
export async function loginUser(email: string, password: string) {
  const authService = new AuthService();
  const user = authService.verifyCredentials(email, password);
  
  if (user) {
    // Crear token con información del usuario
    const token = createToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    });
    
    // Establecer cookie de autenticación
    cookies().set({
      name: TOKEN_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    
    return { success: true, user };
  }
  
  return { success: false, message: 'Credenciales inválidas' };
}

// Cerrar sesión de usuario
export async function logoutUser() {
  cookies().delete(TOKEN_NAME);
  return { success: true };
}

// Obtener usuario actual desde la cookie
export function getCurrentUser() {
  const token = cookies().get(TOKEN_NAME)?.value;
  
  if (!token) {
    return null;
  }
  
  return verifyToken(token);
}

// Middleware para proteger rutas API
export function withAuth(
  handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const token = req.cookies.get(TOKEN_NAME)?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }
    
    const user = verifyToken(token);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }
    
    return handler(req, user);
  };
}

// Middleware para verificar roles
export function withRole(
  handler: (req: NextRequest, user: any) => Promise<NextResponse>,
  allowedRoles: string[]
) {
  return withAuth(async (req, user) => {
    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        { error: 'Acceso denegado' },
        { status: 403 }
      );
    }
    
    return handler(req, user);
  });
}
