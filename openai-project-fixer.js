const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');

// Configuración
const ROOT_DIR = process.cwd();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ""; // Asegúrate de tener tu API key de OpenAI

// Función para hacer solicitudes a la API de OpenAI
async function callOpenAI(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4000
    });

    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          if (parsedData.error) {
            reject(new Error(`OpenAI API Error: ${parsedData.error.message}`));
          } else if (parsedData.choices && parsedData.choices[0]) {
            resolve(parsedData.choices[0].message.content);
          } else {
            reject(new Error('Unexpected response format from OpenAI API'));
          }
        } catch (error) {
          reject(new Error(`Error parsing OpenAI response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Función para escanear archivos recursivamente
function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next')) {
      scanDirectory(filePath, fileList);
    } else if (stat.isFile() && (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.ts') || filePath.endsWith('.tsx'))) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

// Función para analizar importaciones en un archivo
function analyzeImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+[^\s;]+|[^\s;,]+)\s+from\s+['"]([^'"]+)['"]/g;
  const imports = [];
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  
  return imports;
}

// Función para identificar componentes faltantes
function identifyMissingComponents(files) {
  const missingComponents = new Set();
  
  for (const file of files) {
    const imports = analyzeImports(file);
    
    for (const importPath of imports) {
      if (importPath.startsWith('@/components/ui/')) {
        const componentPath = importPath.replace('@/', '');
        const absolutePath = path.join(ROOT_DIR, componentPath + '.tsx');
        
        if (!fs.existsSync(absolutePath)) {
          missingComponents.add(componentPath);
        }
      }
    }
  }
  
  return Array.from(missingComponents);
}

// Función para generar componentes faltantes usando OpenAI
async function generateMissingComponents(missingComponents) {
  console.log(`🔍 Generando ${missingComponents.length} componentes faltantes...`);
  
  for (const componentPath of missingComponents) {
    const prompt = `
    Genera un componente React para un archivo llamado ${componentPath}.tsx.
    Este componente debe ser compatible con shadcn/ui y Next.js.
    Debe ser un componente completo y funcional que siga las mejores prácticas.
    Incluye todas las importaciones necesarias, incluyendo la función cn de @/lib/utils.
    Si es un componente de interfaz de usuario como Select, Switch, etc., asegúrate de que sea accesible y tenga todas las propiedades y variantes necesarias.
    Devuelve solo el código TypeScript sin explicaciones adicionales.
    `;
    
    try {
      console.log(`⏳ Generando ${componentPath}...`);
      const componentCode = await callOpenAI(prompt);
      
      // Crear directorio si no existe
      const dirPath = path.dirname(path.join(ROOT_DIR, componentPath + '.tsx'));
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      // Escribir el componente
      fs.writeFileSync(path.join(ROOT_DIR, componentPath + '.tsx'), componentCode);
      console.log(`✅ Generado ${componentPath}`);
    } catch (error) {
      console.error(`❌ Error al generar ${componentPath}:`, error);
    }
  }
}

// Función para analizar y corregir páginas con errores
async function analyzeAndFixPages(files) {
  console.log('🔍 Analizando páginas con posibles errores...');
  
  const pagesToFix = [];
  
  // Identificar páginas que podrían tener errores
  for (const file of files) {
    if (file.includes('/page.tsx') || file.includes('/page.jsx')) {
      const content = fs.readFileSync(file, 'utf8');
      const imports = analyzeImports(file);
      
      // Verificar si hay importaciones que podrían causar problemas
      const potentialIssues = imports.filter(importPath => 
        importPath.startsWith('@/components/ui/') || 
        importPath.includes('lucide-react')
      );
      
      if (potentialIssues.length > 0) {
        pagesToFix.push({
          path: file,
          content,
          imports: potentialIssues
        });
      }
    }
  }
  
  console.log(`🔍 Encontradas ${pagesToFix.length} páginas que podrían necesitar corrección...`);
  
  // Corregir páginas con problemas
  for (const page of pagesToFix) {
    const prompt = `
    Analiza y corrige el siguiente código de React/Next.js:
    
    Archivo: ${page.path}
    
    ${page.content}
    
    Posibles problemas:
    - Importaciones faltantes o incorrectas: ${page.imports.join(', ')}
    - Componentes que no existen o no están implementados correctamente
    - Errores de sintaxis o lógica
    
    Por favor, corrige el código para que funcione correctamente.
    Asegúrate de que todas las importaciones sean válidas y que los componentes utilizados estén disponibles.
    Si es necesario, simplifica el código para evitar usar componentes que podrían no estar disponibles.
    Devuelve solo el código corregido sin explicaciones adicionales.
    `;
    
    try {
      console.log(`⏳ Corrigiendo ${page.path}...`);
      const correctedCode = await callOpenAI(prompt);
      
      // Escribir el código corregido
      fs.writeFileSync(page.path, correctedCode);
      console.log(`✅ Corregido ${page.path}`);
    } catch (error) {
      console.error(`❌ Error al corregir ${page.path}:`, error);
    }
  }
}

// Función para actualizar package.json
async function updatePackageJson() {
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    const prompt = `
    Analiza el siguiente package.json y sugiere las dependencias que deberían añadirse para un proyecto Next.js con shadcn/ui:
    
    ${JSON.stringify(packageJson, null, 2)}
    
    Devuelve un objeto JSON que contenga solo las dependencias adicionales que deberían añadirse.
    Incluye versiones específicas para cada dependencia.
    Asegúrate de incluir dependencias para componentes UI como @radix-ui/react-select, @radix-ui/react-switch, etc.
    También incluye lucide-react para iconos si no está ya incluido.
    `;
    
    try {
      console.log('⏳ Actualizando package.json...');
      const dependenciesJson = await callOpenAI(prompt);
      
      // Parsear las dependencias sugeridas
      const additionalDependencies = JSON.parse(dependenciesJson);
      
      // Actualizar package.json
      packageJson.dependencies = {
        ...packageJson.dependencies,
        ...additionalDependencies
      };
      
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('✅ Actualizado package.json');
    } catch (error) {
      console.error('❌ Error al actualizar package.json:', error);
    }
  }
}

// Función para instalar dependencias
function installDependencies() {
  try {
    console.log('📦 Instalando dependencias...');
    execSync('npm install', { cwd: ROOT_DIR, stdio: 'inherit' });
    console.log('✅ Dependencias instaladas correctamente');
  } catch (error) {
    console.error('❌ Error al instalar dependencias:', error);
  }
}

// Función principal
async function main() {
  if (!OPENAI_API_KEY) {
    console.error('❌ Error: No se ha proporcionado una API key de OpenAI');
    console.log('Por favor, establece la variable de entorno OPENAI_API_KEY');
    process.exit(1);
  }

  console.log('🚀 Iniciando análisis y corrección del proyecto con OpenAI...');
  
  // 1. Escanear archivos del proyecto
  console.log('🔍 Escaneando archivos del proyecto...');
  const files = scanDirectory(ROOT_DIR);
  console.log(`✅ Escaneados ${files.length} archivos`);
  
  // 2. Identificar componentes faltantes
  console.log('🔍 Identificando componentes faltantes...');
  const missingComponents = identifyMissingComponents(files);
  console.log(`✅ Identificados ${missingComponents.length} componentes faltantes`);
  
  // 3. Generar componentes faltantes
  await generateMissingComponents(missingComponents);
  
  // 4. Analizar y corregir páginas con errores
  await analyzeAndFixPages(files);
  
  // 5. Actualizar package.json
  await updatePackageJson();
  
  // 6. Instalar dependencias
  installDependencies();
  
  console.log('');
  console.log('✅ Proyecto corregido completamente con la ayuda de OpenAI');
  console.log('');
  console.log('📋 Resumen de acciones:');
  console.log(`1. Se han generado ${missingComponents.length} componentes faltantes`);
  console.log('2. Se han corregido páginas con posibles errores');
  console.log('3. Se ha actualizado package.json con las dependencias necesarias');
  console.log('4. Se han instalado las dependencias');
  console.log('');
  console.log('🏁 Ahora ejecuta:');
  console.log('   npm run dev');
}

main().catch(err => {
  console.error('❌ Error en el script:', err);
  process.exit(1);
});
