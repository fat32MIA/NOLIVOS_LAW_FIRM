export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Nolivos Law Firm. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Términos
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Privacidad
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}