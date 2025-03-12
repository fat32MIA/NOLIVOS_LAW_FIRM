// install-sharp.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Instalando Sharp para optimización de imágenes...');

// Instalar sharp
try {
  execSync('npm install sharp', { stdio: 'inherit' });
  console.log('✅ Sharp instalado correctamente');
} catch (error) {
  console.error('❌ Error al instalar Sharp:', error.message);
}

// Actualizar package.json para incluir sharp en las dependencias
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (!packageJson.dependencies.sharp) {
    packageJson.dependencies.sharp = "^0.31.0";
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Dependencia Sharp agregada a package.json');
  }
}

console.log('✨ Configuración de Sharp completada');
