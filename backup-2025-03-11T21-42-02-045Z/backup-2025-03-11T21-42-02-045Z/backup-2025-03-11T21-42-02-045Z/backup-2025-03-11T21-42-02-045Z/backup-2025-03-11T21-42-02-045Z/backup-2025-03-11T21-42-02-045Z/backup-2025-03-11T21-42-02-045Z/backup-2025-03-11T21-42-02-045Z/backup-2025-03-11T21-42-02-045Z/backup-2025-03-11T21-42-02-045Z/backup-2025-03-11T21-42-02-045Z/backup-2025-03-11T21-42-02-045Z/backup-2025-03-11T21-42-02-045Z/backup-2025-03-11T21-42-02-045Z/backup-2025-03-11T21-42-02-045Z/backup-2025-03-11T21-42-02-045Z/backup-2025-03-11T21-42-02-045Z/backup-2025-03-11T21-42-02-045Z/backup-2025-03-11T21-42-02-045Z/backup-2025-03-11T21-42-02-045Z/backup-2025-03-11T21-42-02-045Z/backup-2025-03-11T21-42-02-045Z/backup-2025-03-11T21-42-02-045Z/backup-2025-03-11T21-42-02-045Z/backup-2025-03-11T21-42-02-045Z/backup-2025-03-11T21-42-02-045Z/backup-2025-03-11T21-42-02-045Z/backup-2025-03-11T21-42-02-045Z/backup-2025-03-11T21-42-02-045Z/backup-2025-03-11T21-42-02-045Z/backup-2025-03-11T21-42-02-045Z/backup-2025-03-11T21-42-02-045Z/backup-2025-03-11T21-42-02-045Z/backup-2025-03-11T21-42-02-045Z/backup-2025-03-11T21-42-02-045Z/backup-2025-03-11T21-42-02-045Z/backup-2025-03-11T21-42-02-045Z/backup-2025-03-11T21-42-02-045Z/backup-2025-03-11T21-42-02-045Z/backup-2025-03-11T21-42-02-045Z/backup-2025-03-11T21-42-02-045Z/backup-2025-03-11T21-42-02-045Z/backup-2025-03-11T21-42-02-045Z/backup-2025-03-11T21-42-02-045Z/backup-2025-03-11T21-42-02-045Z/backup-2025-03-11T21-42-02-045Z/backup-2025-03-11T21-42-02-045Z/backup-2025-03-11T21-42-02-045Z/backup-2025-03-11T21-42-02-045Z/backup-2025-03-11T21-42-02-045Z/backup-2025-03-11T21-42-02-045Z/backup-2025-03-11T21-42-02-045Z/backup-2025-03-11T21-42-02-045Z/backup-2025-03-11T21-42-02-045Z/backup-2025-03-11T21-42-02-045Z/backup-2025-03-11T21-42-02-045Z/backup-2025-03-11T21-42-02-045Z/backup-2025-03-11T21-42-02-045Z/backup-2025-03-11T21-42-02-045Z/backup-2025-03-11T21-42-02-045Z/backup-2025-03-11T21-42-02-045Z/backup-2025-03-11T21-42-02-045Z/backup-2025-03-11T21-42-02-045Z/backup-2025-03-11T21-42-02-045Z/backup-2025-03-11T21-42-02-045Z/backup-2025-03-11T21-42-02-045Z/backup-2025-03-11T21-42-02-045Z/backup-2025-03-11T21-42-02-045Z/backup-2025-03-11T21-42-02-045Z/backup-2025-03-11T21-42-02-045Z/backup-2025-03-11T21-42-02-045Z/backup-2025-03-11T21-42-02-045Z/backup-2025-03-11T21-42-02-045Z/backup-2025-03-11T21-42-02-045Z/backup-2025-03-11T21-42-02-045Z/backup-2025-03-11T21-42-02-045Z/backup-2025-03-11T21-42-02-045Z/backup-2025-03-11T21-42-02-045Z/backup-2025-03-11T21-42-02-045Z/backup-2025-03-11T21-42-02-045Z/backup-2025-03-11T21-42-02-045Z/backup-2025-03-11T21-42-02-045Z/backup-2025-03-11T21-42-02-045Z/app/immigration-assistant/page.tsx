'use client';

import Chatbot from '@/components/immigration/chatbot';

export default function ImmigrationAssistantPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Asistente de Inmigración</h1>
      <Chatbot />
    </div>
  );
}
