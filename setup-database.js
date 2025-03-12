// setup-database.js
const fs = require('fs');
const path = require('path');
const { Database } = require('better-sqlite3');

console.log('🗄️ Configurando base de datos SQLite para Nolivos Law...');

// Crear directorio de datos si no existe
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('📁 Creado directorio data/');
}

// Ruta de la base de datos
const dbPath = path.join(dataDir, 'nolivos_law.db');
console.log(`📦 Creando base de datos en: ${dbPath}`);

// Inicializar la base de datos
const db = new Database(dbPath);

// Habilitar claves foráneas
db.pragma('foreign_keys = ON');

// Crear tabla de usuarios
console.log('📋 Creando tabla de usuarios...');
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('admin', 'lawyer', 'paralegal', 'client')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

// Crear tabla de clientes
console.log('📋 Creando tabla de clientes...');
db.exec(`
CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  phone TEXT,
  address TEXT,
  birth_date TEXT,
  nationality TEXT,
  immigration_status TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`);

// Crear tabla de casos
console.log('📋 Creando tabla de casos...');
db.exec(`
CREATE TABLE IF NOT EXISTS cases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  lawyer_id INTEGER,
  paralegal_id INTEGER,
  case_number TEXT UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  priority TEXT DEFAULT 'medium',
  start_date TEXT,
  due_date TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (lawyer_id) REFERENCES users(id),
  FOREIGN KEY (paralegal_id) REFERENCES users(id)
);
`);

// Crear tabla de documentos
console.log('📋 Creando tabla de documentos...');
db.exec(`
CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  file_path TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);
`);

// Crear tabla de eventos
console.log('📋 Creando tabla de eventos...');
db.exec(`
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_date TEXT NOT NULL,
  location TEXT,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);
`);

// Crear tabla de notas
console.log('📋 Creando tabla de notas...');
db.exec(`
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`);

// Insertar datos de ejemplo
console.log('🔧 Insertando datos de ejemplo...');

// Insertar usuarios
const insertUser = db.prepare(`
INSERT INTO users (email, password, name, role)
VALUES (?, ?, ?, ?)
`);

// Hash para "password123" (en un entorno real, deberías usar bcrypt)
const passwordHash = 'e8dc4081b13434b45189a720b77b6818';

const users = [
  { email: 'admin@nolivoslaw.com', password: passwordHash, name: 'Admin Usuario', role: 'admin' },
  { email: 'abogado@nolivoslaw.com', password: passwordHash, name: 'Carlos Rodríguez', role: 'lawyer' },
  { email: 'paralegal@nolivoslaw.com', password: passwordHash, name: 'Maria Gómez', role: 'paralegal' },
  { email: 'cliente1@example.com', password: passwordHash, name: 'Juan Pérez', role: 'client' },
  { email: 'cliente2@example.com', password: passwordHash, name: 'Ana Martínez', role: 'client' }
];

const userIds = {};

try {
  users.forEach(user => {
    const result = insertUser.run(user.email, user.password, user.name, user.role);
    userIds[user.email] = result.lastInsertRowid;
  });
  console.log('✅ Usuarios insertados correctamente');
} catch (error) {
  console.log('⚠️ Los usuarios pueden ya existir, continuando...');
}

// Insertar clientes
const insertClient = db.prepare(`
INSERT INTO clients (user_id, phone, address, birth_date, nationality, immigration_status, notes)
VALUES (?, ?, ?, ?, ?, ?, ?)
`);

try {
  if (userIds['cliente1@example.com']) {
    insertClient.run(
      userIds['cliente1@example.com'],
      '+1 555-123-4567',
      '123 Main St, Anytown, USA',
      '1985-04-15',
      'Mexicana',
      'Visa de trabajo',
      'Cliente busca renovar su visa de trabajo'
    );
  }
  
  if (userIds['cliente2@example.com']) {
    insertClient.run(
      userIds['cliente2@example.com'],
      '+1 555-987-6543',
      '456 Oak Ave, Somewhere, USA',
      '1990-10-22',
      'Colombiana',
      'Asilo pendiente',
      'Cliente en proceso de solicitud de asilo político'
    );
  }
  
  console.log('✅ Clientes insertados correctamente');
} catch (error) {
  console.log('⚠️ Los clientes pueden ya existir, continuando...');
}

