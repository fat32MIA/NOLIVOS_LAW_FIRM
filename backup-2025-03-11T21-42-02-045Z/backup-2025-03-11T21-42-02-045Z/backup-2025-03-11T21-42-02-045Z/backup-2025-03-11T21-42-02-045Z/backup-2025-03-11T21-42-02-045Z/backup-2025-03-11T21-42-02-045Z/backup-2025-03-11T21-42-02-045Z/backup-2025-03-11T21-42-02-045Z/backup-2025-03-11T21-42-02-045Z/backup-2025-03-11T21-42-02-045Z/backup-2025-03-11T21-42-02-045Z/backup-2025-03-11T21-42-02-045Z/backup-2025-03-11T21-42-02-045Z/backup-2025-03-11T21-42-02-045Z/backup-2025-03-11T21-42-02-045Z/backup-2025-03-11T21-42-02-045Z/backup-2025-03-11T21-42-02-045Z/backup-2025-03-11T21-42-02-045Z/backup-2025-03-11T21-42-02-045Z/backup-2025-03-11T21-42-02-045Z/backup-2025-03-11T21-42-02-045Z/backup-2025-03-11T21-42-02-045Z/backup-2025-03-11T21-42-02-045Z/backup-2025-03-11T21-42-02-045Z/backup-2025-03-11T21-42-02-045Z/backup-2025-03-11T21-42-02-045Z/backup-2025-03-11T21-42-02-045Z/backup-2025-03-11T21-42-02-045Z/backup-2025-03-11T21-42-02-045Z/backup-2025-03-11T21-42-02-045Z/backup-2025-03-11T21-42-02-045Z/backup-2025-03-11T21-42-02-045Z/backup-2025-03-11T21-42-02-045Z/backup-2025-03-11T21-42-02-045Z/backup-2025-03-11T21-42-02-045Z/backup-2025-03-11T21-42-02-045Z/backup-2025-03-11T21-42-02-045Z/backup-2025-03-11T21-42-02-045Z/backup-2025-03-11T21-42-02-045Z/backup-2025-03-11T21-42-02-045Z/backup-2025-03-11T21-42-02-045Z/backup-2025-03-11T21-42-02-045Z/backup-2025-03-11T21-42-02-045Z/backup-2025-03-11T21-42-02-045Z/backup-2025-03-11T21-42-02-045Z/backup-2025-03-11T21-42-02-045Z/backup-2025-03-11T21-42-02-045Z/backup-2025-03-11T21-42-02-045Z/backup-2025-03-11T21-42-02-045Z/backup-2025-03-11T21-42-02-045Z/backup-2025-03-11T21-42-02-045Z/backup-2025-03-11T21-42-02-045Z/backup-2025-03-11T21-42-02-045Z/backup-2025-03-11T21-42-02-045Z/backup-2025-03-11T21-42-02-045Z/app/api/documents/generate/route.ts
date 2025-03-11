import { NextResponse } from "next/server"

