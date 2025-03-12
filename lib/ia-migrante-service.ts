// Definición de tipos para el servicio de IA Migrante
export interface DocumentQuestion {
  id: string;
  question: string;
  options?: string[];
  required?: boolean;
  documentType?: string;
}

// Servicio para manejar preguntas relacionadas con documentos de inmigración
export class IaMigranteService {
  // Función para obtener preguntas relacionadas con un tipo de documento
  static async getQuestionsForDocument(documentType: string): Promise<DocumentQuestion[]> {
    // Aquí se implementaría la lógica real para obtener las preguntas desde una API
    // Por ahora devolvemos datos de ejemplo
    return [
      {
        id: '1',
        question: '¿Cuál es el propósito del documento?',
        options: ['Visa de trabajo', 'Residencia permanente', 'Asilo', 'Reunificación familiar'],
        required: true,
        documentType
      },
      {
        id: '2',
        question: '¿Cuándo fue emitido el documento?',
        required: true,
        documentType
      },
      {
        id: '3',
        question: '¿Quién es el solicitante principal?',
        required: true,
        documentType
      }
    ];
  }

  // Función para enviar respuestas a las preguntas de documentos
  static async submitAnswers(documentType: string, answers: Record<string, string>): Promise<{success: boolean, message: string}> {
    // Aquí se implementaría la lógica real para enviar las respuestas a una API
    console.log(`Enviando respuestas para documento de tipo ${documentType}`, answers);
    
    // Simular una respuesta exitosa
    return {
      success: true,
      message: 'Respuestas enviadas correctamente'
    };
  }
}
