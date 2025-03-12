// fix-tailwind-issue.js
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 Arreglando problema de TailwindCSS...');

// Desinstalar versión actual de TailwindCSS
console.log('1. Desinstalando paquetes actuales de TailwindCSS...');
try {
  execSync('npm uninstall tailwindcss postcss autoprefixer', { stdio: 'inherit' });
} catch (error) {
  console.warn('⚠️ Advertencia al desinstalar paquetes:', error.message);
}

// Instalar versiones específicas de TailwindCSS y PostCSS
console.log('\n2. Instalando versiones compatibles...');
try {
  execSync('npm install -D tailwindcss@3.3.0 postcss@8.4.23 autoprefixer@10.4.14', { stdio: 'inherit' });
  console.log('✅ Paquetes instalados correctamente');
} catch (error) {
  console.error('❌ Error al instalar paquetes:', error.message);
  process.exit(1);
}

// Actualizar configuración de PostCSS
console.log('\n3. Actualizando configuración de PostCSS...');
const postcssConfig = `/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

fs.writeFileSync('postcss.config.js', postcssConfig);
console.log('✅ postcss.config.js actualizado');

// Inicializar configuración de TailwindCSS si no existe
if (!fs.existsSync('tailwind.config.js')) {
  console.log('\n4. Inicializando configuración de TailwindCSS...');
  try {
    execSync('npx tailwindcss init -p', { stdio: 'inherit' });
    console.log('✅ tailwind.config.js creado');
  } catch (error) {
    console.warn('⚠️ No se pudo inicializar automáticamente, creando archivo manualmente...');
    // Crear configuración mínima de TailwindCSS
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
}`;
    
    fs.writeFileSync('tailwind.config.js', tailwindConfig);
    console.log('✅ tailwind.config.js creado manualmente');
  }
} else {
  // Actualizar configuración existente para asegurar que el content sea correcto
  console.log('\n4. Actualizando configuración existente de TailwindCSS...');
  try {
    let config = fs.readFileSync('tailwind.config.js', 'utf8');
    
    // Solo modificar si no tiene la configuración de content adecuada
    if (!config.includes("'./app/**/*.{js,ts,jsx,tsx,mdx}'")) {
      // Intentar reemplazar utilizando regex para mantener el resto de la configuración
      const contentPattern = /(content\s*:\s*\[)[^\]]*(\])/;
      if (contentPattern.test(config)) {
        config = config.replace(contentPattern, 
          "$1'./pages/**/*.{js,ts,jsx,tsx,mdx}',\n    './components/**/*.{js,ts,jsx,tsx,mdx}',\n    './app/**/*.{js,ts,jsx,tsx,mdx}'$2");
      } else {
        // Si no se puede reemplazar, advertir al usuario
        console.warn('⚠️ No se pudo actualizar automáticamente la propiedad "content" en tailwind.config.js');
        console.warn('Por favor, asegúrate de que incluya:');
        console.warn(`content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
],`);
      }
      
      fs.writeFileSync('tailwind.config.js', config);
      console.log('✅ tailwind.config.js actualizado');
    } else {
      console.log('✅ tailwind.config.js ya está correctamente configurado');
    }
  } catch (error) {
    console.warn('⚠️ Error al actualizar tailwind.config.js:', error.message);
  }
}

// Crear archivo CSS básico si no existe
if (!fs.existsSync('app/globals.css')) {
  console.log('\n5. Creando archivo CSS básico...');
  const css = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}`;
  
  fs.writeFileSync('app/globals.css', css);
  console.log('✅ app/globals.css creado');
}

console.log('\n✨ ¡Todo listo! Intenta compilar de nuevo:');
console.log('npm run build');
