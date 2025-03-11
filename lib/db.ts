// Simulación de base de datos
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: Date;
}

export interface Case {
  id: string;
  clientId: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
}

export interface Document {
  id: string;
  caseId: string;
  name: string;
  type: string;
  url: string;
  createdAt: Date;
}

// Datos de ejemplo
const clients: Client[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "555-1234",
    status: "active",
    createdAt: new Date("2023-01-15")
  },
  {
    id: "2",
    name: "María López",
    email: "maria@example.com",
    phone: "555-5678",
    status: "active",
    createdAt: new Date("2023-02-20")
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    phone: "555-9012",
    status: "inactive",
    createdAt: new Date("2023-03-10")
  }
];

const cases: Case[] = [
  {
    id: "1",
    clientId: "1",
    title: "Visa de trabajo",
    description: "Solicitud de visa de trabajo H-1B",
    status: "in-progress",
    createdAt: new Date("2023-01-20")
  },
  {
    id: "2",
    clientId: "1",
    title: "Renovación de Green Card",
    description: "Renovación de tarjeta de residencia permanente",
    status: "pending",
    createdAt: new Date("2023-02-05")
  },
  {
    id: "3",
    clientId: "2",
    title: "Naturalización",
    description: "Proceso de naturalización para ciudadanía",
    status: "completed",
    createdAt: new Date("2023-02-25")
  }
];

const documents: Document[] = [
  {
    id: "1",
    caseId: "1",
    name: "Pasaporte",
    type: "identification",
    url: "/documents/passport.pdf",
    createdAt: new Date("2023-01-21")
  },
  {
    id: "2",
    caseId: "1",
    name: "Carta de empleo",
    type: "employment",
    url: "/documents/employment-letter.pdf",
    createdAt: new Date("2023-01-22")
  },
  {
    id: "3",
    caseId: "2",
    name: "Green Card actual",
    type: "identification",
    url: "/documents/green-card.pdf",
    createdAt: new Date("2023-02-06")
  }
];

// Funciones de acceso a datos
export async function getClients(): Promise<Client[]> {
  return clients;
}

export async function getClient(id: string): Promise<Client | undefined> {
  return clients.find(client => client.id === id);
}

export async function getCases(clientId?: string): Promise<Case[]> {
  if (clientId) {
    return cases.filter(c => c.clientId === clientId);
  }
  return cases;
}

export async function getCase(id: string): Promise<Case | undefined> {
  return cases.find(c => c.id === id);
}

export async function getDocuments(caseId?: string): Promise<Document[]> {
  if (caseId) {
    return documents.filter(doc => doc.caseId === caseId);
  }
  return documents;
}

export async function getDocument(id: string): Promise<Document | undefined> {
  return documents.find(doc => doc.id === id);
}
