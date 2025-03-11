'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot } from 'lucide-react';

export default function UnifiedLegalAssistant() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: '¡Hola! Soy tu asistente legal. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Añadir mensaje del usuario
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setIsLoading(true);
    
    // Simular respuesta del asistente
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Gracias por tu consulta. Estoy procesando tu solicitud. Para casos de inmigración, necesitaría más detalles específicos sobre tu situación para poder brindarte la mejor orientación posible.' 
        }
      ]);
      setIsLoading(false);
    }, 1500);
    
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="mr-2 h-6 w-6 text-blue-600" />
            Asistente Legal
          </CardTitle>
          <CardDescription>
            Consulta cualquier duda legal relacionada con inmigración
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
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex w-full items-center space-x-2">
            <Input
              placeholder="Escribe tu consulta legal aquí..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}