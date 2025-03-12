// fix-build-errors.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Corrigiendo errores de compilación...');

// Corregir postcss.config.mjs
if (fs.existsSync('postcss.config.mjs')) {
  console.log('📝 Corrigiendo postcss.config.mjs...');
  
  // Opción 1: Cambiar a formato ESM correcto
  const esmConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;
  
  fs.writeFileSync('postcss.config.mjs', esmConfig);
  console.log('✅ postcss.config.mjs actualizado a formato ESM');
  
  // Opción alternativa: renombrar a .js (descomentando las siguientes líneas)
  /*
  const configContent = fs.readFileSync('postcss.config.mjs', 'utf8');
  fs.writeFileSync('postcss.config.js', configContent);
  fs.unlinkSync('postcss.config.mjs');
  console.log('✅ Renombrado postcss.config.mjs a postcss.config.js');
  */
}

// Verificar estructura de directorios
if (fs.existsSync('app/app')) {
  console.log('🔍 Detectada estructura de directorios inusual (app/app)...');
  
  // Crear un backup antes de modificar
  const backupDir = `backup-structure-${Date.now()}`;
  fs.mkdirSync(backupDir, { recursive: true });
  
  // Copiar archivos importantes de app/app a app
  const subAppDir = 'app/app';
  if (fs.existsSync(subAppDir)) {
    const subAppContents = fs.readdirSync(subAppDir);
    
    subAppContents.forEach(item => {
      const srcPath = path.join(subAppDir, item);
      const destPath = path.join('app', item);
      const backupPath = path.join(backupDir, item);
      
      // Crear backup
      if (fs.existsSync(destPath)) {
        if (fs.lstatSync(destPath).isDirectory()) {
          execSync(`cp -r "${destPath}" "${backupDir}/"`);
        } else {
          fs.copyFileSync(destPath, backupPath);
        }
      }
      
      // Mover a la ubicación correcta
      if (fs.lstatSync(srcPath).isDirectory()) {
        execSync(`cp -r "${srcPath}" "${path.dirname(destPath)}/"`, {stdio: 'ignore'});
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
      
      console.log(`✅ Movido ${srcPath} a ${destPath}`);
    });
    
    console.log(`📁 Se ha creado un backup en ${backupDir}`);
  }
}

// Verificar si layout.tsx está presente y tiene el contenido correcto
if (!fs.existsSync('app/layout.tsx') || fs.readFileSync('app/layout.tsx', 'utf8').includes('next/font/google') === false) {
  console.log('📝 Creando/actualizando app/layout.tsx...');
  
  const layoutContent = `import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nolivos Law | Servicios Legales de Inmigración',
  description: 'Soluciones legales personalizadas para todos tus trámites migratorios.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}`;
  
  fs.writeFileSync('app/layout.tsx', layoutContent);
  console.log('✅ app/layout.tsx actualizado');
}

// Verificar globals.css
if (!fs.existsSync('app/globals.css')) {
  console.log('📝 Creando app/globals.css...');
  
  const globalsContent = `@tailwind base;
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
  
  fs.writeFileSync('app/globals.css', globalsContent);
  console.log('✅ app/globals.css creado');
}

// Verificar page.tsx
if (!fs.existsSync('app/page.tsx')) {
  console.log('📝 Creando app/page.tsx básico...');
  
  const pageContent = `export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">
        Nolivos Law Services
      </h1>
      <p className="text-xl">
        Servicios Legales de Inmigración
      </p>
    </div>
  );
}`;
  
  fs.writeFileSync('app/page.tsx', pageContent);
  console.log('✅ app/page.tsx creado');
}

console.log('\n✨ Correcciones completadas');
console.log('\nAhora intenta compilar de nuevo:');
console.log('npm run build');
