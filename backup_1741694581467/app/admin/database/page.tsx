
export default function DatabasePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Configuración de Base de Datos</h1>
      <p className="mb-4">Esta es una versión simplificada de la página de configuración de base de datos.</p>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Conexión a Base de Datos</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Host</label>
            <input type="text" defaultValue="localhost" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Puerto</label>
            <input type="text" defaultValue="5432" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre de Base de Datos</label>
            <input type="text" defaultValue="nolivos_law" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <input type="text" defaultValue="postgres" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" defaultValue="********" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Guardar Configuración
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Estado de la Base de Datos</h2>
        <div className="mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span>Conectado</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Última sincronización: hace 5 minutos</p>
        </div>
        <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Probar Conexión
        </button>
      </div>
    </div>
  );
}
