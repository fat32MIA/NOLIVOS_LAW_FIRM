const fs = require('fs');
const path = require('path');

// Rutas principales
const ROOT_DIR = process.cwd();
console.log(`Directorio raíz: ${ROOT_DIR}`);

// Función para corregir next.config
function fixNextConfig() {
  console.log('🔧 Corrigiendo configuración de Next.js...');
  
  const nextConfigMjsPath = path.join(ROOT_DIR, 'next.config.mjs');
  const nextConfigJsPath = path.join(ROOT_DIR, 'next.config.js');
  
  // Eliminar next.config.mjs si existe
  if (fs.existsSync(nextConfigMjsPath)) {
    console.log(`Eliminando archivo problemático: ${nextConfigMjsPath}`);
    fs.unlinkSync(nextConfigMjsPath);
    console.log(`✅ Eliminado: ${nextConfigMjsPath}`);
  }
  
  // Crear nuevo next.config.js con sintaxis CommonJS
  const newContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nolivoslaw.com'],
  },
  // Asegurarse de que los archivos estáticos se manejen correctamente
  output: 'standalone',
};

module.exports = nextConfig;`;
  
  fs.writeFileSync(nextConfigJsPath, newContent);
  console.log(`✅ Creado: ${nextConfigJsPath}`);
  
  // Verificar que se haya creado correctamente
  if (fs.existsSync(nextConfigJsPath)) {
    console.log(`Verificación: ${nextConfigJsPath} existe`);
    const content = fs.readFileSync(nextConfigJsPath, 'utf8');
    console.log('Contenido del archivo:');
    console.log(content);
  } else {
    console.error(`❌ Error: No se pudo crear ${nextConfigJsPath}`);
  }
}

// Función principal
function main() {
  console.log('🚀 Iniciando corrección directa de next.config...');
  
  try {
    // Corregir next.config
    fixNextConfig();
    
    console.log('\n✅ Corrección aplicada correctamente');
    console.log('\nAhora ejecuta:');
    console.log('   npm run build');
    console.log('   npm run start');
  } catch (error) {
    console.error('❌ Error en el proceso:', error);
    console.error('Detalles del error:', error.stack);
    process.exit(1);
  }
}

// Ejecutar la función principal
main();
