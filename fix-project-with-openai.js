const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuración de OpenAI
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Verificar que la API key está disponible
if (!OPENAI_API_KEY) {
  console.error('❌ Error: La variable de entorno OPENAI_API_KEY no está definida.');
  console.log('Por favor, configura la variable de entorno OPENAI_API_KEY con tu clave de API de OpenAI.');
  process.exit(1);
}

// Rutas principales
const ROOT_DIR = process.cwd();
console.log(`Directorio raíz: ${ROOT_DIR}`);

// Función para analizar la estructura del proyecto
async function analyzeProjectStructure() {
  console.log('🔍 Analizando estructura del proyecto...');
  
  // Obtener lista de archivos y directorios
  const getFilesRecursively = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      // Ignorar node_modules y .next
      if (file === 'node_modules' || file === '.next') {
        return;
      }
      
      if (stat && stat.isDirectory()) {
        results = results.concat(getFilesRecursively(filePath));
      } else {
        results.push(filePath);
      }
    });
    
    return results;
  };
  
  try {
    const files = getFilesRecursively(ROOT_DIR);
    const relativeFiles = files.map(file => path.relative(ROOT_DIR, file));
    
    console.log(`✅ Encontrados ${relativeFiles.length} archivos en el proyecto.`);
    
    // Analizar package.json
    const packageJsonPath = path.join(ROOT_DIR, 'package.json');
    let packageJson = {};
    
    if (fs.existsSync(packageJsonPath)) {
      packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      console.log('✅ Encontrado package.json');
    } else {
      console.log('⚠️ No se encontró package.json');
    }
    
    // Analizar tailwind.config.js
    const tailwindConfigPath = path.join(ROOT_DIR, 'tailwind.config.js');
    let tailwindConfig = null;
    
    if (fs.existsSync(tailwindConfigPath)) {
      tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf8');
      console.log('✅ Encontrado tailwind.config.js');
    } else {
      console.log('⚠️ No se encontró tailwind.config.js');
    }
    
    // Analizar globals.css
    const globalsCssPath = path.join(ROOT_DIR, 'app', 'globals.css');
    let globalsCss = null;
    
    if (fs.existsSync(globalsCssPath)) {
      globalsCss = fs.readFileSync(globalsCssPath, 'utf8');
      console.log('✅ Encontrado globals.css');
    } else {
      console.log('⚠️ No se encontró globals.css');
    }
    
    // Analizar errores de compilación
    let buildErrors = null;
    try {
      execSync('npm run build', { stdio: 'pipe' });
      console.log('✅ La compilación se completó sin errores.');
    } catch (error) {
      buildErrors = error.stdout.toString();
      console.log('⚠️ Se encontraron errores de compilación.');
    }
    
    return {
      files: relativeFiles,
      packageJson,
      tailwindConfig,
      globalsCss,
      buildErrors
    };
  } catch (error) {
    console.error('❌ Error al analizar la estructura del proyecto:', error);
    throw error;
  }
}

// Función para consultar a OpenAI
async function askOpenAI(prompt) {
  console.log('🤖 Consultando a OpenAI...');
  
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
            content: 'Eres un experto en desarrollo web con Next.js, React, Tailwind CSS y TypeScript. Tu tarea es analizar proyectos y proporcionar soluciones precisas a problemas de compilación y configuración.'
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

// Función para aplicar las soluciones
async function applySolutions(solutions) {
  console.log('🔧 Aplicando soluciones...');
  
  try {
    // Parsear las soluciones
    const solutionBlocks = solutions.split('---FILE---').filter(block => block.trim());
    
    for (const block of solutionBlocks) {
      const lines = block.trim().split('\n');
      const filePath = lines[0].trim();
      const content = lines.slice(1).join('\n').trim();
      
      const fullPath = path.join(ROOT_DIR, filePath);
      
      // Asegurarse de que el directorio existe
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Creado directorio: ${dir}`);
      }
      
      // Escribir el archivo
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Actualizado archivo: ${filePath}`);
    }
    
    console.log('✅ Soluciones aplicadas correctamente.');
  } catch (error) {
    console.error('❌ Error al aplicar soluciones:', error);
    throw error;
  }
}

// Función para instalar dependencias
async function installDependencies() {
  console.log('📦 Instalando dependencias...');
  
  try {
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
    console.log('✅ Dependencias instaladas correctamente.');
  } catch (error) {
    console.error('❌ Error al instalar dependencias:', error);
    console.log('⚠️ Intenta instalar manualmente con: npm install --legacy-peer-deps');
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando análisis y reparación del proyecto...');
  
  try {
    // Paso 1: Analizar la estructura del proyecto
    const projectStructure = await analyzeProjectStructure();
    
    // Paso 2: Crear un prompt para OpenAI
    const prompt = `
Necesito que analices un proyecto de Next.js y me ayudes a solucionar los problemas de compilación.

Estructura del proyecto (archivos principales):
${projectStructure.files.slice(0, 50).join('\n')}
${projectStructure.files.length > 50 ? `... y ${projectStructure.files.length - 50} archivos más` : ''}

Package.json:
${JSON.stringify(projectStructure.packageJson, null, 2)}

Tailwind Config:
${projectStructure.tailwindConfig || 'No encontrado'}

Globals CSS:
${projectStructure.globalsCss || 'No encontrado'}

Errores de compilación:
${projectStructure.buildErrors || 'No hay errores de compilación'}

Por favor, proporciona soluciones para los siguientes problemas:
1. Corregir la configuración de Tailwind CSS para resolver errores como "Cannot apply unknown utility class: border-border"
2. Asegurarte de que globals.css tenga las variables CSS necesarias para shadcn/ui
3. Crear o corregir componentes UI faltantes
4. Actualizar package.json con las dependencias necesarias

Para cada archivo que necesite ser creado o modificado, utiliza el formato:
---FILE---
ruta/relativa/al/archivo
contenido completo del archivo
`;
    
    // Paso 3: Consultar a OpenAI
    const solutions = await askOpenAI(prompt);
    console.log('\n🤖 Soluciones propuestas por OpenAI:');
    console.log(solutions);
    
    // Paso 4: Preguntar al usuario si desea aplicar las soluciones
    console.log('\n⚠️ ¿Deseas aplicar estas soluciones? (s/n)');
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    process.stdin.on('data', async (data) => {
      const input = data.toString().trim().toLowerCase();
      
      if (input === 's' || input === 'si' || input === 'y' || input === 'yes') {
        // Paso 5: Aplicar las soluciones
        await applySolutions(solutions);
        
        // Paso 6: Instalar dependencias
        await installDependencies();
        
        // Paso 7: Limpiar caché de Next.js
        const nextCacheDir = path.join(ROOT_DIR, '.next');
        if (fs.existsSync(nextCacheDir)) {
          fs.rmSync(nextCacheDir, { recursive: true, force: true });
          console.log(`✅ Eliminada caché de Next.js: ${nextCacheDir}`);
        }
        
        console.log('\n✅ Proceso completado. Ahora ejecuta:');
        console.log('   npm run build');
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
