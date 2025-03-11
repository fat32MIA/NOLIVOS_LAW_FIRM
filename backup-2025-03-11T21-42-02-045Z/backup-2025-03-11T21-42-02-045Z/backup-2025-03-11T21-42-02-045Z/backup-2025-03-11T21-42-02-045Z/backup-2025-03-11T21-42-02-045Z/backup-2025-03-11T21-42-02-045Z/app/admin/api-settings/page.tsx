'use client';

import ApiKeySettings from '@/components/admin/api-key-settings';

export default function ApiSettingsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Configuración de APIs</h1>
      <ApiKeySettings />
    </div>
  );
}
