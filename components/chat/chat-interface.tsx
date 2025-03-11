"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy el asistente legal de Nolivos Law Firm. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simular respuesta del asistente
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Gracias por tu mensaje. Estoy aquí para ayudarte con cualquier consulta legal relacionada con inmigración.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
            <AvatarFallback>NL</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Chat con Asistente Legal</CardTitle>
            <CardDescription>
              Consulta tus dudas legales en tiempo real
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarFallback>NL</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div>{message.content}</div>
                <div className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {message.role === 'user' && (
                <Avatar className="ml-2 h-8 w-8">
                  <AvatarFallback>TÚ</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <Avatar className="mr-2 h-8 w-8">
                <AvatarFallback>NL</AvatarFallback>
              </Avatar>
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
            placeholder="Escribe tu mensaje..."
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
