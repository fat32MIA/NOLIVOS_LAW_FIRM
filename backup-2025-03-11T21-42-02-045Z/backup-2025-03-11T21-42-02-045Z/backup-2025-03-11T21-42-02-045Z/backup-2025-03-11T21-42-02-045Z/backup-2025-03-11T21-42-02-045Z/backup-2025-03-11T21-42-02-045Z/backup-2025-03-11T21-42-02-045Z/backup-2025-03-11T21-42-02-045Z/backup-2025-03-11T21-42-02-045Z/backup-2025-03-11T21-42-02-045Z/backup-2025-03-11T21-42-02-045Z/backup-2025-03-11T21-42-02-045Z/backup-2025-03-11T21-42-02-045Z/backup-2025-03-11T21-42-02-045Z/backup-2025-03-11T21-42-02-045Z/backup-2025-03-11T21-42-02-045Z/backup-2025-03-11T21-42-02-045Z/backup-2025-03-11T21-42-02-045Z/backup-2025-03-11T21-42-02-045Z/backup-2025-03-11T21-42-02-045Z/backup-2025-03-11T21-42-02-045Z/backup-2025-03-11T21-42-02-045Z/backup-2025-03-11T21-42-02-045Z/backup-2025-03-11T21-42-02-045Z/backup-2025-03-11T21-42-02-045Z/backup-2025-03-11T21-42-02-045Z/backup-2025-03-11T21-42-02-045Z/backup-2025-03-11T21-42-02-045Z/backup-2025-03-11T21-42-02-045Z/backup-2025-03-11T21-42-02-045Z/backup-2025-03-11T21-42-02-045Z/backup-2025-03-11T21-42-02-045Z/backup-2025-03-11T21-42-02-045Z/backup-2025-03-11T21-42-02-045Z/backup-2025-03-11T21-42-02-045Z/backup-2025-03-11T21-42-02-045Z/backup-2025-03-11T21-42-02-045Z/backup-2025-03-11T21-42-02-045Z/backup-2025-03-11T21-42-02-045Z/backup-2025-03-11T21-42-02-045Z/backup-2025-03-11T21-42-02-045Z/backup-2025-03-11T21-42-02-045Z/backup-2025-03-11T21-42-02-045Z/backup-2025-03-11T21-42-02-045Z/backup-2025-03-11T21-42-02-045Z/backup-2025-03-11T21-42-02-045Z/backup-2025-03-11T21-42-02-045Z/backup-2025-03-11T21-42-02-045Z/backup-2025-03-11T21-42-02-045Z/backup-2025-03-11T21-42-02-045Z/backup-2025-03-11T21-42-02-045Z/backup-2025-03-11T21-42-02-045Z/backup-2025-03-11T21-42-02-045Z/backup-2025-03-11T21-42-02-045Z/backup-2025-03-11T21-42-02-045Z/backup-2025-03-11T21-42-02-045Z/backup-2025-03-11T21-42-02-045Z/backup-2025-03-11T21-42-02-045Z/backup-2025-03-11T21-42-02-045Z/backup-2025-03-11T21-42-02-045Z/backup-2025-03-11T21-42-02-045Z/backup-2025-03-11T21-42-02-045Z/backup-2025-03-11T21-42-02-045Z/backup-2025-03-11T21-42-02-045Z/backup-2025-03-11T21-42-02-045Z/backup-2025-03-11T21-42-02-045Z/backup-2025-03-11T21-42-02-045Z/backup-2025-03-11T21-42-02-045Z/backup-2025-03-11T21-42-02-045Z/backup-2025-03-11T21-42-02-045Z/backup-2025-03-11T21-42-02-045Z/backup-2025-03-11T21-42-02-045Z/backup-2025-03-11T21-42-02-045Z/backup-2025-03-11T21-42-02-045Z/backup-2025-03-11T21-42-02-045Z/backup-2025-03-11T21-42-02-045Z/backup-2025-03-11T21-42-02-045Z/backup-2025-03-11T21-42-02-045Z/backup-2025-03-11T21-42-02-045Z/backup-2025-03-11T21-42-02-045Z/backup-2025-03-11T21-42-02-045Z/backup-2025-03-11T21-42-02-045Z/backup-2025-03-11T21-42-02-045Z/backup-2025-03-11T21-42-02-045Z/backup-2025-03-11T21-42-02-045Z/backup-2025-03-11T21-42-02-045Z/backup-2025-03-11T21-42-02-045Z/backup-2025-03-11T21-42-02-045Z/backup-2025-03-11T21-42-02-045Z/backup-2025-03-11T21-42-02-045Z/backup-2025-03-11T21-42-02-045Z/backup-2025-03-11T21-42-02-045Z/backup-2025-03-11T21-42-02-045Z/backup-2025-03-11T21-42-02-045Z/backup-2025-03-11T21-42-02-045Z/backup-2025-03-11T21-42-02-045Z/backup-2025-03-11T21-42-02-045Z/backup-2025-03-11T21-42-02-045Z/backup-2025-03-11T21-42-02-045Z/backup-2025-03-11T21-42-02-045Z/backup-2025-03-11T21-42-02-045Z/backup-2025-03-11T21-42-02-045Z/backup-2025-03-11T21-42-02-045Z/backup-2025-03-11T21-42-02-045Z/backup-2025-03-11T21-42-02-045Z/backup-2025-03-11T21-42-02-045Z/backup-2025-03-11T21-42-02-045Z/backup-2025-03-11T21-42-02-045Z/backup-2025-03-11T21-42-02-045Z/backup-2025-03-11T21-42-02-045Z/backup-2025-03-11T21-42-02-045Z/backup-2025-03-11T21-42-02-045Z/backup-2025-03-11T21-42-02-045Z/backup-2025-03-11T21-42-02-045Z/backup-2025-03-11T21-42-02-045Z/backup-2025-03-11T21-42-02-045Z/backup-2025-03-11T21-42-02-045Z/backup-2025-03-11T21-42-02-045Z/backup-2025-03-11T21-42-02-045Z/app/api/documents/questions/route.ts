import { NextResponse } from "next/server"
import type { DocumentQuestion } from "@/lib/ia-migrante-service"

