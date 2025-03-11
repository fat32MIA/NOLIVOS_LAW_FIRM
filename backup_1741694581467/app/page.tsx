
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold">
          Bienvenido a <span className="text-blue-600">Nolivos Law Firm</span>
        </h1>
        
        <p className="mt-3 text-xl sm:text-2xl">
          Servicios legales especializados en inmigración
        </p>
        
        <div className="flex flex-wrap justify-center items-center max-w-4xl mt-6 sm:w-full">
          <a
            href="/immigration-assistant"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 transition duration-150 ease-in-out"
          >
            <h3 className="text-2xl font-bold">Asistente de Inmigración &rarr;</h3>
            <p className="mt-4 text-xl">
              Obtén respuestas a tus preguntas sobre inmigración con nuestro asistente virtual.
            </p>
          </a>

          <a
            href="/document-scanner"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 transition duration-150 ease-in-out"
          >
            <h3 className="text-2xl font-bold">Escáner de Documentos &rarr;</h3>
            <p className="mt-4 text-xl">
              Escanea y procesa documentos de inmigración de forma rápida y segura.
            </p>
          </a>
        </div>
      </main>

      <footer className="w-full h-24 border-t flex justify-center items-center">
        <p>
          © {new Date().getFullYear()} Nolivos Law Firm. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
