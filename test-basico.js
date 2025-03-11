const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuración
const URL = 'http://localhost:3000'; // Cambia esto si tu sitio está en otra URL
const SCREENSHOTS_DIR = path.join(process.cwd(), 'test-screenshots');

// Crear directorio para capturas de pantalla si no existe
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Función para hacer una solicitud HTTP
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Función para tomar una captura de pantalla usando curl y convertir
function takeScreenshot(url, outputPath) {
  return new Promise((resolve, reject) => {
    console.log(`📸 Intentando tomar captura de pantalla de ${url}...`);
    
    // Verificar si el sitio está en ejecución
    exec(`curl -s -o /dev/null -w "%{http_code}" ${url}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error al verificar el sitio: ${error.message}`);
        reject(error);
        return;
      }
      
      const statusCode = stdout.trim();
      if (statusCode !== '200') {
        console.error(`❌ El sitio no está disponible. Código de estado: ${statusCode}`);
        reject(new Error(`Sitio no disponible. Código: ${statusCode}`));
        return;
      }
      
      console.log('✅ Sitio disponible. Guardando información...');
      
      // Guardar el HTML de la página
      exec(`curl -s ${url} > ${path.join(SCREENSHOTS_DIR, 'page.html')}`, (error) => {
        if (error) {
          console.error(`❌ Error al guardar HTML: ${error.message}`);
          reject(error);
          return;
        }
        
        console.log('✅ HTML guardado correctamente');
        resolve();
      });
    });
  });
}

// Función para verificar elementos en el HTML
function checkElements(html) {
  const results = {
    logo: html.includes('logo.png') || html.includes('alt="TNL Logo"') || html.includes('alt="Nolivos Law"'),
    title: html.includes('NOLIVOS LAW'),
    subtitle: html.includes('SERVICIOS LEGALES'),
    heroButtons: (html.match(/Consulta Gratuita|Conoce Más/g) || []).length,
    formFields: {
      name: html.includes('Tu nombre'),
      email: html.includes('tu@email.com'),
      message: html.includes('¿Cómo podemos ayudarte?'),
      submit: html.includes('Enviar Consulta')
    },
    services: (html.match(/Visas y Permisos|Asilo y Refugio/g) || []).length,
    loginLink: html.includes('href="/login"') || html.includes('Iniciar Sesión')
  };
  
  return results;
}

// Función principal
async function main() {
  console.log('🚀 Iniciando pruebas básicas...');
  
  try {
    // 1. Verificar que el sitio esté en ejecución
    console.log(`🔍 Verificando si el sitio está en ejecución en ${URL}...`);
    
    try {
      const response = await makeRequest(URL);
      console.log(`✅ Sitio disponible. Código de estado: ${response.statusCode}`);
      
      // Guardar el HTML para análisis
      const htmlPath = path.join(SCREENSHOTS_DIR, 'page.html');
      fs.writeFileSync(htmlPath, response.body);
      console.log(`✅ HTML guardado en: ${htmlPath}`);
      
      // Analizar el HTML para verificar elementos
      console.log('🔍 Analizando elementos en la página...');
      const elements = checkElements(response.body);
      
      console.log('\n📊 Resultados del análisis:');
      console.log(`Logo: ${elements.logo ? '✅ Encontrado' : '❌ No encontrado'}`);
      console.log(`Título "NOLIVOS LAW": ${elements.title ? '✅ Encontrado' : '❌ No encontrado'}`);
      console.log(`Subtítulo "SERVICIOS LEGALES": ${elements.subtitle ? '✅ Encontrado' : '❌ No encontrado'}`);
      console.log(`Botones en sección hero: ${elements.heroButtons > 0 ? `✅ Encontrados (${elements.heroButtons})` : '❌ No encontrados'}`);
      
      console.log('\nFormulario de contacto:');
      console.log(`- Campo de nombre: ${elements.formFields.name ? '✅ Encontrado' : '❌ No encontrado'}`);
      console.log(`- Campo de email: ${elements.formFields.email ? '✅ Encontrado' : '❌ No encontrado'}`);
      console.log(`- Campo de mensaje: ${elements.formFields.message ? '✅ Encontrado' : '❌ No encontrado'}`);
      console.log(`- Botón de envío: ${elements.formFields.submit ? '✅ Encontrado' : '❌ No encontrado'}`);
      
      console.log(`\nServicios: ${elements.services > 0 ? `✅ Encontrados (${elements.services})` : '❌ No encontrados'}`);
      console.log(`Enlace de inicio de sesión: ${elements.loginLink ? '✅ Encontrado' : '❌ No encontrado'}`);
      
      // 2. Tomar una captura de pantalla (si es posible)
      await takeScreenshot(URL, path.join(SCREENSHOTS_DIR, 'screenshot.png'));
      
      // 3. Verificar rutas adicionales
      console.log('\n🔍 Verificando rutas adicionales...');
      
      const routes = [
        '/login',
        '/admin/dashboard',
        '/client/dashboard',
        '/lawyer/dashboard',
        '/paralegal/dashboard'
      ];
      
      for (const route of routes) {
        try {
          const routeUrl = `${URL}${route}`;
          const routeResponse = await makeRequest(routeUrl);
          console.log(`Ruta ${route}: ${routeResponse.statusCode === 200 ? '✅ Disponible' : `❌ Error (${routeResponse.statusCode})`}`);
        } catch (error) {
          console.error(`Ruta ${route}: ❌ Error - ${error.message}`);
        }
      }
      
      console.log('\n✅ Pruebas básicas completadas');
      console.log(`📁 Resultados guardados en: ${SCREENSHOTS_DIR}`);
      
    } catch (error) {
      console.error(`❌ Error al verificar el sitio: ${error.message}`);
      console.log('\n⚠️ Asegúrate de que tu aplicación esté en ejecución con:');
      console.log('   npm run start');
    }
    
  } catch (error) {
    console.error('❌ Error durante las pruebas:', error);
  }
}

// Ejecutar la función principal
main();
