"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy el asistente de inmigración. ¿En qué puedo ayudarte hoy?'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    // Añadir mensaje del usuario
    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simular respuesta del asistente
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: 'Gracias por tu pregunta. Estoy procesando la información y te responderé en breve.'
      }
      setMessages(prev => [...prev, assistantMessage])
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Asistente de Inmigración</CardTitle>
        <CardDescription>
          Haz preguntas sobre procesos de inmigración y te ayudaré.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-900">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full space-x-2">
          <Input
            placeholder="Escribe tu pregunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            Enviar
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
