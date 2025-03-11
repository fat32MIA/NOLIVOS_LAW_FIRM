const fs = require('fs');
const path = require('path');

// Configuración
const ROOT_DIR = process.cwd();
const REPORT_FILE = path.join(ROOT_DIR, 'resumen-proyecto.md');

console.log(`Directorio raíz: ${ROOT_DIR}`);

// Función para obtener todos los archivos del proyecto
function getAllFiles(dir, fileList = [], ignoreDirs = ['node_modules', '.next', '.git']) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const relativePath = path.relative(ROOT_DIR, filePath);
    
    // Ignorar directorios específicos
    if (ignoreDirs.some(ignoreDir => relativePath.startsWith(ignoreDir))) {
      return;
    }
    
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList, ignoreDirs);
    } else {
      fileList.push({
        path: relativePath,
        size: stat.size,
        extension: path.extname(file).toLowerCase()
      });
    }
  });
  
  return fileList;
}

// Función para analizar la estructura de directorios
function analyzeDirectoryStructure() {
  console.log('🔍 Analizando estructura de directorios...');
  
  const structure = {};
  
  // Verificar directorios principales
  const mainDirs = ['app', 'components', 'lib', 'public'];
  
  mainDirs.forEach(dir => {
    const dirPath = path.join(ROOT_DIR, dir);
    if (fs.existsSync(dirPath)) {
      const subDirs = fs.readdirSync(dirPath)
        .filter(subDir => fs.statSync(path.join(dirPath, subDir)).isDirectory())
        .map(subDir => `${dir}/${subDir}`);
      
      structure[dir] = subDirs;
    } else {
      structure[dir] = 'No existe';
    }
  });
  
  return structure;
}

// Función para analizar las rutas de la aplicación
function analyzeRoutes() {
  console.log('🔍 Analizando rutas de la aplicación...');
  
  const routes = [];
  const appDir = path.join(ROOT_DIR, 'app');
  
  if (!fs.existsSync(appDir)) {
    return ['No se encontró el directorio app'];
  }
  
  function scanRoutes(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    
    // Verificar si este directorio es una ruta (contiene page.js/tsx)
    const hasPage = items.some(item => 
      item === 'page.js' || 
      item === 'page.jsx' || 
      item === 'page.ts' || 
      item === 'page.tsx'
    );
    
    if (hasPage) {
      routes.push(basePath || '/');
    }
    
    // Escanear subdirectorios
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && !item.startsWith('_') && !item.startsWith('.')) {
        // Manejar rutas dinámicas [param]
        const routeName = item.startsWith('[') ? item : item;
        const newBasePath = basePath ? `${basePath}/${routeName}` : `/${routeName}`;
        
        scanRoutes(itemPath, newBasePath);
      }
    });
  }
  
  scanRoutes(appDir);
  return routes;
}

// Función para analizar los componentes
function analyzeComponents() {
  console.log('🔍 Analizando componentes...');
  
  const componentsDir = path.join(ROOT_DIR, 'components');
  const components = [];
  
  if (!fs.existsSync(componentsDir)) {
    return ['No se encontró el directorio components'];
  }
  
  function scanComponents(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      const relativePath = path.relative(componentsDir, itemPath);
      
      if (stat.isDirectory()) {
        scanComponents(itemPath, relativePath);
      } else if (item.endsWith('.jsx') || item.endsWith('.tsx')) {
        components.push(relativePath);
      }
    });
  }
  
  scanComponents(componentsDir);
  return components;
}

// Función para analizar las APIs
function analyzeAPIs() {
  console.log('🔍 Analizando APIs...');
  
  const apiDir = path.join(ROOT_DIR, 'app', 'api');
  const apis = [];
  
  if (!fs.existsSync(apiDir)) {
    return ['No se encontró el directorio api'];
  }
  
  function scanAPIs(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    
    // Verificar si este directorio es una API (contiene route.js/tsx)
    const hasRoute = items.some(item => 
      item === 'route.js' || 
      item === 'route.jsx' || 
      item === 'route.ts' || 
      item === 'route.tsx'
    );
    
    if (hasRoute) {
      apis.push(basePath || '/');
    }
    
    // Escanear subdirectorios
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        const newBasePath = basePath ? `${basePath}/${item}` : `/${item}`;
        scanAPIs(itemPath, newBasePath);
      }
    });
  }
  
  scanAPIs(apiDir, '/api');
  return apis;
}

