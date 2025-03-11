import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/90 p-4 border-b border-neutral-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="Nolivos Law" 
                width={120} 
                height={60}
                className="mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold">NOLIVOS LAW</h1>
                <p className="text-sm text-gray-400">SERVICIOS LEGALES</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="tel:+1(555)123-4567" className="flex items-center text-gray-300 hover:text-white">
                <Phone className="w-5 h-5 mr-2" />
                +1 (555) 123-4567
              </a>
              <a href="mailto:contacto@nolivoslaw.com" className="flex items-center text-gray-300 hover:text-white">
                <Mail className="w-5 h-5 mr-2" />
                contacto@nolivoslaw.com
              </a>
            </div>
          </div>
          <Link 
            href="/login"
            className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded transition-colors border border-neutral-700"
          >
            Iniciar Sesión
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Servicios Legales de Inmigración
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl">
            Soluciones legales personalizadas para todos tus trámites migratorios. 
            Experiencia y compromiso para guiarte en cada paso del proceso.
          </p>
          <div className="flex gap-4">
            <button className="bg-neutral-800 hover:bg-neutral-700 px-6 py-2 rounded transition-colors border border-neutral-700">
              Consulta Gratuita
            </button>
            <button className="bg-neutral-800 hover:bg-neutral-700 px-6 py-2 rounded transition-colors border border-neutral-700">
              Conoce Más
            </button>
          </div>
        </section>

        {/* Quick Consultation Form */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Consulta Rápida</h3>
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 max-w-2xl">
            <form className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="flex-1 bg-neutral-800/50 border border-neutral-700 rounded px-4 py-2 focus:outline-none focus:border-neutral-600"
                />
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 bg-neutral-800/50 border border-neutral-700 rounded px-4 py-2 focus:outline-none focus:border-neutral-600"
                />
              </div>
              <textarea
                placeholder="¿Cómo podemos ayudarte?"
                rows={4}
                className="w-full bg-neutral-800/50 border border-neutral-700 rounded px-4 py-2 focus:outline-none focus:border-neutral-600"
              />
              <button className="bg-neutral-800 hover:bg-neutral-700 px-6 py-2 rounded transition-colors flex items-center border border-neutral-700">
                Enviar Consulta
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </form>
          </div>
        </section>

        {/* Services Section */}
        <section>
          <h3 className="text-2xl font-bold mb-6">Nuestros Servicios</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Visas y Permisos */}
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Visas y Permisos</h4>
              <p className="text-gray-300 mb-4">
                Ofrecemos asesoría completa para visas de trabajo, turismo,
                estudios y reunificación familiar.
              </p>
              <button className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded transition-colors flex items-center border border-neutral-700">
                Más Información
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>

            {/* Asilo y Refugio */}
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Asilo y Refugio</h4>
              <p className="text-gray-300 mb-4">
                Ayudamos a personas que buscan protección por persecución
                o temor fundado en sus países de origen.
              </p>
              <button className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded transition-colors flex items-center border border-neutral-700">
                Más Información
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}