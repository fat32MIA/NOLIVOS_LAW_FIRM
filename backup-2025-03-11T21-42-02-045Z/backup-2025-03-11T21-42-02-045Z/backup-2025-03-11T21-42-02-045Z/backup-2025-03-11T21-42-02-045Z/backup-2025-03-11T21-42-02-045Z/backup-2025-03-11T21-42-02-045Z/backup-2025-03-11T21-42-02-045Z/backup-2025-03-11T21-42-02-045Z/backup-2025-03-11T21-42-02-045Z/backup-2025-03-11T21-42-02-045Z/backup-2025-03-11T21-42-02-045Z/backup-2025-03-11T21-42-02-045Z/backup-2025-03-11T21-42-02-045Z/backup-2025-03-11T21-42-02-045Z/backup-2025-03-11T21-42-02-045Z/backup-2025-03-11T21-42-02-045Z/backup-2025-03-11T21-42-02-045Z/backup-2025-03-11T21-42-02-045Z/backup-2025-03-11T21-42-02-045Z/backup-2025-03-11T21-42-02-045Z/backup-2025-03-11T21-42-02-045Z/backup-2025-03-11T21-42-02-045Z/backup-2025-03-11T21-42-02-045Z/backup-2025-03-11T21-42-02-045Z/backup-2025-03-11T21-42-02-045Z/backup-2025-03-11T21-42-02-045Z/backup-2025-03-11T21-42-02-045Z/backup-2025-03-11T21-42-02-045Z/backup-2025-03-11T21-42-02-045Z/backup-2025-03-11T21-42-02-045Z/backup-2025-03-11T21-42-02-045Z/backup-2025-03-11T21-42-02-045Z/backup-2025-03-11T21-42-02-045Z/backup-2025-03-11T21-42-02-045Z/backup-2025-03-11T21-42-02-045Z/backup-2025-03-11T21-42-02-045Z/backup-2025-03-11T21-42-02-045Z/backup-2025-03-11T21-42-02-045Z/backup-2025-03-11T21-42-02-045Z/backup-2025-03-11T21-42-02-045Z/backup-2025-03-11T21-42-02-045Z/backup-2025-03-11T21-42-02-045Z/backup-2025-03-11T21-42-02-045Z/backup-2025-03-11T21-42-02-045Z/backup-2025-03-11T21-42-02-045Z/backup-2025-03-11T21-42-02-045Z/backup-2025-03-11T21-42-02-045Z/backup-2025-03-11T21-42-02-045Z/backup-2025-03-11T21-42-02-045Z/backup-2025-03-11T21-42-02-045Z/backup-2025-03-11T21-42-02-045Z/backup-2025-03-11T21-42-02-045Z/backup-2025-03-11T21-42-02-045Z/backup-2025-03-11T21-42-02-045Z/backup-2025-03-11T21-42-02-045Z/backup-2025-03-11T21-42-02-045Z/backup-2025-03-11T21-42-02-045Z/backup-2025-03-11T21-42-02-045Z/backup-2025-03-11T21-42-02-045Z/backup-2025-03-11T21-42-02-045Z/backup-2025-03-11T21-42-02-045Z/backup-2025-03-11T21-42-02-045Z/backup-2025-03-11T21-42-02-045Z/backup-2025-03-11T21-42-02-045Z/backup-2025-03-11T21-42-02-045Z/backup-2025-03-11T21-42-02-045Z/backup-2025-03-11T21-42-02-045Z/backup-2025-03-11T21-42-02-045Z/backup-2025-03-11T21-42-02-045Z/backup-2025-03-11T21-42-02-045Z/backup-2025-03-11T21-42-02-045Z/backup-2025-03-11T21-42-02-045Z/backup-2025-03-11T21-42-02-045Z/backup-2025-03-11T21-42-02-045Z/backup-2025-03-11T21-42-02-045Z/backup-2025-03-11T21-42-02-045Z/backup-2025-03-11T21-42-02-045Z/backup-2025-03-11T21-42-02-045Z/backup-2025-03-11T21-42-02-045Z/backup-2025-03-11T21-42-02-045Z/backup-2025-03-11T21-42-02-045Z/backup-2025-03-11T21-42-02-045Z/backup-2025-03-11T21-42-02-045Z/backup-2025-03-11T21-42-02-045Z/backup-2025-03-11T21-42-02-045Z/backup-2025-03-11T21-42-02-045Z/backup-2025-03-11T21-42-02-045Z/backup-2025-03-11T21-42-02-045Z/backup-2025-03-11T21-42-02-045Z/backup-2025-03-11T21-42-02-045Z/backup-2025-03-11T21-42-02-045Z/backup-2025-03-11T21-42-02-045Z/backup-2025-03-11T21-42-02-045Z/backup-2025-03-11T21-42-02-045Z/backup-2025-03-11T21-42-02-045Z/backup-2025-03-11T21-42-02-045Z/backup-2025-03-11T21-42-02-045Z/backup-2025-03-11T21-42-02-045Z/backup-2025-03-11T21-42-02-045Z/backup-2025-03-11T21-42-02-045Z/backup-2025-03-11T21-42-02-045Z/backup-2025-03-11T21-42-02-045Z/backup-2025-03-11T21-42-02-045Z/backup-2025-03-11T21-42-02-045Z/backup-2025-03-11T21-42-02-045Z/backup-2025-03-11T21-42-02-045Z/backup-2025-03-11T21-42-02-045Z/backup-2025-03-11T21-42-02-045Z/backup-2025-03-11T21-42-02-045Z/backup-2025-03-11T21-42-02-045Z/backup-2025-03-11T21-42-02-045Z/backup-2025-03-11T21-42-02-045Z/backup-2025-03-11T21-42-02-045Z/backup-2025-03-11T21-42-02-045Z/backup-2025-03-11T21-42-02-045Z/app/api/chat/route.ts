import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Verificar que tenemos la API key de OpenAI
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable")
}

export async function POST(request: Request) {
  try {
    const { message, history, userRole } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "El mensaje es requerido" }, { status: 400 })
    }

    // Construir el contexto para el modelo
    let systemPrompt = `Eres un asistente legal especializado en inmigración en los Estados Unidos. 
    Tu objetivo es proporcionar información precisa y útil sobre procesos migratorios, requisitos de visas, 
    y documentación legal. Responde en español de manera clara y concisa.`

    if (userRole === "lawyer") {
      systemPrompt += `\nEstás hablando con un abogado de inmigración, por lo que puedes usar terminología legal más técnica.`
    } else {
      systemPrompt += `\nEstás hablando con un cliente, así que usa un lenguaje sencillo y evita jerga legal compleja.`
    }

    // Construir el historial de conversación para el contexto
    let conversationHistory = ""
    if (history && history.length > 0) {
      conversationHistory = history
        .map((msg: { role: string; content: string }) => {
          if (msg.role === "user") {
            return `Usuario: ${msg.content}`
          } else if (msg.role === "assistant") {
            return `Asistente: ${msg.content}`
          } else {
            return `Sistema: ${msg.content}`
          }
        })
        .join("\n\n")
    }

    // Construir el prompt completo
    const fullPrompt = `${conversationHistory ? conversationHistory + "\n\n" : ""}Usuario: ${message}\n\nAsistente:`

    // Generar respuesta usando OpenAI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: fullPrompt,
      system: systemPrompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Error en la API de chat:", error)
    return NextResponse.json({ error: "Error al procesar el mensaje" }, { status: 500 })
  }
}

