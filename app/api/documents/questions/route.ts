import { NextResponse } from "next/server"
import type { DocumentQuestion } from "@/lib/ia-migrante-service"
import { IaMigranteService } from "@/lib/ia-migrante-service"

// Función para generar preguntas de ejemplo basadas en el tipo de documento
function generateMockQuestions(documentType: string): DocumentQuestion[] {
  return IaMigranteService.getQuestionsForDocument(documentType);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const documentType = url.searchParams.get('documentType') || 'general';
  
  // Generar preguntas de ejemplo para el tipo de documento
  const questions = await IaMigranteService.getQuestionsForDocument(documentType);
  
  return NextResponse.json({ questions });
}
