
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    // Simulación de respuesta
    const responses = [
      "Gracias por tu pregunta sobre inmigración. Para darte información más precisa, ¿podrías proporcionar más detalles?",
      "Entiendo tu situación. Los procesos de inmigración pueden ser complejos. Te recomendaría consultar con un abogado para tu caso específico.",
      "Para ese tipo de visa, necesitarás presentar varios documentos, incluyendo pasaporte válido, formularios de solicitud y evidencia de apoyo financiero.",
      "El tiempo de procesamiento para ese tipo de solicitud varía, pero generalmente toma entre 6 y 12 meses.",
      "Esa es una buena pregunta. Las leyes de inmigración cambian con frecuencia, déjame verificar la información más actualizada para ti."
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en la ruta de immigration-chat:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
