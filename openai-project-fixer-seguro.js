const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuración
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error('❌ Error: La variable de entorno OPENAI_API_KEY no está definida.');
  console.log('Por favor, configura la variable de entorno OPENAI_API_KEY con tu clave de API de OpenAI.');
  process.exit(1);
}

const ROOT_DIR = process.cwd();
console.log(`Directorio raíz: ${ROOT_DIR}`);

// Crear copia de seguridad del proyecto
function createBackup() {
  console.log('📦 Creando copia de seguridad del proyecto...');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(ROOT_DIR, `backup-${timestamp}`);
  
  // Crear directorio de backup
  fs.mkdirSync(backupDir, { recursive: true });
  
  // Función para copiar archivos y directorios recursivamente
  function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    
    if (stat.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      const entries = fs.readdirSync(src);
      
      for (const entry of entries) {
        // Ignorar node_modules, .next y .git
        if (entry === 'node_modules' || entry === '.next' || entry === '.git') {
          continue;
        }
        
        const srcPath = path.join(src, entry);
        const destPath = path.join(dest, entry);
        copyRecursive(srcPath, destPath);
      }
    } else {
      fs.copyFileSync(src, dest);
    }
  }
  
  // Copiar archivos
  copyRecursive(ROOT_DIR, backupDir);
  
  console.log(`✅ Copia de seguridad creada en: ${backupDir}`);
  return backupDir;
}

// Función para obtener todos los archivos relevantes
function getRelevantFiles() {
  console.log('🔍 Analizando archivos del proyecto...');
  
  const ignoreDirs = ['node_modules', '.next', '.git', 'backup-'];
  const relevantExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css'];
  
  function scanDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const relativePath = path.relative(ROOT_DIR, fullPath);
      
      // Ignorar directorios específicos
      if (ignoreDirs.some(ignoreDir => relativePath.startsWith(ignoreDir))) {
        continue;
      }
      
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        results = results.concat(scanDir(fullPath));
      } else {
        const ext = path.extname(file).toLowerCase();
        if (relevantExtensions.includes(ext)) {
          results.push({
            path: relativePath,
            content: fs.readFileSync(fullPath, 'utf8')
          });
        }
      }
    }
    
    return results;
  }
  
  return scanDir(ROOT_DIR);
}

