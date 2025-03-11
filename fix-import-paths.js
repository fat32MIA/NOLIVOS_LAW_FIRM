const fs = require('fs');
const path = require('path');

// Rutas principales
const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const UI_DIR = path.join(COMPONENTS_DIR, 'ui');

// Actualizar tsconfig.json para configurar correctamente los alias
function updateTsConfig() {
  const tsConfigPath = path.join(ROOT_DIR, 'tsconfig.json');
  
  if (fs.existsSync(tsConfigPath)) {
    let tsConfig;
    try {
      tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
    } catch (error) {
      console.error('❌ Error al leer tsconfig.json:', error);
      // Crear un nuevo tsconfig.json si no se puede leer el existente
      tsConfig = {};
    }
    
    // Asegurarse de que compilerOptions existe
    tsConfig.compilerOptions = tsConfig.compilerOptions || {};
    
    // Configurar paths para el alias @/
    tsConfig.compilerOptions.baseUrl = '.';
    tsConfig.compilerOptions.paths = {
      "@/*": ["./*"]
    };
    
    fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
    console.log('✅ Actualizado tsconfig.json con la configuración de alias correcta');
  } else {
    // Crear tsconfig.json si no existe
    const tsConfigContent = {
      "compilerOptions": {
        "target": "es5",
        "lib": ["dom", "dom.iterable", "esnext"],
        "allowJs": true,
        "skipLibCheck": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "noEmit": true,
        "esModuleInterop": true,
        "module": "esnext",
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "incremental": true,
        "plugins": [
          {
            "name": "next"
          }
        ],
        "baseUrl": ".",
        "paths": {
          "@/*": ["./*"]
        }
      },
      "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      "exclude": ["node_modules"]
    };
    
    fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfigContent, null, 2));
    console.log('✅ Creado tsconfig.json con la configuración de alias correcta');
  }
}

// Simplificar la página principal para evitar problemas de importación
function simplifyHomePage() {
  const homePagePath = path.join(APP_DIR, 'page.tsx');
  const homePageContent = `'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold text-center mb-8">Nolivos Law Firm</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="rounded-lg border border-gray-300 bg-white shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold">Admin</h3>
              <p className="text-sm text-gray-500">Panel de administración</p>
            </div>
            <div className="p-6 pt-0">
              <p>Acceso a todas las funciones administrativas.</p>
            </div>
            <div className="flex items-center p-6 pt-0">
              <Link href="/admin/dashboard" className="w-full">
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                  Acceder
                </button>
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-300 bg-white shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold">Abogado</h3>
              <p className="text-sm text-gray-500">Panel de abogado</p>
            </div>
            <div className="p-6 pt-0">
              <p>Gestión de casos y clientes.</p>
            </div>
            <div className="flex items-center p-6 pt-0">
              <Link href="/lawyer/dashboard" className="w-full">
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                  Acceder
                </button>
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-300 bg-white shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold">Cliente</h3>
              <p className="text-sm text-gray-500">Portal de cliente</p>
            </div>
            <div className="p-6 pt-0">
              <p>Seguimiento de casos y documentos.</p>
            </div>
            <div className="flex items-center p-6 pt-0">
              <Link href="/client/dashboard" className="w-full">
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                  Acceder
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
`;
  
  fs.writeFileSync(homePagePath, homePageContent);
  console.log('✅ Simplificada la página principal para evitar problemas de importación');
}

// Función principal
async function main() {
  console.log('🚀 Iniciando corrección de rutas de importación...');
  
  // 1. Actualizar tsconfig.json
  updateTsConfig();
  
  // 2. Simplificar la página principal
  simplifyHomePage();
  
  console.log('');
  console.log('✅ Rutas de importación corregidas');
  console.log('');
  console.log('📋 Resumen de acciones:');
  console.log('1. Se ha actualizado tsconfig.json con la configuración de alias correcta');
  console.log('2. Se ha simplificado la página principal para evitar problemas de importación');
  console.log('');
  console.log('🏁 Ahora ejecuta:');
  console.log('   npm run dev');
}

main().catch(err => {
  console.error('❌ Error en el script:', err);
  process.exit(1);
});
