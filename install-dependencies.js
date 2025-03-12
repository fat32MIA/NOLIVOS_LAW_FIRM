// install-dependencies.js
const { execSync } = require('child_process');
const fs = require('fs');

console.log('📦 Instalando dependencias necesarias...');

// Lista de dependencias esenciales
const dependencies = [
  'next-themes',
  'lucide-react'
];

// Lista de dependencias de desarrollo
const devDependencies = [
  'autoprefixer',
  'postcss',
  'tailwindcss'
];

try {
  // Instalar dependencias regulares
  console.log(`Instalando dependencias: ${dependencies.join(', ')}...`);
  execSync(`npm install ${dependencies.join(' ')}`, { stdio: 'inherit' });
  
  // Instalar dependencias de desarrollo
  console.log(`\nInstalando dependencias de desarrollo: ${devDependencies.join(', ')}...`);
  execSync(`npm install -D ${devDependencies.join(' ')}`, { stdio: 'inherit' });
  
  console.log('\n✅ Todas las dependencias instaladas correctamente');
} catch (error) {
  console.error('\n❌ Error al instalar dependencias:', error.message);
  process.exit(1);
}

// Verificar postcss.config.js
const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;

// Eliminar versiones antiguas de configuración de PostCSS
if (fs.existsSync('postcss.config.mjs')) {
  fs.unlinkSync('postcss.config.mjs');
}

// Crear archivo postcss.config.js
fs.writeFileSync('postcss.config.js', postcssConfig);
console.log('\n✅ Creado archivo postcss.config.js');

// Verificar tailwind.config.js
if (!fs.existsSync('tailwind.config.js')) {
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`;

  fs.writeFileSync('tailwind.config.js', tailwindConfig);
  console.log('✅ Creado archivo tailwind.config.js');
}

console.log('\n🚀 Intenta compilar de nuevo con:');
console.log('npm run build');