// Función para analizar el proyecto con OpenAI
async function analyzeWithOpenAI(files) {
  console.log('🤖 Analizando el proyecto con OpenAI...');
  
  // Preparar los datos para la API
  const fileContents = files.map(file => `Archivo: ${file.path}\n\n${file.content}`).join('\n\n---\n\n');
  
  // Limitar el tamaño para evitar exceder los límites de la API
  const maxLength = 100000; // Aproximadamente 100k caracteres
  const truncatedContents = fileContents.length > maxLength 
    ? fileContents.substring(0, maxLength) + '... [contenido truncado]' 
    : fileContents;
  
  const prompt = `
Eres un experto en desarrollo web con Next.js, React y Tailwind CSS. Necesito que analices mi proyecto y corrijas los problemas de estilo y funcionalidad, pero manteniendo todo el trabajo existente.

IMPORTANTE: 
1. Mantén el diseño en negro y blanco como está actualmente
2. Preserva toda la funcionalidad existente
3. Solo corrige lo que está roto, no rediseñes completamente
4. Asegúrate de que los estilos CSS se apliquen correctamente
5. Mantén la misma estructura y organización de archivos

Problemas principales:
1. Los estilos CSS no se aplican correctamente
2. Posibles problemas con componentes que no funcionan
3. Asegúrate de que el diseño se mantenga en negro y blanco

Por favor, analiza los siguientes archivos y proporciona soluciones específicas para cada problema. Para cada archivo que necesite ser modificado, usa el formato:

---ARCHIVO---
ruta/al/archivo
CONTENIDO COMPLETO DEL ARCHIVO CORREGIDO

Aquí están los archivos relevantes:

${truncatedContents}
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Eres un experto en desarrollo web con Next.js, React y Tailwind CSS. Tu tarea es analizar código y proporcionar soluciones precisas que mantengan el diseño y funcionalidad existentes, solo corrigiendo lo que está roto.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 4000
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error en la API de OpenAI: ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('❌ Error al consultar a OpenAI:', error);
    throw error;
  }
}

// Función para aplicar las correcciones
function applyCorrections(corrections) {
  console.log('🔧 Aplicando correcciones...');
  
  const fileBlocks = corrections.split('---ARCHIVO---').filter(block => block.trim());
  
  for (const block of fileBlocks) {
    const lines = block.trim().split('\n');
    const filePath = lines[0].trim();
    const content = lines.slice(1).join('\n').trim();
    
    const fullPath = path.join(ROOT_DIR, filePath);
    
    // Crear directorio si no existe
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Creado directorio: ${dir}`);
    }
    
    // Escribir archivo
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Actualizado: ${filePath}`);
  }
}

// Función para verificar la instalación de dependencias
function checkAndInstallDependencies() {
  console.log('📦 Verificando dependencias...');
  
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ No se encontró package.json');
    return;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Lista de dependencias que podrían ser necesarias
  const potentialDependencies = [
    'tailwindcss',
    'postcss',
    'autoprefixer',
    'lucide-react'
  ];
  
  const missingDependencies = potentialDependencies.filter(dep => {
    return !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep];
  });
  
  if (missingDependencies.length > 0) {
    console.log(`📦 Instalando dependencias faltantes: ${missingDependencies.join(', ')}`);
    
    try {
      execSync(`npm install ${missingDependencies.join(' ')} --legacy-peer-deps`, { stdio: 'inherit' });
      console.log('✅ Dependencias instaladas correctamente');
    } catch (error) {
      console.error('❌ Error al instalar dependencias:', error);
    }
  } else {
    console.log('✅ Todas las dependencias necesarias están instaladas');
  }
}

// Función para limpiar la caché de Next.js
function cleanNextCache() {
  console.log('🧹 Limpiando caché de Next.js...');
  
  const nextCacheDir = path.join(ROOT_DIR, '.next');
  if (fs.existsSync(nextCacheDir)) {
    try {
      fs.rmSync(nextCacheDir, { recursive: true, force: true });
      console.log(`✅ Eliminada caché de Next.js: ${nextCacheDir}`);
    } catch (error) {
      console.error(`❌ Error al eliminar caché de Next.js: ${error.message}`);
    }
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando análisis y corrección del proyecto...');
  
  try {
    // Crear copia de seguridad
    const backupDir = createBackup();
    console.log(`⚠️ Si algo sale mal, puedes restaurar tu proyecto desde: ${backupDir}`);
    
    // Verificar e instalar dependencias
    checkAndInstallDependencies();
    
    // Obtener archivos relevantes
    const files = getRelevantFiles();
    console.log(`📁 Encontrados ${files.length} archivos relevantes`);
    
    // Analizar con OpenAI
    const corrections = await analyzeWithOpenAI(files);
    console.log('🤖 Análisis de OpenAI completado');
    
    // Mostrar las correcciones
    console.log('\n🔍 Correcciones sugeridas por OpenAI:');
    console.log(corrections);
    
    // Preguntar al usuario si desea aplicar las correcciones
    console.log('\n⚠️ ¿Deseas aplicar estas correcciones? (s/n)');
    
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    process.stdin.on('data', async (data) => {
      const input = data.toString().trim().toLowerCase();
      
      if (input === 's' || input === 'si' || input === 'y' || input === 'yes') {
        // Aplicar correcciones
        applyCorrections(corrections);
        
        // Limpiar caché de Next.js
        cleanNextCache();
        
        console.log('\n✅ Proceso completado. Ahora ejecuta:');
        console.log('   npm run dev');
        console.log(`\n⚠️ Recuerda: Si algo no funciona como esperabas, puedes restaurar tu proyecto desde: ${backupDir}`);
      } else {
        console.log('❌ Operación cancelada por el usuario.');
      }
      
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Error en el proceso:', error);
    process.exit(1);
  }
}

// Ejecutar la función principal
main();
