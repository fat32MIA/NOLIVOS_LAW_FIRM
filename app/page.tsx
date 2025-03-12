import Hero from '@/components/Hero';
import ParallaxHero from '@/components/ParallaxHero';
import Link from 'next/link';

export default function Home() {
  return (
      <>
        <Hero />
        
    <div>
      <section className="py-16 bg-gradient-to-r from-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Servicios Legales de Inmigración
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Soluciones legales personalizadas para todos tus trámites migratorios.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Iniciar Sesión
            </Link>
            <Link href="#consulta" className="px-6 py-3 bg-white text-blue-900 rounded-md hover:bg-gray-100">
              Consulta Gratuita
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">Visas y Permisos</h3>
              <p className="mb-4">Asesoría completa para visas de trabajo, turismo, estudios y reunificación familiar.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">Asilo y Refugio</h3>
              <p className="mb-4">Ayudamos a personas que buscan protección por persecución en sus países de origen.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">Escáner de Documentos</h3>
              <p className="mb-4">Digitaliza tus documentos legales de forma segura para agilizar tus trámites.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="consulta" className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Consulta Rápida
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Tu nombre</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block mb-1">Tu email</label>
              <input type="email" className="w-full p-2 border rounded" placeholder="tu@email.com" />
            </div>
            <div>
              <label className="block mb-1">¿Cómo podemos ayudarte?</label>
              <textarea rows={4} className="w-full p-2 border rounded" placeholder="Describe tu situación..."></textarea>
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Enviar Consulta
            </button>
          </form>
        </div>
      </section>
    </div>
      </>
    );
}