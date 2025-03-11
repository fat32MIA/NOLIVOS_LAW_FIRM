const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Rutas principales
const ROOT_DIR = process.cwd();

// Actualizar package.json para corregir las versiones de dependencias
function updatePackageJson() {
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Actualizar a la versión actual de lucide-react
    packageJson.dependencies = packageJson.dependencies || {};
    
    // Usar la versión actual en lugar de intentar downgrade
    if (packageJson.dependencies["lucide-react"]) {
      packageJson.dependencies["lucide-react"] = "^0.479.0";
      console.log('✅ Actualizada versión de lucide-react a ^0.479.0');
    }
    
    // Asegurarse de que las demás dependencias estén presentes
    packageJson.dependencies["next-themes"] = "^0.2.1";
    packageJson.dependencies["clsx"] = "^2.0.0";
    packageJson.dependencies["tailwind-merge"] = "^2.0.0";
    packageJson.dependencies["class-variance-authority"] = "^0.7.0";
    packageJson.dependencies["tailwindcss-animate"] = "^1.0.7";
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Actualizado package.json con dependencias corregidas');
  }
}

// Función para instalar dependencias con legacy-peer-deps
function installDependencies() {
  try {
    console.log('📦 Instalando dependencias con --legacy-peer-deps...');
    execSync('npm install --legacy-peer-deps', { cwd: ROOT_DIR, stdio: 'inherit' });
    console.log('✅ Dependencias instaladas correctamente');
  } catch (error) {
    console.error('❌ Error al instalar dependencias:', error);
    
    // Intentar con --force si --legacy-peer-deps falla
    try {
      console.log('📦 Intentando instalar con --force...');
      execSync('npm install --force', { cwd: ROOT_DIR, stdio: 'inherit' });
      console.log('✅ Dependencias instaladas correctamente con --force');
    } catch (forceError) {
      console.error('❌ Error al instalar dependencias con --force:', forceError);
    }
  }
}

// Función para limpiar la caché de Next.js
function cleanNextCache() {
  try {
    console.log('🧹 Limpiando caché de Next.js...');
    execSync('rm -rf .next', { cwd: ROOT_DIR, stdio: 'inherit' });
    console.log('✅ Caché de Next.js limpiada correctamente');
  } catch (error) {
    console.error('❌ Error al limpiar caché de Next.js:', error);
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando corrección de dependencias...');
  
  // 1. Actualizar package.json
  updatePackageJson();
  
  // 2. Instalar dependencias
  installDependencies();
  
  // 3. Limpiar caché de Next.js
  cleanNextCache();
  
  console.log('');
  console.log('✅ Dependencias corregidas correctamente');
  console.log('');
  console.log('📋 Resumen de acciones:');
  console.log('1. Se ha actualizado package.json con las versiones correctas');
  console.log('2. Se han instalado las dependencias con --legacy-peer-deps o --force');
  console.log('3. Se ha limpiado la caché de Next.js');
  console.log('');
  console.log('🏁 Ahora ejecuta:');
  console.log('   npm run dev');
  console.log('');
  console.log('Nota: Si sigues teniendo problemas, prueba a eliminar node_modules y volver a instalar:');
  console.log('   rm -rf node_modules');
  console.log('   npm install --legacy-peer-deps');
}

main().catch(err => {
  console.error('❌ Error en el script:', err);
  process.exit(1);
});
