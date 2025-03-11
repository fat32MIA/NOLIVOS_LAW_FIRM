// Servicio para interactuar con la API de IA MIGRANTE

const API_BASE_URL = "http://82.180.130.157:5001"

export interface DocumentQuestion {
  id: string
  text: string
}

export interface DocumentQuestions {
  document_type: string
  questions: DocumentQuestion[]
}

export interface ClientData {
  [key: string]: string
}

export interface GenerateDocumentResponse {
  message: string
  formato: string
  contenido_base64: string
}

// Obtener preguntas para un tipo de documento específico
export async function getDocumentQuestions(documentType: string): Promise<DocumentQuestions> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/document/questions?type=${encodeURIComponent(documentType)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching document questions:", error)
    throw error
  }
}

// Generar un documento legal basado en los datos del cliente
export async function generateDocument(
  documentType: string,
  clientData: ClientData,
  formato: "pdf" | "docx" | "html" = "pdf",
  respuestaFormato: "json_base64" | "directo" = "json_base64",
): Promise<GenerateDocumentResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/document/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        document_type: documentType,
        formato,
        respuesta_formato: respuestaFormato,
        client_data: clientData,
      }),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error generating document:", error)
    throw error
  }
}

// Lista de tipos de documentos disponibles
export const documentTypes = [
  "I-589 Asylum Application Brief",
  "I-601 Waiver Brief (Extreme Hardship)",
  "I-130 Family Petition Brief",
  "Declaration Template",
  "Country Conditions Report",
  "I-751 Joint Filing Waiver Brief",
  "I-485 Adjustment of Status Brief",
  "VAWA Self-Petition Brief",
  "U Visa Application Brief",
  "T Visa Application Brief",
  "Cancellation of Removal Brief",
  "Motion to Reopen Brief",
  "BIA Appeal Brief",
  "Naturalization Application Brief",
]

// Categorías de documentos
export const documentCategories = [
  { id: "asylum", name: "Asilo" },
  { id: "family", name: "Familia" },
  { id: "humanitarian", name: "Humanitario" },
  { id: "deportation", name: "Deportación" },
  { id: "waivers", name: "Waivers" },
  { id: "naturalization", name: "Naturalización" },
  { id: "employment", name: "Empleo" },
  { id: "appeals", name: "Apelaciones" },
  { id: "evidence", name: "Documentación de evidencia" },
  { id: "country", name: "Específicos por país" },
  { id: "vulnerable", name: "Poblaciones vulnerables" },
  { id: "administrative", name: "Administrativos" },
  { id: "post", name: "Post-adjudicación" },
  { id: "misc", name: "Misceláneos" },
]

