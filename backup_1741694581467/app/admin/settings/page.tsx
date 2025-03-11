
export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Configuración General</h1>
      <p className="mb-4">Esta es una versión simplificada de la página de configuración general.</p>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Información de la Empresa</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre de la Empresa</label>
            <input type="text" defaultValue="Nolivos Law Firm" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <input type="text" defaultValue="123 Calle Principal" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ciudad</label>
            <input type="text" defaultValue="Ciudad Ejemplo" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Código Postal</label>
            <input type="text" defaultValue="12345" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input type="tel" defaultValue="+1 (555) 123-4567" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" defaultValue="info@nolivoslaw.com" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Preferencias del Sistema</h2>
        <form className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Modo Oscuro</h3>
              <p className="text-sm text-gray-500">Activar el modo oscuro para la interfaz</p>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="dark-mode" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="dark-mode" className="ml-2 block text-sm text-gray-900 sr-only">Modo Oscuro</label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Notificaciones por Email</h3>
              <p className="text-sm text-gray-500">Recibir notificaciones por email</p>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="email-notifications" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900 sr-only">Notificaciones por Email</label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Notificaciones Push</h3>
              <p className="text-sm text-gray-500">Recibir notificaciones push</p>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="push-notifications" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="push-notifications" className="ml-2 block text-sm text-gray-900 sr-only">Notificaciones Push</label>
            </div>
          </div>
          <div>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Guardar Preferencias
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
