const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Rutas principales
const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'app');

console.log(`Directorio raíz: ${ROOT_DIR}`);

// Mapeo de iconos antiguos a nuevos
const iconMappings = {
  'circle-alert': 'alert-circle',
  'circle-check-big': 'check-circle',
  // Añade más mapeos si encuentras otros iconos faltantes
};

// Función para buscar y reemplazar importaciones de iconos
function fixIconImports(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      // Recursivamente buscar en subdirectorios
      fixIconImports(fullPath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.jsx') || file.name.endsWith('.js')) {
      try {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;
        
        // Buscar y reemplazar importaciones de iconos
        for (const [oldIcon, newIcon] of Object.entries(iconMappings)) {
          // Convertir a PascalCase para el nombre del componente
          const oldIconComponent = oldIcon.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
          const newIconComponent = newIcon.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
          
          // Reemplazar en importaciones
          const oldImportRegex = new RegExp(`import\\s+{[^}]*\\b${oldIconComponent}\\b[^}]*}\\s+from\\s+['"]lucide-react['"]`, 'g');
          if (oldImportRegex.test(content)) {
            content = content.replace(oldImportRegex, (match) => {
              return match.replace(oldIconComponent, newIconComponent);
            });
            modified = true;
          }
          
          // Reemplazar en uso de componentes
          const oldComponentRegex = new RegExp(`<${oldIconComponent}\\b`, 'g');
          if (oldComponentRegex.test(content)) {
            content = content.replace(oldComponentRegex, `<${newIconComponent}`);
            modified = true;
          }
        }
        
        if (modified) {
          fs.writeFileSync(fullPath, content);
          console.log(`✅ Actualizado: ${fullPath}`);
        }
      } catch (error) {
        console.error(`❌ Error al procesar ${fullPath}:`, error);
      }
    }
  }
}

// Función para actualizar la versión de lucide-react
function updateLucideVersion() {
  try {
    console.log('📦 Instalando la última versión estable de lucide-react...');
    execSync('npm install lucide-react@latest', { stdio: 'inherit' });
    console.log('✅ lucide-react actualizado correctamente');
  } catch (error) {
    console.error('❌ Error al actualizar lucide-react:', error);
    console.log('⚠️ Intenta instalar manualmente con: npm install lucide-react@latest');
  }
}

// Función para arreglar específicamente el archivo dashboard
function fixParalegalDashboard() {
  const dashboardPath = path.join(APP_DIR, 'paralegal', 'dashboard', 'page.tsx');
  
  if (fs.existsSync(dashboardPath)) {
    try {
      let content = fs.readFileSync(dashboardPath, 'utf8');
      
      // Reemplazar importaciones específicas
      content = content.replace(/import\s+{[^}]*CircleAlert[^}]*}\s+from\s+['"]lucide-react['"]/g, (match) => {
        return match.replace('CircleAlert', 'AlertCircle');
      });
      
      content = content.replace(/import\s+{[^}]*CircleCheckBig[^}]*}\s+from\s+['"]lucide-react['"]/g, (match) => {
        return match.replace('CircleCheckBig', 'CheckCircle');
      });
      
      // Reemplazar uso de componentes
      content = content.replace(/<CircleAlert\b/g, '<AlertCircle');
      content = content.replace(/<CircleCheckBig\b/g, '<CheckCircle');
      
      fs.writeFileSync(dashboardPath, content);
      console.log(`✅ Arreglado específicamente: ${dashboardPath}`);
    } catch (error) {
      console.error(`❌ Error al arreglar ${dashboardPath}:`, error);
    }
  } else {
    console.log(`⚠️ No se encontró el archivo: ${dashboardPath}`);
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando corrección de iconos de Lucide...');
  
  // 1. Actualizar la versión de lucide-react
  updateLucideVersion();
  
  // 2. Arreglar específicamente el archivo dashboard
  fixParalegalDashboard();
  
  // 3. Buscar y reemplazar en todo el proyecto
  fixIconImports(APP_DIR);
  
  console.log('');
  console.log('✅ Corrección de iconos completada');
  console.log('');
  console.log('Ahora ejecuta:');
  console.log('   npm run build');
}

// Ejecutar la función principal
main().catch(err => {
  console.error('❌ Error en el proceso:', err);
  process.exit(1);
});
