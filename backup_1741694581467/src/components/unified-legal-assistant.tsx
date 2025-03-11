"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Send,
  Bot,
  User,
  FileText,
  Download,
  CheckCircle,
  Loader2,
  Sparkles,
  Eye,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Newspaper,
} from "lucide-react"
import { documentTypes } from "@/lib/ia-migrante-service"
import { ImmigrationNewsFeed } from "@/components/immigration-news-feed"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

interface DocumentQuestion {
  id: string
  text: string
}

interface ClientData {
  [key: string]: string
}

export function UnifiedLegalAssistant() {
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "¡Bienvenido al asistente legal de inmigración! Puedo ayudarte a responder preguntas sobre inmigración y generar documentos legales personalizados. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([])

  // Document generation state
  const [selectedDocumentType, setSelectedDocumentType] = useState("")
  const [documentQuestions, setDocumentQuestions] = useState<DocumentQuestion[]>([])
  const [clientData, setClientData] = useState<ClientData>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1)
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)
  const [isGeneratingDocument, setIsGeneratingDocument] = useState(false)
  const [generatedDocumentBase64, setGeneratedDocumentBase64] = useState<string | null>(null)
  const [documentFormat, setDocumentFormat] = useState<"pdf" | "docx">("pdf")
  const [showDocumentPanel, setShowDocumentPanel] = useState(false)

  // News state
  const [showNewsPanel, setShowNewsPanel] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Simulate typing effect for AI responses
  const simulateTyping = (text: string, callback?: () => void) => {
    setIsTyping(true)
    let tempMessage = ""
    let index = 0

    const interval = setInterval(() => {
      if (index < text.length) {
        tempMessage += text.charAt(index)
        setMessages((prev) => [...prev.slice(0, prev.length - 1), { ...prev[prev.length - 1], content: tempMessage }])
        index++
      } else {
        clearInterval(interval)
        setIsTyping(false)
        if (callback) callback()
      }
    }, 15) // Adjust speed as needed
  }

  // Fetch document questions from IA MIGRANTE API
  const fetchDocumentQuestions = async (docType: string) => {
    setIsLoadingQuestions(true)
    try {
      const response = await fetch(`/api/documents/questions?type=${encodeURIComponent(docType)}`)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.questions || data.questions.length === 0) {
        throw new Error("No se encontraron preguntas para este tipo de documento")
      }

      setDocumentQuestions(data.questions)
      setCurrentQuestionIndex(0)

      // Add system message about the document type
      const systemMessage: Message = {
        role: "system",
        content: `Has seleccionado el documento "${docType}". Ahora te haré algunas preguntas para completar la información necesaria.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, systemMessage])

      // Add first question
      const assistantMessage: Message = {
        role: "assistant",
        content: data.questions[0].text,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])

      // Update chat history for OpenAI context
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Has seleccionado el documento "${docType}". Ahora te haré algunas preguntas para completar la información necesaria.`,
        },
        { role: "assistant", content: data.questions[0].text },
      ])
    } catch (error) {
      console.error("Error fetching document questions:", error)
      const errorMessage: Message = {
        role: "system",
        content:
          "Lo siento, hubo un error al obtener las preguntas para este documento. Por favor, intenta de nuevo más tarde o selecciona otro tipo de documento.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])

      // Update chat history for OpenAI context
      setChatHistory((prev) => [
        ...prev,
        { role: "system", content: "Lo siento, hubo un error al obtener las preguntas para este documento." },
      ])
    } finally {
      setIsLoadingQuestions(false)
    }
  }

  // Handle document type selection
  const handleDocumentTypeSelect = (docType: string) => {
    setSelectedDocumentType(docType)
    setClientData({})
    setCurrentQuestionIndex(-1)
    setGeneratedDocumentBase64(null)
    setShowDocumentPanel(true)
    setShowNewsPanel(false)

    // Add user message about document selection
    const userMessage: Message = {
      role: "user",
      content: `Quiero generar un documento de tipo "${docType}"`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Update chat history for OpenAI context
    setChatHistory((prev) => [...prev, { role: "user", content: `Quiero generar un documento de tipo "${docType}"` }])

    // Fetch questions for this document type
    fetchDocumentQuestions(docType)
  }

  // Process user answer and move to next question
  const processAnswer = (answer: string) => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < documentQuestions.length) {
      const currentQuestion = documentQuestions[currentQuestionIndex]

      // Save answer to client data
      setClientData((prev) => ({
        ...prev,
        [currentQuestion.id]: answer,
      }))

      // Move to next question or generate document if all questions answered
      if (currentQuestionIndex < documentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)

        // Add next question
        const nextQuestion = documentQuestions[currentQuestionIndex + 1]
        const assistantMessage: Message = {
          role: "assistant",
          content: nextQuestion.text,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])

        // Update chat history for OpenAI context
        setChatHistory((prev) => [...prev, { role: "assistant", content: nextQuestion.text }])
      } else {
        // All questions answered, ask if ready to generate
        const assistantMessage: Message = {
          role: "assistant",
          content: "¡Gracias! He recopilado toda la información necesaria. ¿Quieres generar el documento ahora?",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])

        // Update chat history for OpenAI context
        setChatHistory((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "¡Gracias! He recopilado toda la información necesaria. ¿Quieres generar el documento ahora?",
          },
        ])

        setCurrentQuestionIndex(-2) // Special value to indicate ready to generate
      }
    }
  }

  // Generate document using IA MIGRANTE API
  const handleGenerateDocument = async () => {
    setIsGeneratingDocument(true)

    // Add system message about document generation
    const systemMessage: Message = {
      role: "system",
      content: "Generando documento, por favor espera...",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, systemMessage])

    // Update chat history for OpenAI context
    setChatHistory((prev) => [...prev, { role: "system", content: "Generando documento, por favor espera..." }])

    try {
      const response = await fetch("/api/documents/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          document_type: selectedDocumentType,
          formato: documentFormat,
          respuesta_formato: "json_base64",
          client_data: clientData,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.contenido_base64) {
        throw new Error("No se pudo generar el contenido del documento")
      }

      // Save generated document
      setGeneratedDocumentBase64(data.contenido_base64)

      // Add success message
      const successMessage: Message = {
        role: "system",
        content:
          "¡Documento generado exitosamente! Puedes previsualizarlo y descargarlo usando los botones a continuación.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, successMessage])

      // Update chat history for OpenAI context
      setChatHistory((prev) => [
        ...prev,
        { role: "system", content: "¡Documento generado exitosamente! Puedes previsualizarlo y descargarlo." },
      ])
    } catch (error) {
      console.error("Error generating document:", error)

      // Add error message
      const errorMessage: Message = {
        role: "system",
        content:
          "Lo siento, hubo un error al generar el documento. Por favor, verifica la información proporcionada e intenta de nuevo.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])

      // Update chat history for OpenAI context
      setChatHistory((prev) => [
        ...prev,
        { role: "system", content: "Lo siento, hubo un error al generar el documento." },
      ])
    } finally {
      setIsGeneratingDocument(false)
    }
  }

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Update chat history for OpenAI context
    setChatHistory((prev) => [...prev, { role: "user", content: inputMessage }])

    setInputMessage("")

    // Check for news-related commands
    if (
      inputMessage.toLowerCase().includes("noticias") ||
      inputMessage.toLowerCase().includes("actualidad") ||
      inputMessage.toLowerCase().includes("novedades")
    ) {
      setShowNewsPanel(true)
      setShowDocumentPanel(false)

      // Add assistant message about news
      const assistantMessage: Message = {
        role: "assistant",
        content:
          "He abierto el panel de noticias de inmigración donde puedes ver las últimas actualizaciones de ICE y USCIS. ¿Hay algún tema específico sobre el que quieras más información?",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])

      // Update chat history for OpenAI context
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "He abierto el panel de noticias de inmigración donde puedes ver las últimas actualizaciones.",
        },
      ])

      return
    }

    // If we're in the question-answer flow, process the answer
    if (currentQuestionIndex >= 0 && currentQuestionIndex < documentQuestions.length) {
      processAnswer(inputMessage)
      return
    }

    // If we're ready to generate and user confirms
    if (
      currentQuestionIndex === -2 &&
      (inputMessage.toLowerCase().includes("sí") ||
        inputMessage.toLowerCase().includes("si") ||
        inputMessage.toLowerCase().includes("generar") ||
        inputMessage.toLowerCase().includes("adelante"))
    ) {
      handleGenerateDocument()
      return
    }

    // Add temporary assistant message
    const tempAssistantMessage: Message = {
      role: "assistant",
      content: "",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, tempAssistantMessage])

    // If no document type selected yet, check if user message contains a document type
    if (!selectedDocumentType) {
      const matchedDocType = documentTypes.find(
        (docType) => docType && inputMessage.toLowerCase().includes(docType.toLowerCase()),
      )

      if (matchedDocType) {
        handleDocumentTypeSelect(matchedDocType)
        return
      }
    }

    // Otherwise, use OpenAI to generate a response
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          history: chatHistory,
          userRole: "client",
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      if (data.message) {
        simulateTyping(data.message)

        // Update chat history for OpenAI context
        setChatHistory((prev) => [...prev, { role: "assistant", content: data.message }])
      } else if (data.error) {
        // Handle error
        setMessages((prev) => [
          ...prev.slice(0, prev.length - 1),
          {
            role: "system",
            content: "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.",
            timestamp: new Date(),
          },
        ])

        // Update chat history for OpenAI context
        setChatHistory((prev) => [
          ...prev,
          { role: "system", content: "Lo siento, hubo un error al procesar tu mensaje." },
        ])
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        {
          role: "system",
          content: "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.",
          timestamp: new Date(),
        },
      ])

      // Update chat history for OpenAI context
      setChatHistory((prev) => [
        ...prev,
        { role: "system", content: "Lo siento, hubo un error al procesar tu mensaje." },
      ])
    }
  }

  // Download generated document
  const downloadDocument = () => {
    if (!generatedDocumentBase64) return

    const linkSource = `data:application/${documentFormat};base64,${generatedDocumentBase64}`
    const downloadLink = document.createElement("a")
    const fileName = `${selectedDocumentType.replace(/\s+/g, "_")}.${documentFormat}`

    downloadLink.href = linkSource
    downloadLink.download = fileName
    downloadLink.click()
  }

  // Preview generated document
  const previewDocument = () => {
    if (!generatedDocumentBase64) return

    const linkSource = `data:application/${documentFormat};base64,${generatedDocumentBase64}`
    window.open(linkSource, "_blank")
  }

  // Reset document generation
  const resetDocumentGeneration = () => {
    setSelectedDocumentType("")
    setDocumentQuestions([])
    setClientData({})
    setCurrentQuestionIndex(-1)
    setGeneratedDocumentBase64(null)

    // Add system message
    const systemMessage: Message = {
      role: "system",
      content: "Se ha reiniciado el proceso de generación de documentos. ¿En qué más puedo ayudarte?",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, systemMessage])

    // Update chat history for OpenAI context
    setChatHistory((prev) => [
      ...prev,
      { role: "system", content: "Se ha reiniciado el proceso de generación de documentos." },
    ])
  }

  // Toggle news panel
  const toggleNewsPanel = () => {
    setShowNewsPanel(!showNewsPanel)
    if (!showNewsPanel) {
      setShowDocumentPanel(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">Asistente Legal de Inmigración</CardTitle>
              <CardDescription>Powered by OpenAI + IA Migrante</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-600">
              En línea
            </Badge>
            <Button variant="outline" size="sm" onClick={toggleNewsPanel} className="gap-1">
              <Newspaper className="h-4 w-4" />
              <span className="hidden sm:inline">Noticias</span>
            </Button>
            {!selectedDocumentType && (
              <Select onValueChange={handleDocumentTypeSelect}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Generar documento legal" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((docType) => (
                    <SelectItem key={docType} value={docType}>
                      {docType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </CardHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Chat panel */}
          <div className={`flex-1 flex flex-col ${showDocumentPanel || showNewsPanel ? "lg:w-1/2" : "w-full"}`}>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} ${message.role === "system" ? "justify-center" : ""}`}
                >
                  {message.role === "system" ? (
                    <div className="bg-muted/50 rounded-lg p-3 max-w-[85%] text-center text-sm">{message.content}</div>
                  ) : message.role === "user" ? (
                    <div className="flex gap-2 items-start">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[85%]">
                        <p>{message.content}</p>
                        <div className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="bg-muted rounded-lg p-3 max-w-[85%]">
                        <p>{message.content}</p>
                        {isTyping && index === messages.length - 1 && (
                          <div className="mt-1 flex gap-1">
                            <div
                              className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        )}
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>

            <CardFooter className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex w-full gap-2"
              >
                <Input
                  placeholder="Escribe tu mensaje..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isTyping || isLoadingQuestions || isGeneratingDocument}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputMessage.trim() || isTyping || isLoadingQuestions || isGeneratingDocument}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </div>

          {/* Document panel - only shown when a document is selected */}
          {showDocumentPanel && (
            <div className="hidden lg:flex lg:flex-col lg:w-1/2 border-l">
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium text-sm">Documento Legal</h3>
                    <p className="text-xs text-muted-foreground">{selectedDocumentType || "Selecciona un documento"}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={documentFormat} onValueChange={(value) => setDocumentFormat(value as "pdf" | "docx")}>
                    <SelectTrigger className="w-[80px] h-8">
                      <SelectValue placeholder="Formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="docx">DOCX</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" onClick={() => setShowDocumentPanel(false)} className="lg:hidden">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {!generatedDocumentBase64 ? (
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h3 className="text-sm font-medium mb-2">Información del Documento</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Tipo:</span>
                          <span className="text-sm">{selectedDocumentType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Formato:</span>
                          <span className="text-sm">{documentFormat.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Estado:</span>
                          <Badge
                            variant="outline"
                            className={
                              isGeneratingDocument
                                ? "bg-yellow-500/10 text-yellow-600"
                                : Object.keys(clientData).length > 0
                                  ? "bg-blue-500/10 text-blue-600"
                                  : "bg-gray-500/10 text-gray-600"
                            }
                          >
                            {isGeneratingDocument
                              ? "Generando..."
                              : Object.keys(clientData).length > 0
                                ? "En progreso"
                                : "No iniciado"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {Object.keys(clientData).length > 0 && (
                      <div className="border rounded-md p-4">
                        <h3 className="text-sm font-medium mb-2">Datos Recopilados</h3>
                        <div className="space-y-2">
                          {Object.entries(clientData).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-sm font-medium">{key}:</span>
                              <span className="text-sm">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {documentQuestions.length > 0 && (
                      <div className="border rounded-md p-4">
                        <h3 className="text-sm font-medium mb-2">Progreso</h3>
                        <div className="space-y-4">
                          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-primary h-full transition-all duration-300 ease-in-out"
                              style={{
                                width: `${
                                  documentQuestions.length > 0
                                    ? (Object.keys(clientData).length / documentQuestions.length) * 100
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>
                              Preguntas respondidas: {Object.keys(clientData).length}/{documentQuestions.length}
                            </span>
                            <span>
                              {Math.round(
                                documentQuestions.length > 0
                                  ? (Object.keys(clientData).length / documentQuestions.length) * 100
                                  : 0,
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {isGeneratingDocument && (
                      <div className="flex flex-col items-center justify-center p-6 border rounded-md">
                        <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                        <h3 className="text-sm font-medium mb-2">Generando Documento</h3>
                        <p className="text-xs text-muted-foreground text-center">
                          Estamos procesando tu información y generando el documento legal. Esto puede tomar unos
                          momentos...
                        </p>
                      </div>
                    )}

                    {currentQuestionIndex === -2 && !isGeneratingDocument && (
                      <Button className="w-full" onClick={handleGenerateDocument}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generar Documento
                      </Button>
                    )}

                    <Button variant="outline" size="sm" className="w-full" onClick={resetDocumentGeneration}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reiniciar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 bg-green-50 dark:bg-green-900/10">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <h3 className="text-sm font-medium text-green-600 dark:text-green-400">
                          Documento Generado Exitosamente
                        </h3>
                      </div>
                      <p className="text-xs text-green-600/80 dark:text-green-400/80 mb-4">
                        Tu documento ha sido generado correctamente. Puedes previsualizarlo o descargarlo usando los
                        botones a continuación.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={previewDocument}>
                          <Eye className="h-4 w-4 mr-2" />
                          Previsualizar
                        </Button>
                        <Button size="sm" onClick={downloadDocument}>
                          <Download className="h-4 w-4 mr-2" />
                          Descargar {documentFormat.toUpperCase()}
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted p-2 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">
                            {selectedDocumentType}.{documentFormat}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={previewDocument}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={downloadDocument}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-900 min-h-[200px] flex items-center justify-center">
                        <div className="text-center">
                          <img
                            src={`data:image/${documentFormat === "pdf" ? "png" : "png"};base64,${generatedDocumentBase64.substring(0, 100)}`}
                            alt="Document Preview"
                            className="max-w-full max-h-[200px] object-contain mx-auto opacity-50"
                          />
                          <p className="mt-4 text-xs text-muted-foreground">
                            Haz clic en "Previsualizar" para ver el documento completo
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full" onClick={resetDocumentGeneration}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Crear Nuevo Documento
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* News panel */}
          {showNewsPanel && (
            <div className="hidden lg:flex lg:flex-col lg:w-1/2 border-l">
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium text-sm">Noticias de Inmigración</h3>
                    <p className="text-xs text-muted-foreground">Últimas actualizaciones de ICE y USCIS</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowNewsPanel(false)}>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <ImmigrationNewsFeed />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Mobile panels toggle */}
      <div className="lg:hidden mt-4 flex gap-2">
        {selectedDocumentType && (
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-between"
            onClick={() => {
              setShowDocumentPanel(!showDocumentPanel)
              if (!showDocumentPanel) {
                setShowNewsPanel(false)
              }
            }}
          >
            <span className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              {showDocumentPanel ? "Ocultar panel de documento" : "Mostrar panel de documento"}
            </span>
            {showDocumentPanel ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        )}

        <Button
          variant="outline"
          className="flex-1 flex items-center justify-between"
          onClick={() => {
            setShowNewsPanel(!showNewsPanel)
            if (!showNewsPanel) {
              setShowDocumentPanel(false)
            }
          }}
        >
          <span className="flex items-center">
            <Newspaper className="h-4 w-4 mr-2" />
            {showNewsPanel ? "Ocultar noticias" : "Mostrar noticias"}
          </span>
          {showNewsPanel ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile document panel */}
      {showDocumentPanel && selectedDocumentType && (
        <Card className="lg:hidden mt-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              {selectedDocumentType}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {!generatedDocumentBase64 ? (
              <>
                {Object.keys(clientData).length > 0 && (
                  <div className="border rounded-md p-3">
                    <h3 className="text-xs font-medium mb-2">Datos Recopilados</h3>
                    <div className="space-y-1">
                      {Object.entries(clientData).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-xs font-medium">{key}:</span>
                          <span className="text-xs">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {documentQuestions.length > 0 && (
                  <div className="space-y-2">
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-300 ease-in-out"
                        style={{
                          width: `${
                            documentQuestions.length > 0
                              ? (Object.keys(clientData).length / documentQuestions.length) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        Preguntas: {Object.keys(clientData).length}/{documentQuestions.length}
                      </span>
                      <span>
                        {Math.round(
                          documentQuestions.length > 0
                            ? (Object.keys(clientData).length / documentQuestions.length) * 100
                            : 0,
                        )}
                        %
                      </span>
                    </div>
                  </div>
                )}

                {currentQuestionIndex === -2 && !isGeneratingDocument && (
                  <Button className="w-full" size="sm" onClick={handleGenerateDocument}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generar Documento
                  </Button>
                )}
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <p className="text-xs text-green-600">Documento generado exitosamente</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={previewDocument}>
                    <Eye className="h-3 w-3 mr-1" />
                    Previsualizar
                  </Button>
                  <Button size="sm" className="flex-1" onClick={downloadDocument}>
                    <Download className="h-3 w-3 mr-1" />
                    Descargar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Mobile news panel */}
      {showNewsPanel && (
        <div className="lg:hidden mt-2">
          <ImmigrationNewsFeed />
        </div>
      )}
    </div>
  )
}


