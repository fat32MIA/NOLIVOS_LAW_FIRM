#!/usr/bin/env node
// cleanup-project.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Iniciando limpieza del proyecto...');

// Archivos y directorios esenciales a mantener
const essentialFiles = [
  // Configuración de Next.js
  'next.config.js',
  'tsconfig.json',
  'package.json',
  'package-lock.json',
  'next-env.d.ts',
  '.eslintrc.json',
  'postcss.config.mjs',
  'tailwind.config.js',
  'README.md',
  '.gitignore',
  
  // Directorios de código
  'app',
  'components',
  'lib',
  'public',
  'styles',
  
  // Scripts útiles
  'start-server.js'
];

// Crear un .gitignore apropiado si no existe
if (!fs.existsSync('.gitignore')) {
  console.log('📝 Creando archivo .gitignore...');
  const gitignoreContent = `
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Archivos temporales
*.temp
*.tmp
backup*/
`;
  fs.writeFileSync('.gitignore', gitignoreContent.trim());
  console.log('✅ Archivo .gitignore creado');
}

// Obtener la lista de todos los archivos y directorios en el directorio raíz
const rootDir = process.cwd();
const allItems = fs.readdirSync(rootDir);

// Filtrar los elementos que no son esenciales
const itemsToRemove = allItems.filter(item => {
  // Ignorar node_modules (no lo borraremos)
  if (item === 'node_modules' || item === '.git') return false;
  
  // Ignorar el propio script de limpieza
  if (item === path.basename(__filename)) return false;
  
  // Conservar solo los archivos esenciales
  return !essentialFiles.includes(item);
});

// Eliminar archivos y directorios no esenciales
let removedCount = 0;
for (const item of itemsToRemove) {
  const itemPath = path.join(rootDir, item);
  try {
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      // Es un directorio, verificar si contiene muchos archivos
      const dirContents = fs.readdirSync(itemPath);
      if (dirContents.length > 10) {
        console.log(`🗂️  Eliminando directorio con muchos archivos: ${item}`);
      } else {
        console.log(`🗂️  Eliminando directorio: ${item}`);
      }
      fs.rmSync(itemPath, { recursive: true, force: true });
    } else {
      // Es un archivo
      console.log(`🗑️  Eliminando archivo: ${item}`);
      fs.unlinkSync(itemPath);
    }
    removedCount++;
  } catch (error) {
    console.error(`❌ Error al eliminar ${item}:`, error.message);
  }
}

// Limpiar caché de Next.js si existe
if (fs.existsSync('.next')) {
  console.log('🧹 Limpiando caché de Next.js...');
  fs.rmSync('.next', { recursive: true, force: true });
}

// Asegurar que los directorios esenciales existan
for (const item of essentialFiles) {
  if (item.indexOf('.') === -1) { // Es un directorio si no tiene punto
    const dirPath = path.join(rootDir, item);
    if (!fs.existsSync(dirPath)) {
      console.log(`📁 Creando directorio esencial: ${item}`);
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
}

// Asegurar que next.config.js exista con la configuración necesaria
const nextConfigPath = path.join(rootDir, 'next.config.js');
if (!fs.existsSync(nextConfigPath)) {
  console.log('📝 Creando archivo next.config.js...');
  const nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
`;
  fs.writeFileSync(nextConfigPath, nextConfigContent);
  console.log('✅ Archivo next.config.js creado');
}

console.log(`\n✨ Limpieza completada. Se eliminaron ${removedCount} elementos no esenciales.`);
console.log('\nPara continuar, realiza estos pasos:');
console.log('1. Revisa los archivos que quedan con: ls -la');
console.log('2. Haz un commit de los cambios:');
console.log('   git add .');
console.log('   git commit -m "Limpieza del proyecto y estructura optimizada"');
console.log('3. Sube los cambios a GitHub:');
console.log('   git push -f origin main');
