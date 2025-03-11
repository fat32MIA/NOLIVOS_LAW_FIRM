import { NextResponse } from "next/server"
import { OpenAI } from "openai"

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "No text provided for analysis" }, { status: 400 })
    }

    // Inicializar OpenAI con la API key
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Crear un prompt para analizar el documento
    const prompt = `
You are a legal document analyzer specializing in immigration law. Analyze the following document text and provide:

1. Document Type: Identify what kind of legal document this appears to be
2. Key Information: Extract important dates, names, case numbers, and other critical information
3. Purpose: Explain the apparent purpose of this document
4. Potential Issues: Identify any potential issues, missing information, or concerns
5. Next Steps: Suggest appropriate next steps for someone who has received this document

Document Text:
${text.substring(0, 8000)} // Limit text to avoid token limits
`

    // Llamar a la API de OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a legal document analyzer specializing in immigration law.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    })

    // Extraer la respuesta
    const analysis = response.choices[0]?.message?.content || "Unable to analyze the document."

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Error analyzing document:", error)
    return NextResponse.json({ error: "Failed to analyze document" }, { status: 500 })
  }
}

