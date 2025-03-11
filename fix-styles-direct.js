const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Rutas principales
const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');

console.log(`Directorio raíz: ${ROOT_DIR}`);

// Función para corregir globals.css
function fixGlobalsCss() {
  console.log('🔧 Corrigiendo globals.css...');
  
  const globalsCssPath = path.join(APP_DIR, 'globals.css');
  
  // Contenido optimizado para el diseño negro y blanco
  const globalsCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 255, 255, 255;
  --background-rgb: 0, 0, 0;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}

/* Estilos personalizados para inputs y botones */
input, textarea {
  background-color: rgba(38, 38, 38, 0.5);
  border: 1px solid rgba(64, 64, 64, 0.5);
}

input:focus, textarea:focus {
  outline: none;
  border-color: rgba(82, 82, 82, 0.8);
}

button {
  transition: all 0.2s ease;
  background-color: rgba(38, 38, 38, 0.8);
  border: 1px solid rgba(64, 64, 64, 0.5);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}

button:hover {
  background-color: rgba(64, 64, 64, 0.8);
}

/* Estilos para la página principal */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(64, 64, 64, 0.5);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.nav {
  display: flex;
  gap: 1rem;
}

.hero {
  padding: 3rem 0;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(38, 38, 38, 0.5);
  border-radius: 0.5rem;
  border: 1px solid rgba(64, 64, 64, 0.5);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.services {
  padding: 3rem 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.service-card {
  background-color: rgba(38, 38, 38, 0.5);
  border: 1px solid rgba(64, 64, 64, 0.5);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.service-card p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}`;
  
  try {
    fs.writeFileSync(globalsCssPath, globalsCssContent);
    console.log(`✅ Actualizado: ${globalsCssPath}`);
  } catch (error) {
    console.error(`❌ Error al actualizar globals.css:`, error);
  }
}

// Función para corregir tailwind.config.js
function fixTailwindConfig() {
  console.log('🔧 Corrigiendo tailwind.config.js...');
  
  const tailwindConfigPath = path.join(ROOT_DIR, 'tailwind.config.js');
  const tailwindConfigTsPath = path.join(ROOT_DIR, 'tailwind.config.ts');
  
  let configPath = null;
  if (fs.existsSync(tailwindConfigPath)) {
    configPath = tailwindConfigPath;
  } else if (fs.existsSync(tailwindConfigTsPath)) {
    configPath = tailwindConfigTsPath;
  } else {
    configPath = tailwindConfigPath;
  }
  
  const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neutral-800': '#262626',
        'neutral-700': '#404040',
      },
    },
  },
  plugins: [],
}`;
  
  try {
    fs.writeFileSync(configPath, tailwindConfigContent);
    console.log(`✅ Actualizado: ${configPath}`);
  } catch (error) {
    console.error(`❌ Error al actualizar tailwind.config:`, error);
  }
}

// Función para corregir la página principal
function fixIndexPage() {
  console.log('🔧 Corrigiendo página principal...');
  
  const indexPath = path.join(APP_DIR, 'page.tsx');
  
  const indexContent = `import Link from "next/link"
import { Phone, Mail, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/90 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div>
              <h1 className="text-2xl font-bold">NOLIVOS LAW</h1>
              <p className="text-sm text-gray-400">SERVICIOS LEGALES</p>
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
            className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded transition-colors"
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
            <button className="bg-neutral-800 hover:bg-neutral-700 px-6 py-2 rounded transition-colors">
              Consulta Gratuita
            </button>
            <button className="bg-neutral-800 hover:bg-neutral-700 px-6 py-2 rounded transition-colors">
              Conoce Más
            </button>
          </div>
        </section>

        {/* Quick Consultation Form */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Consulta Rápida</h3>
          <form className="max-w-2xl space-y-4">
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
            <button className="bg-neutral-800 hover:bg-neutral-700 px-6 py-2 rounded transition-colors flex items-center">
              Enviar Consulta
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </form>
        </section>

        {/* Services Section */}
        <section>
          <h3 className="text-2xl font-bold mb-6">Nuestros Servicios</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Visas y Permisos */}
            <div>
              <h4 className="text-xl font-bold mb-4">Visas y Permisos</h4>
              <p className="text-gray-300 mb-4">
                Ofrecemos asesoría completa para visas de trabajo, turismo,
                estudios y reunificación familiar.
              </p>
              <button className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded transition-colors flex items-center">
                Más Información
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>

            {/* Asilo y Refugio */}
            <div>
              <h4 className="text-xl font-bold mb-4">Asilo y Refugio</h4>
              <p className="text-gray-300 mb-4">
                Ayudamos a personas que buscan protección por persecución
                o temor fundado en sus países de origen.
              </p>
              <button className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded transition-colors flex items-center">
                Más Información
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}`;
  
  try {
    fs.writeFileSync(indexPath, indexContent);
    console.log(`✅ Actualizado: ${indexPath}`);
  } catch (error) {
    console.error(`❌ Error al actualizar página principal:`, error);
  }
}

// Función para instalar dependencias necesarias
function installDependencies() {
  console.log('📦 Instalando dependencias necesarias...');
  
  try {
    execSync('npm install lucide-react --legacy-peer-deps', { stdio: 'inherit' });
    console.log('✅ Dependencias instaladas correctamente');
  } catch (error) {
    console.error('❌ Error al instalar dependencias:', error);
  }
}

// Función para limpiar caché de Next.js
function cleanNextCache() {
  console.log('🧹 Limpiando caché de Next.js...');
  
  const nextCacheDir = path.join(ROOT_DIR, '.next');
  if (fs.existsSync(nextCacheDir)) {
    try {
      fs.rmSync(nextCacheDir, { recursive: true, force: true });
      console.log(`✅ Eliminada caché de Next.js: ${nextCacheDir}`);
    } catch (error) {
      console.error(`❌ Error al eliminar caché de Next.js: ${error.message}`);
    }
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando corrección directa de estilos...');
  
  try {
    // 1. Corregir globals.css
    fixGlobalsCss();
    
    // 2. Corregir tailwind.config.js
    fixTailwindConfig();
    
    // 3. Corregir página principal
    fixIndexPage();
    
    // 4. Instalar dependencias necesarias
    installDependencies();
    
    // 5. Limpiar caché de Next.js
    cleanNextCache();
    
    console.log('\n✅ Correcciones aplicadas correctamente');
    console.log('\nAhora ejecuta:');
    console.log('   npm run dev');
  } catch (error) {
    console.error('❌ Error en el proceso:', error);
    process.exit(1);
  }
}

// Ejecutar la función principal
main();