// Función para generar preguntas de ejemplo basadas en el tipo de documento
function generateMockQuestions(documentType: string): DocumentQuestion[] {
  // Preguntas comunes para todos los documentos
  const commonQuestions: DocumentQuestion[] = [
    {
      id: "nombre_completo",
      text: "¿Cuál es tu nombre completo?",
    },
    {
      id: "fecha_nacimiento",
      text: "¿Cuál es tu fecha de nacimiento? (formato: DD/MM/AAAA)",
    },
    {
      id: "pais_origen",
      text: "¿Cuál es tu país de origen?",
    },
    {
      id: "numero_pasaporte",
      text: "¿Cuál es tu número de pasaporte?",
    },
    {
      id: "direccion_actual",
      text: "¿Cuál es tu dirección actual en los Estados Unidos?",
    },
  ]

  // Preguntas específicas según el tipo de documento
  let specificQuestions: DocumentQuestion[] = []

  if (documentType.includes("I-485")) {
    specificQuestions = [
      {
        id: "numero_extranjero",
        text: "¿Cuál es tu número de registro de extranjero (A-Number)?",
      },
      {
        id: "fecha_entrada_eeuu",
        text: "¿Cuándo entraste por última vez a los Estados Unidos? (formato: DD/MM/AAAA)",
      },
      {
        id: "estatus_actual",
        text: "¿Cuál es tu estatus migratorio actual?",
      },
      {
        id: "peticionario_nombre",
        text: "¿Cuál es el nombre completo del peticionario (si aplica)?",
      },
      {
        id: "relacion_peticionario",
        text: "¿Cuál es tu relación con el peticionario?",
      },
    ]
  } else if (documentType.includes("I-130")) {
    specificQuestions = [
      {
        id: "beneficiario_nombre",
        text: "¿Cuál es el nombre completo del beneficiario?",
      },
      {
        id: "relacion_beneficiario",
        text: "¿Cuál es tu relación con el beneficiario?",
      },
      {
        id: "fecha_matrimonio",
        text: "Si es cónyuge, ¿cuál es la fecha de matrimonio? (formato: DD/MM/AAAA)",
      },
      {
        id: "ciudadania_peticionario",
        text: "¿Eres ciudadano estadounidense o residente permanente legal?",
      },
      {
        id: "direccion_beneficiario",
        text: "¿Cuál es la dirección actual del beneficiario?",
      },
    ]
  } else if (documentType.includes("I-765")) {
    specificQuestions = [
      {
        id: "categoria_elegibilidad",
        text: "¿Cuál es tu categoría de elegibilidad para el permiso de trabajo? (ej. C08, C09, etc.)",
      },
      {
        id: "solicitud_previa",
        text: "¿Has solicitado previamente un permiso de trabajo?",
      },
      {
        id: "numero_seguro_social",
        text: "¿Tienes un número de Seguro Social?",
      },
      {
        id: "fecha_ultima_entrada",
        text: "¿Cuál fue la fecha de tu última entrada a los Estados Unidos?",
      },
      {
        id: "estatus_entrada",
        text: "¿Con qué estatus entraste a los Estados Unidos?",
      },
    ]
  } else if (documentType.includes("Carta de Invitación")) {
    specificQuestions = [
      {
        id: "invitado_nombre",
        text: "¿Cuál es el nombre completo de la persona que estás invitando?",
      },
      {
        id: "invitado_relacion",
        text: "¿Cuál es tu relación con la persona invitada?",
      },
      {
        id: "invitado_pais",
        text: "¿De qué país es la persona invitada?",
      },
      {
        id: "fecha_llegada",
        text: "¿Cuál es la fecha prevista de llegada? (formato: DD/MM/AAAA)",
      },
      {
        id: "duracion_estancia",
        text: "¿Cuánto tiempo durará la estancia? (en días, semanas o meses)",
      },
      {
        id: "proposito_visita",
        text: "¿Cuál es el propósito de la visita?",
      },
    ]
  } else if (documentType.includes("Declaración Jurada")) {
    specificQuestions = [
      {
        id: "proposito_declaracion",
        text: "¿Cuál es el propósito de esta declaración jurada?",
      },
      {
        id: "hechos_declarar",
        text: "¿Qué hechos deseas declarar bajo juramento?",
      },
      {
        id: "fecha_hechos",
        text: "¿Cuándo ocurrieron estos hechos? (formato: DD/MM/AAAA)",
      },
      {
        id: "lugar_hechos",
        text: "¿Dónde ocurrieron estos hechos?",
      },
      {
        id: "testigos",
        text: "¿Hubo testigos? Si es así, proporciona sus nombres.",
      },
    ]
  } else {
    // Para otros tipos de documentos, agregamos algunas preguntas genéricas adicionales
    specificQuestions = [
      {
        id: "proposito_documento",
        text: `¿Cuál es el propósito principal de este ${documentType}?`,
      },
      {
        id: "informacion_adicional",
        text: "¿Hay alguna información adicional relevante que debamos incluir?",
      },
      {
        id: "urgencia",
        text: "¿Cuál es el nivel de urgencia de este documento?",
      },
    ]
  }

  // Combinamos las preguntas comunes y específicas
  return [...commonQuestions, ...specificQuestions]
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const documentType = searchParams.get("type")

    if (!documentType) {
      return NextResponse.json({ success: false, error: "El tipo de documento es requerido" }, { status: 400 })
    }

    // En un entorno real, aquí se conectaría con la API de IA MIGRANTE
    // Por ahora, generamos preguntas de ejemplo
    const questions = generateMockQuestions(documentType)

    return NextResponse.json({
      success: true,
      questions,
    })
  } catch (error) {
    console.error("Error al obtener preguntas:", error)
    return NextResponse.json({ success: false, error: "Error al obtener preguntas para el documento" }, { status: 500 })
  }
}