// Obtener IDs de clientes para crear casos
const clientIds = {};
const clientRows = db.prepare('SELECT id, user_id FROM clients').all();
clientRows.forEach(row => {
  // Guardar el id del cliente asociado a su user_id
  clientIds[row.user_id] = row.id;
});

// Insertar casos de ejemplo
const insertCase = db.prepare(`
INSERT INTO cases (client_id, lawyer_id, paralegal_id, case_number, title, description, type, status, priority, start_date, due_date)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

try {
  const lawyerId = userIds['abogado@nolivoslaw.com'];
  const paralegalId = userIds['paralegal@nolivoslaw.com'];
  
  // Caso para el primer cliente
  if (clientIds[userIds['cliente1@example.com']]) {
    insertCase.run(
      clientIds[userIds['cliente1@example.com']],
      lawyerId,
      paralegalId,
      'CASE-2025-001',
      'Renovación de Visa de Trabajo',
      'Cliente necesita renovar su visa de trabajo H-1B',
      'Visa de trabajo',
      'en progreso',
      'alta',
      '2025-01-15',
      '2025-04-15'
    );
  }
  
  // Caso para el segundo cliente
  if (clientIds[userIds['cliente2@example.com']]) {
    insertCase.run(
      clientIds[userIds['cliente2@example.com']],
      lawyerId,
      paralegalId,
      'CASE-2025-002',
      'Solicitud de Asilo Político',
      'Cliente solicita asilo debido a persecución política',
      'Asilo',
      'pendiente revisión',
      'media',
      '2025-02-10',
      '2025-06-10'
    );
  }
  
  console.log('✅ Casos insertados correctamente');
} catch (error) {
  console.log('⚠️ Los casos pueden ya existir, continuando...');
}

// Cerrar la conexión a la base de datos
db.close();

// Crear archivo de servicio para acceder a la base de datos
console.log('📝 Creando servicio de base de datos...');

const dbServiceDir = path.join(process.cwd(), 'lib');
if (!fs.existsSync(dbServiceDir)) {
  fs.mkdirSync(dbServiceDir, { recursive: true });
}

const dbServicePath = path.join(dbServiceDir, 'db-service.ts');
const dbServiceContent = `import Database from 'better-sqlite3';
import path from 'path';

// Clase singleton para manejo de base de datos
export class DbService {
  private static instance: DbService;
  private db: Database.Database;

  private constructor() {
    const dbPath = path.join(process.cwd(), 'data', 'nolivos_law.db');
    this.db = new Database(dbPath, { fileMustExist: true });
    this.db.pragma('journal_mode = WAL');
    this.db.pragma('foreign_keys = ON');
  }

  public static getInstance(): DbService {
    if (!DbService.instance) {
      DbService.instance = new DbService();
    }
    return DbService.instance;
  }

  // Método para ejecutar consultas SELECT
  public query<T = any>(sql: string, params: any = {}): T[] {
    const stmt = this.db.prepare(sql);
    return stmt.all(params) as T[];
  }

  // Método para ejecutar consultas SELECT y obtener un solo resultado
  public queryOne<T = any>(sql: string, params: any = {}): T | null {
    const stmt = this.db.prepare(sql);
    return stmt.get(params) as T | null;
  }

  // Método para ejecutar consultas INSERT, UPDATE, DELETE
  public execute(sql: string, params: any = {}): Database.RunResult {
    const stmt = this.db.prepare(sql);
    return stmt.run(params);
  }

  // Método para ejecutar transacciones
  public transaction<T>(fn: (db: DbService) => T): T {
    const transaction = this.db.transaction((args) => {
      return fn(this);
    });
    return transaction();
  }

  // Método para cerrar la conexión (generalmente no necesario en Next.js)
  public close() {
    this.db.close();
  }
}

// Servicio de autenticación
export class AuthService {
  private db: DbService;

  constructor() {
    this.db = DbService.getInstance();
  }

  // Verificar credenciales de usuario
  public verifyCredentials(email: string, password: string) {
    // En producción, se debería usar una comparación de hash segura
    return this.db.queryOne(
      'SELECT id, email, name, role FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
  }

  // Obtener usuario por ID
  public getUserById(id: number) {
    return this.db.queryOne(
      'SELECT id, email, name, role FROM users WHERE id = ?',
      [id]
    );
  }
}

// Servicio de clientes
export class ClientService {
  private db: DbService;

  constructor() {
    this.db = DbService.getInstance();
  }

  // Obtener todos los clientes
  public getAllClients() {
    return this.db.query(\`
      SELECT c.*, u.name, u.email 
      FROM clients c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
    \`);
  }

  // Obtener un cliente por ID
  public getClientById(id: number) {
    return this.db.queryOne(\`
      SELECT c.*, u.name, u.email 
      FROM clients c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    \`, [id]);
  }

  // Obtener casos de un cliente
  public getClientCases(clientId: number) {
    return this.db.query(\`
      SELECT * FROM cases
      WHERE client_id = ?
      ORDER BY created_at DESC
    \`, [clientId]);
  }
}

// Servicio de casos
export class CaseService {
  private db: DbService;

  constructor() {
    this.db = DbService.getInstance();
  }

  // Obtener todos los casos
  public getAllCases() {
    return this.db.query(\`
      SELECT c.*, cl.name as client_name, 
      l.name as lawyer_name, p.name as paralegal_name
      FROM cases c
      JOIN clients cl ON c.client_id = cl.id
      LEFT JOIN users l ON c.lawyer_id = l.id
      LEFT JOIN users p ON c.paralegal_id = p.id
      ORDER BY c.created_at DESC
    \`);
  }

  // Obtener un caso por ID
  public getCaseById(id: number) {
    return this.db.queryOne(\`
      SELECT c.*, cl.name as client_name, 
      l.name as lawyer_name, p.name as paralegal_name
      FROM cases c
      JOIN clients cl ON c.client_id = cl.id
      LEFT JOIN users l ON c.lawyer_id = l.id
      LEFT JOIN users p ON c.paralegal_id = p.id
      WHERE c.id = ?
    \`, [id]);
  }

  // Obtener casos asignados a un usuario (abogado o paralegal)
  public getCasesByUserId(userId: number, role: string) {
    const fieldName = role === 'lawyer' ? 'lawyer_id' : 'paralegal_id';
    return this.db.query(\`
      SELECT c.*, cl.name as client_name
      FROM cases c
      JOIN clients cl ON c.client_id = cl.id
      WHERE c.\${fieldName} = ?
      ORDER BY c.created_at DESC
    \`, [userId]);
  }

  // Obtener documentos de un caso
  public getCaseDocuments(caseId: number) {
    return this.db.query(\`
      SELECT * FROM documents
      WHERE case_id = ?
      ORDER BY created_at DESC
    \`, [caseId]);
  }

  // Obtener eventos de un caso
  public getCaseEvents(caseId: number) {
    return this.db.query(\`
      SELECT * FROM events
      WHERE case_id = ?
      ORDER BY event_date ASC
    \`, [caseId]);
  }

  // Obtener notas de un caso
  public getCaseNotes(caseId: number) {
    return this.db.query(\`
      SELECT n.*, u.name as user_name, u.role as user_role
      FROM notes n
      JOIN users u ON n.user_id = u.id
      WHERE n.case_id = ?
      ORDER BY n.created_at DESC
    \`, [caseId]);
  }
}
`;

fs.writeFileSync(dbServicePath, dbServiceContent);
console.log(`✅ Creado servicio de base de datos en ${dbServicePath}`);

// Crear servicio de autenticación para API routes
console.log('📝 Creando servicio de autenticación para API...');

const authUtilPath = path.join(libDir, 'auth-utils.ts');
const authUtilContent = `import { cookies } from 'next/headers';
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
`;

fs.writeFileSync(authUtilPath, authUtilContent);
console.log(`✅ Creado servicio de autenticación en ${authUtilPath}`);

console.log('\n✨ ¡Base de datos y servicios configurados correctamente!');
console.log('\nDependencias necesarias:');
console.log('- better-sqlite3: para interactuar con la base de datos SQLite');
console.log('\nPuedes instalarlas con:');
console.log('npm install better-sqlite3');
console.log('npm install --save-dev @types/better-sqlite3');
