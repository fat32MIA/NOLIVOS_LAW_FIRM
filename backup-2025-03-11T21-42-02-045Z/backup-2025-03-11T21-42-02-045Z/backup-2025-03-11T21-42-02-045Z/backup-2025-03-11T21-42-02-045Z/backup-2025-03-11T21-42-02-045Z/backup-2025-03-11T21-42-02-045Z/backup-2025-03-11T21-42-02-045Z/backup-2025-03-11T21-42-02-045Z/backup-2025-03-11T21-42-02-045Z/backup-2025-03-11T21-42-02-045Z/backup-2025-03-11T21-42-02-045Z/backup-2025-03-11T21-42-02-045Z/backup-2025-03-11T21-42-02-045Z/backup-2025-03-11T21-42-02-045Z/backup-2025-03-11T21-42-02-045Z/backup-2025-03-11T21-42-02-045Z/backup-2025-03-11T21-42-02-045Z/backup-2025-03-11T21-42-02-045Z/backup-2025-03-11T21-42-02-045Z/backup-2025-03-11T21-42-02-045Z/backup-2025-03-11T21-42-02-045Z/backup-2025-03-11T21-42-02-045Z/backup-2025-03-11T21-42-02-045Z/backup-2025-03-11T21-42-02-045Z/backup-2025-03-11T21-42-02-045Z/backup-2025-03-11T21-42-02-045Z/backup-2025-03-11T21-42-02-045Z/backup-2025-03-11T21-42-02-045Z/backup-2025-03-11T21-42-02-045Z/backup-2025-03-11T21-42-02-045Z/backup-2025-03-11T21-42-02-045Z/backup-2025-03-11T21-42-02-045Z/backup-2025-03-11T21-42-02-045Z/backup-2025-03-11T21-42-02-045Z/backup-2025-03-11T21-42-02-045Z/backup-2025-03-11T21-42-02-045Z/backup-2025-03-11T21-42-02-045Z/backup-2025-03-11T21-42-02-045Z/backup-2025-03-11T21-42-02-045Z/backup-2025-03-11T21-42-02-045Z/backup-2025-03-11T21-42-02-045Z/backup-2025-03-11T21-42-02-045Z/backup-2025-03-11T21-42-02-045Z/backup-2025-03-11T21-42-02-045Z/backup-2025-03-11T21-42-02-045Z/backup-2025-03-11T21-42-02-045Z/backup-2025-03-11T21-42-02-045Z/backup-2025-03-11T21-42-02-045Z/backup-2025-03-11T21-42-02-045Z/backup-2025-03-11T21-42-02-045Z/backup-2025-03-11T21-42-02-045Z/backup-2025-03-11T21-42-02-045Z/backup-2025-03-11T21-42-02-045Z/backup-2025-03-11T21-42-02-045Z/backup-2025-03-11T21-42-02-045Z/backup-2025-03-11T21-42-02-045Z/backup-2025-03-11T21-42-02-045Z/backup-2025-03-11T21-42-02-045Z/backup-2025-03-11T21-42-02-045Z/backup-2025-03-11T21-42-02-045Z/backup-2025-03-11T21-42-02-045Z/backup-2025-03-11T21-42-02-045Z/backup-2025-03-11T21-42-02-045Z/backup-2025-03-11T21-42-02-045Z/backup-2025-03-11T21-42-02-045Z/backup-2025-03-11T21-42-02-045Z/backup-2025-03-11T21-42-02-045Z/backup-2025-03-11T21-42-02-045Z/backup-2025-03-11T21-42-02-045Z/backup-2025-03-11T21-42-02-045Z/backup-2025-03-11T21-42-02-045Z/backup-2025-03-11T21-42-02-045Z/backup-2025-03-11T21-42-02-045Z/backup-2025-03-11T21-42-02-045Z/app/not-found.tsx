
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-3 text-2xl">Página no encontrada</p>
        <div className="mt-6">
          <a
            href="/"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Volver al inicio
          </a>
        </div>
      </main>
    </div>
  );
}