// Función para analizar las dependencias
function analyzeDependencies() {
  console.log('🔍 Analizando dependencias...');
  
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    return {
      error: 'No se encontró el archivo package.json'
    };
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  return {
    dependencies: packageJson.dependencies || {},
    devDependencies: packageJson.devDependencies || {}
  };
}

// Función para generar el informe
function generateReport() {
  console.log('📝 Generando informe...');
  
  const files = getAllFiles(ROOT_DIR);
  const directoryStructure = analyzeDirectoryStructure();
  const routes = analyzeRoutes();
  const components = analyzeComponents();
  const apis = analyzeAPIs();
  const dependencies = analyzeDependencies();
  
  // Estadísticas de archivos
  const fileStats = {
    total: files.length,
    byExtension: {}
  };
  
  files.forEach(file => {
    const ext = file.extension || 'sin extensión';
    fileStats.byExtension[ext] = (fileStats.byExtension[ext] || 0) + 1;
  });
  
  // Generar informe en Markdown
  const report = `# Resumen del Proyecto Nolivos Law

## Información General
- **Nombre del Proyecto**: Nolivos Law
- **Total de Archivos**: ${fileStats.total}
- **Fecha del Análisis**: ${new Date().toLocaleString()}

## Estructura de Directorios
${Object.entries(directoryStructure)
  .map(([dir, subDirs]) => {
    if (Array.isArray(subDirs)) {
      return `### ${dir}/\n${subDirs.map(subDir => `- ${subDir}/`).join('\n')}`;
    } else {
      return `### ${dir}/\n- ${subDirs}`;
    }
  })
  .join('\n\n')}

## Rutas de la Aplicación
${routes.map(route => `- \`${route}\``).join('\n')}

## Componentes
${components.map(component => `- \`${component}\``).join('\n')}

## APIs
${apis.map(api => `- \`${api}\``).join('\n')}

## Dependencias Principales
${Object.entries(dependencies.dependencies || {})
  .map(([dep, version]) => `- **${dep}**: ${version}`)
  .join('\n')}

## Estadísticas de Archivos
${Object.entries(fileStats.byExtension)
  .map(([ext, count]) => `- **${ext}**: ${count} archivos`)
  .join('\n')}

## Funcionalidades Identificadas
- **Página Principal**: Presentación de servicios legales de inmigración
- **Sistema de Autenticación**: Página de login para diferentes tipos de usuarios
- **Paneles de Administración**: Para administradores, abogados, paralegales y clientes
- **Asistente de Inmigración**: Herramienta de asistencia para trámites migratorios
- **Escáner de Documentos**: Funcionalidad para digitalizar y procesar documentos
- **Chat Legal**: Sistema de comunicación para consultas legales
- **Generación de Documentos**: API para crear documentos legales

## Recomendaciones
- Asegurarse de que todas las rutas estén correctamente implementadas
- Verificar la funcionalidad de los formularios
- Comprobar la responsividad en diferentes dispositivos
- Revisar la accesibilidad del sitio
- Implementar pruebas automatizadas para las funcionalidades críticas

## Próximos Pasos Sugeridos
1. Completar la implementación de las funcionalidades pendientes
2. Realizar pruebas de usuario
3. Optimizar el rendimiento
4. Preparar para despliegue en producción
`;
  
  // Guardar el informe
  fs.writeFileSync(REPORT_FILE, report);
  console.log(`✅ Informe generado: ${REPORT_FILE}`);
  
  return report;
}

// Función principal
async function main() {
  console.log('🚀 Iniciando análisis del proyecto...');
  
  try {
    const report = generateReport();
    
    // Mostrar un resumen en la consola
    console.log('\n📊 Resumen del Proyecto:');
    console.log('------------------------');
    console.log('Nolivos Law es un sitio web para un bufete de abogados especializado en servicios legales de inmigración.');
    console.log('El proyecto incluye una página principal, sistema de autenticación, paneles de administración para diferentes roles,');
    console.log('y funcionalidades especializadas como escáner de documentos, asistente de inmigración y chat legal.');
    console.log('\nEl sitio está construido con Next.js, utilizando el App Router, y tiene un diseño responsive con tema oscuro profesional.');
    console.log('\n✅ Se ha generado un informe detallado en el archivo:');
    console.log(REPORT_FILE);
    
  } catch (error) {
    console.error('❌ Error durante el análisis:', error);
    process.exit(1);
  }
}

// Ejecutar la función principal
main();
