const fs = require('fs');
const path = require('path');

// Rutas principales
const ROOT_DIR = process.cwd();
console.log(`Directorio raíz: ${ROOT_DIR}`);

// Función para corregir next.config.mjs
function fixNextConfig() {
  console.log('🔧 Corrigiendo configuración de Next.js...');
  
  const nextConfigMjsPath = path.join(ROOT_DIR, 'next.config.mjs');
  const nextConfigJsPath = path.join(ROOT_DIR, 'next.config.js');
  
  // Verificar si existe next.config.mjs
  if (fs.existsSync(nextConfigMjsPath)) {
    console.log(`Encontrado archivo: ${nextConfigMjsPath}`);
    
    // Leer el contenido actual
    const currentContent = fs.readFileSync(nextConfigMjsPath, 'utf8');
    console.log('Contenido actual:');
    console.log(currentContent);
    
    // Crear contenido con sintaxis ES modules
    const newContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nolivoslaw.com'],
  },
  // Asegurarse de que los archivos estáticos se manejen correctamente
  output: 'standalone',
};

export default nextConfig;`;
    
    // Escribir el nuevo contenido
    fs.writeFileSync(nextConfigMjsPath, newContent);
    console.log(`✅ Actualizado: ${nextConfigMjsPath} con sintaxis ES modules`);
    
    return;
  }
  
  // Si no existe .mjs, verificar si existe .js
  if (fs.existsSync(nextConfigJsPath)) {
    console.log(`Encontrado archivo: ${nextConfigJsPath}`);
    
    // Leer el contenido actual
    const currentContent = fs.readFileSync(nextConfigJsPath, 'utf8');
    console.log('Contenido actual:');
    console.log(currentContent);
    
    // Crear contenido con sintaxis CommonJS
    const newContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nolivoslaw.com'],
  },
  // Asegurarse de que los archivos estáticos se manejen correctamente
  output: 'standalone',
};

module.exports = nextConfig;`;
    
    // Escribir el nuevo contenido
    fs.writeFileSync(nextConfigJsPath, newContent);
    console.log(`✅ Actualizado: ${nextConfigJsPath} con sintaxis CommonJS`);
    
    return;
  }
  
  // Si no existe ninguno, crear next.config.js
  console.log('No se encontró archivo de configuración, creando next.config.js');
  
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
}

// Función principal
function main() {
  console.log('🚀 Iniciando corrección de next.config...');
  
  try {
    // Corregir next.config
    fixNextConfig();
    
    console.log('\n✅ Corrección aplicada correctamente');
    console.log('\nAhora ejecuta:');
    console.log('   npm run build');
    console.log('   npm run start');
  } catch (error) {
    console.error('❌ Error en el proceso:', error);
    process.exit(1);
  }
}

// Ejecutar la función principal
main();
