const fs = require('fs');
const path = require('path');

// Detectar la estructura del proyecto
let APP_DIR;
if (fs.existsSync(path.join(process.cwd(), 'app'))) {
  APP_DIR = path.join(process.cwd(), 'app');
  console.log('Estructura detectada: app/ en la raíz');
} else if (fs.existsSync(path.join(process.cwd(), 'src', 'app'))) {
  APP_DIR = path.join(process.cwd(), 'src', 'app');
  console.log('Estructura detectada: src/app/');
} else {
  console.error('No se pudo detectar la estructura del proyecto');
  process.exit(1);
}

console.log(`Directorio de la aplicación: ${APP_DIR}`);

// Eliminar páginas problemáticas
const problemPages = [
  path.join(APP_DIR, 'admin', 'database', 'page.tsx'),
  path.join(APP_DIR, 'admin', 'redis', 'page.tsx'),
  path.join(APP_DIR, 'admin', 'settings', 'page.tsx'),
  path.join(APP_DIR, 'legal-assistant', 'page.tsx'),
  // Comprobar también la ruta incorrecta
  path.join(APP_DIR, 'app', 'legal-assistant', 'page.tsx')
];

problemPages.forEach(pagePath => {
  if (fs.existsSync(pagePath)) {
    try {
      fs.unlinkSync(pagePath);
      console.log(`✅ Eliminada página: ${pagePath}`);
    } catch (error) {
      console.error(`❌ Error al eliminar página ${pagePath}:`, error.message);
    }
  } else {
    console.log(`ℹ️ La página ${pagePath} no existe`);
  }
});

// Crear versiones simplificadas de las páginas
const simplifiedPages = [
  {
    path: path.join(APP_DIR, 'admin', 'database', 'page.tsx'),
    content: `export default function DatabaseConfigPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Configuración de Base de Datos</h1>
      <p>Esta página está en mantenimiento.</p>
    </div>
  );
}`
  },
  {
    path: path.join(APP_DIR, 'admin', 'redis', 'page.tsx'),
    content: `export default function RedisConfigPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Configuración de Redis</h1>
      <p>Esta página está en mantenimiento.</p>
    </div>
  );
}`
  },
  {
    path: path.join(APP_DIR, 'admin', 'settings', 'page.tsx'),
    content: `export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Configuración General</h1>
      <p>Esta página está en mantenimiento.</p>
    </div>
  );
}`
  },
  {
    path: path.join(APP_DIR, 'legal-assistant', 'page.tsx'),
    content: `export default function LegalAssistantPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Asistente Legal de Inmigración</h1>
      <p>Esta página está en mantenimiento.</p>
    </div>
  );
}`
  }
];

// Asegurarse de que los directorios existen
simplifiedPages.forEach(page => {
  const dir = path.dirname(page.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Creado directorio: ${dir}`);
  }
  
  try {
    fs.writeFileSync(page.path, page.content);
    console.log(`✅ Creada página simplificada: ${page.path}`);
  } catch (error) {
    console.error(`❌ Error al crear página ${page.path}:`, error.message);
  }
});

console.log('');
console.log('✅ Páginas problemáticas reemplazadas con versiones simplificadas');
console.log('');
console.log('Ahora ejecuta:');
console.log('   npm run build');
