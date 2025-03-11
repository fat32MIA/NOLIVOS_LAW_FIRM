
'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ImmigrationAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hola, soy el asistente de inmigración. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Función para simular respuestas del chatbot
  const simulateResponse = (userMessage: string) => {
    const responses = [
      "Gracias por tu pregunta sobre inmigración. Para darte información más precisa, ¿podrías proporcionar más detalles?",
      "Entiendo tu situación. Los procesos de inmigración pueden ser complejos. Te recomendaría consultar con un abogado para tu caso específico.",
      "Para ese tipo de visa, necesitarás presentar varios documentos, incluyendo pasaporte válido, formularios de solicitud y evidencia de apoyo financiero.",
      "El tiempo de procesamiento para ese tipo de solicitud varía, pero generalmente toma entre 6 y 12 meses.",
      "Esa es una buena pregunta. Las leyes de inmigración cambian con frecuencia, déjame verificar la información más actualizada para ti."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Simular tiempo de respuesta
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1500);
  };

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-semibold">Asistente de Inmigración</h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map(message => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-xs md:max-w-md ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow'
              }`}
            >
              {message.content}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-left mb-4">
            <div className="inline-block p-3 rounded-lg max-w-xs md:max-w-md bg-white text-gray-800 rounded-bl-none shadow">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>
      
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe tu pregunta aquí..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
