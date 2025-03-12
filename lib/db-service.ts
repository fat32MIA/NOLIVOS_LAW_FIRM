import Database from 'better-sqlite3';
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
    return this.db.query(`
      SELECT c.*, u.name, u.email 
      FROM clients c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
    `);
  }

  // Obtener un cliente por ID
  public getClientById(id: number) {
    return this.db.queryOne(`
      SELECT c.*, u.name, u.email 
      FROM clients c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `, [id]);
  }

  // Obtener casos de un cliente
  public getClientCases(clientId: number) {
    return this.db.query(`
      SELECT * FROM cases
      WHERE client_id = ?
      ORDER BY created_at DESC
    `, [clientId]);
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
    return this.db.query(`
      SELECT c.*, cl.name as client_name, 
      l.name as lawyer_name, p.name as paralegal_name
      FROM cases c
      JOIN clients cl ON c.client_id = cl.id
      LEFT JOIN users l ON c.lawyer_id = l.id
      LEFT JOIN users p ON c.paralegal_id = p.id
      ORDER BY c.created_at DESC
    `);
  }

  // Obtener un caso por ID
  public getCaseById(id: number) {
    return this.db.queryOne(`
      SELECT c.*, cl.name as client_name, 
      l.name as lawyer_name, p.name as paralegal_name
      FROM cases c
      JOIN clients cl ON c.client_id = cl.id
      LEFT JOIN users l ON c.lawyer_id = l.id
      LEFT JOIN users p ON c.paralegal_id = p.id
      WHERE c.id = ?
    `, [id]);
  }

  // Obtener casos asignados a un usuario (abogado o paralegal)
  public getCasesByUserId(userId: number, role: string) {
    const fieldName = role === 'lawyer' ? 'lawyer_id' : 'paralegal_id';
    return this.db.query(`
      SELECT c.*, cl.name as client_name
      FROM cases c
      JOIN clients cl ON c.client_id = cl.id
      WHERE c.${fieldName} = ?
      ORDER BY c.created_at DESC
    `, [userId]);
  }

  // Obtener documentos de un caso
  public getCaseDocuments(caseId: number) {
    return this.db.query(`
      SELECT * FROM documents
      WHERE case_id = ?
      ORDER BY created_at DESC
    `, [caseId]);
  }

  // Obtener eventos de un caso
  public getCaseEvents(caseId: number) {
    return this.db.query(`
      SELECT * FROM events
      WHERE case_id = ?
      ORDER BY event_date ASC
    `, [caseId]);
  }

  // Obtener notas de un caso
  public getCaseNotes(caseId: number) {
    return this.db.query(`
      SELECT n.*, u.name as user_name, u.role as user_role
      FROM notes n
      JOIN users u ON n.user_id = u.id
      WHERE n.case_id = ?
      ORDER BY n.created_at DESC
    `, [caseId]);
  }
}