// Función para generar un documento de ejemplo en base64
function generateMockDocument(documentType: string, format: string, clientData: Record<string, string>): string {
  // En un entorno real, aquí se conectaría con la API de IA MIGRANTE
  // Por ahora, generamos un documento de ejemplo

  // Simulamos un PDF o DOCX en base64
  // Esto es solo un ejemplo y no es un archivo real
  const mockBase64 =
    "JVBERi0xLjcKJeLjz9MKNSAwIG9iago8PCAvVHlwZSAvWE9iamVjdCAvU3VidHlwZSAvSW1hZ2UgL1dpZHRoIDEyMDAgL0hlaWdodCA4MDAgL0JpdHNQZXJDb21wb25lbnQgOCAvQ29sb3JTcGFjZSAvRGV2aWNlUkdCIC9GaWx0ZXIgL0RDVERlY29kZSAvTGVuZ3RoIDEyMzQ1ID4+CnN0cmVhbQpxd2Vxd2Vxd2UKZQplbmRzdHJlYW0KZW5kb2JqCjYgMCBvYmoKPDwgL1R5cGUgL1hPYmplY3QgL1N1YnR5cGUgL0Zvcm0gL0JCb3ggWzAgMCAxMDAgMTAwXSAvRm9ybVR5cGUgMSAvTWF0cml4IFsxIDAgMCAxIDAgMF0gL1Jlc291cmNlcyA8PCAvUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0gL0ZvbnQgPDwgL0YxIDcgMCBSID4+ID4+IC9MZW5ndGggMjA4ID4+CnN0cmVhbQpxCkJUCi9GMSAxMiBUZgoxMCAxMCBUZAooRG9jdW1lbnRvIGdlbmVyYWRvIHBhcmE6KSBUagoxMCAzMCBUZAooVGlwbzogRG9jdW1lbnRvIGRlIGVqZW1wbG8pIFRqCjEwIDUwIFRkCihGZWNoYTogMDEvMDEvMjAyMykgVGoKMTAgNzAgVGQKKEVzdGUgZXMgdW4gZG9jdW1lbnRvIGRlIHBydWViYSkgVGoKRVQKUQplbmRzdHJlYW0KZW5kb2JqCjcgMCBvYmoKPDwgL1R5cGUgL0ZvbnQgL1N1YnR5cGUgL1R5cGUxIC9CYXNlRm9udCAvSGVsdmV0aWNhID4+CmVuZG9iagozIDAgb2JqCjw8IC9UeXBlIC9QYWdlcyAvS2lkcyBbIDIgMCBSIF0gL0NvdW50IDEgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAzIDAgUiAvUmVzb3VyY2VzIDw8IC9YT2JqZWN0IDw8IC9JbTEgNSAwIFIgPj4gL1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldIC9Gb250IDw8IC9GMSA3IDAgUiA+PiA+PiAvQ29udGVudHMgNCAwIFIgL01lZGlhQm94IFswIDAgNTk1LjI3NiA4NDEuODldID4+CmVuZG9iago0IDAgb2JqCjw8IC9MZW5ndGggMTc5ID4+CnN0cmVhbQpxCkJUCi9GMSAxMiBUZgoxMDAgNzUwIFRkCihEb2N1bWVudG8gZGUgRWplbXBsbykgVGoKMTAwIDczMCBUZAooVGlwbzogRG9jdW1lbnRvIGRlIHBydWViYSkgVGoKMTAwIDcxMCBUZAooRmVjaGE6IDAxLzAxLzIwMjMpIFRqCkVUClEKZW5kc3RyZWFtCmVuZG9iagoxIDAgb2JqCjw8IC9UeXBlIC9DYXRhbG9nIC9QYWdlcyAzIDAgUiA+PgplbmRvYmoKOCAwIG9iago8PCAvUHJvZHVjZXIgKEV4YW1wbGUgUERGIEdlbmVyYXRvcikgL0NyZWF0aW9uRGF0ZSAoRDoyMDIzMDEwMTAwMDAwMFopIC9Nb2REYXRlIChEOjIwMjMwMTAxMDAwMDAwWikgPj4KZW5kb2JqCnhyZWYKMCA5CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMTI3NCAwMDAwMCBuIAowMDAwMDAwNjQ2IDAwMDAwIG4gCjAwMDAwMDA1ODcgMDAwMDAgbiAKMDAwMDAwMTAyNyAwMDAwMCBuIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAyMTAgMDAwMDAgbiAKMDAwMDAwMDUyOCAwMDAwMCBuIAowMDAwMDAxMzIzIDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgOSAvUm9vdCAxIDAgUiAvSW5mbyA4IDAgUiAvSUQgWyA8ZmYwZWUzYjQ5ZDJlNmY4MDNiYWM4YjM2YjEzZjlkZjk+IDxmZjBlZTNiNDlkMmU2ZjgwM2JhYzhiMzZiMTNmOWRmOT4gXSA+PgpzdGFydHhyZWYKMTQ0MgolJUVPRgo="

  return mockBase64
}

export async function POST(request: Request) {
  try {
    const { document_type, formato, respuesta_formato, client_data } = await request.json()

    if (!document_type) {
      return NextResponse.json({ success: false, error: "El tipo de documento es requerido" }, { status: 400 })
    }

    if (!client_data || Object.keys(client_data).length === 0) {
      return NextResponse.json({ success: false, error: "Los datos del cliente son requeridos" }, { status: 400 })
    }

    // Validar formato
    const format = formato && ["pdf", "docx"].includes(formato.toLowerCase()) ? formato.toLowerCase() : "pdf"

    // En un entorno real, aquí se conectaría con la API de IA MIGRANTE
    // Por ahora, generamos un documento de ejemplo
    const contenido_base64 = generateMockDocument(document_type, format, client_data)

    return NextResponse.json({
      success: true,
      contenido_base64,
      formato: format,
    })
  } catch (error) {
    console.error("Error al generar documento:", error)
    return NextResponse.json({ success: false, error: "Error al generar el documento" }, { status: 500 })
  }
}


