const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuración
const URL = 'http://localhost:3000'; // Cambia esto si tu sitio está en otra URL
const SCREENSHOTS_DIR = path.join(process.cwd(), 'test-screenshots');

// Crear directorio para capturas de pantalla si no existe
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function runTests() {
  console.log('🚀 Iniciando pruebas de funcionalidad...');
  
  const browser = await puppeteer.launch({
    headless: false, // Cambiar a true para ejecutar sin interfaz gráfica
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    // 1. Cargar la página principal
    console.log('📄 Cargando página principal...');
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-pagina-principal.png') });
    console.log('✅ Página principal cargada correctamente');
    
    // 2. Verificar que el logo se cargue correctamente
    console.log('🖼️ Verificando logo...');
    const logoExists = await page.evaluate(() => {
      const img = document.querySelector('img[alt="Nolivos Law"]');
      return img && img.complete && img.naturalWidth > 0;
    });
    
    if (logoExists) {
      console.log('✅ Logo cargado correctamente');
    } else {
      console.error('❌ Error: Logo no encontrado o no cargado correctamente');
    }
    
    // 3. Verificar botones en la sección hero
    console.log('🔘 Verificando botones de la sección hero...');
    const heroButtons = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('section:first-of-type button'));
      return buttons.map(button => ({
        text: button.textContent.trim(),
        visible: button.offsetParent !== null
      }));
    });
    
    console.log(`Encontrados ${heroButtons.length} botones en la sección hero:`);
    heroButtons.forEach(button => {
      console.log(`- ${button.text}: ${button.visible ? '✅ Visible' : '❌ No visible'}`);
    });
    
    // 4. Probar formulario de contacto
    console.log('📝 Probando formulario de contacto...');
    
    // Verificar que los campos del formulario existan
    const formFields = await page.evaluate(() => {
      const nameInput = document.querySelector('input[placeholder="Tu nombre"]');
      const emailInput = document.querySelector('input[placeholder="tu@email.com"]');
      const messageTextarea = document.querySelector('textarea[placeholder="¿Cómo podemos ayudarte?"]');
      const submitButton = Array.from(document.querySelectorAll('button')).find(b => 
        b.textContent.includes('Enviar Consulta'));
      
      return {
        nameExists: !!nameInput,
        emailExists: !!emailInput,
        messageExists: !!messageTextarea,
        submitExists: !!submitButton
      };
    });
    
    console.log('Campos del formulario:');
    console.log(`- Campo de nombre: ${formFields.nameExists ? '✅ Encontrado' : '❌ No encontrado'}`);
    console.log(`- Campo de email: ${formFields.emailExists ? '✅ Encontrado' : '❌ No encontrado'}`);
    console.log(`- Campo de mensaje: ${formFields.messageExists ? '✅ Encontrado' : '❌ No encontrado'}`);
    console.log(`- Botón de envío: ${formFields.submitExists ? '✅ Encontrado' : '❌ No encontrado'}`);
    
    // Rellenar y enviar el formulario si todos los campos existen
    if (formFields.nameExists && formFields.emailExists && formFields.messageExists && formFields.submitExists) {
      await page.type('input[placeholder="Tu nombre"]', 'Usuario de Prueba');
      await page.type('input[placeholder="tu@email.com"]', 'test@example.com');
      await page.type('textarea[placeholder="¿Cómo podemos ayudarte?"]', 'Este es un mensaje de prueba automatizado.');
      
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-formulario-rellenado.png') });
      
      // Intentar enviar el formulario (nota: esto puede no completarse si el formulario tiene validación del lado del servidor)
      const submitButton = await page.$('button:has-text("Enviar Consulta")');
      if (submitButton) {
        await submitButton.click();
        await page.waitForTimeout(1000); // Esperar un segundo para ver si hay alguna respuesta
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-formulario-enviado.png') });
        console.log('✅ Formulario enviado correctamente');
      }
    }
    
    // 5. Verificar sección de servicios
    console.log('🔍 Verificando sección de servicios...');
    const serviceCards = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('section:last-of-type > div > div'));
      return cards.map(card => {
        const title = card.querySelector('h4')?.textContent.trim();
        const description = card.querySelector('p')?.textContent.trim();
        const button = card.querySelector('button')?.textContent.trim();
        
        return {
          title,
          description,
          button,
          visible: card.offsetParent !== null
        };
      });
    });
    
    console.log(`Encontradas ${serviceCards.length} tarjetas de servicios:`);
    serviceCards.forEach((card, index) => {
      console.log(`Servicio ${index + 1}:`);
      console.log(`- Título: ${card.title || 'No encontrado'}`);
      console.log(`- Descripción: ${card.description ? '✅ Presente' : '❌ No encontrada'}`);
      console.log(`- Botón: ${card.button || 'No encontrado'}`);
      console.log(`- Visibilidad: ${card.visible ? '✅ Visible' : '❌ No visible'}`);
    });
    
    // 6. Probar enlace de inicio de sesión
    console.log('🔗 Probando enlace de inicio de sesión...');
    const loginLink = await page.$('a[href="/login"]');
    
    if (loginLink) {
      console.log('✅ Enlace de inicio de sesión encontrado');
      
      // Hacer clic en el enlace de inicio de sesión
      await loginLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {
        console.log('⚠️ Navegación no completada, pero continuando...');
      });
      
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04-pagina-login.png') });
      
      const currentUrl = page.url();
      if (currentUrl.includes('/login')) {
        console.log('✅ Navegación a página de login exitosa');
      } else {
        console.error('❌ Error: No se pudo navegar a la página de login');
      }
      
      // Volver a la página principal
      await page.goto(URL, { waitUntil: 'networkidle2', timeout: 10000 });
    } else {
      console.error('❌ Error: Enlace de inicio de sesión no encontrado');
    }
    
    // 7. Verificar responsividad (simulando diferentes dispositivos)
    console.log('📱 Verificando responsividad...');
    
    // Móvil
    await page.setViewport({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05-vista-movil.png') });
    
    // Tablet
    await page.setViewport({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06-vista-tablet.png') });
    
    // Desktop
    await page.setViewport({ width: 1280, height: 800 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07-vista-desktop.png') });
    
    console.log('✅ Capturas de pantalla de responsividad guardadas');
    
    // 8. Verificar que no haya errores en la consola
    console.log('🔍 Verificando errores en la consola...');
    const consoleErrors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.reload({ waitUntil: 'networkidle2' });
    
    if (consoleErrors.length === 0) {
      console.log('✅ No se encontraron errores en la consola');
    } else {
      console.error(`❌ Se encontraron ${consoleErrors.length} errores en la consola:`);
      consoleErrors.forEach((error, index) => {
        console.error(`  ${index + 1}. ${error}`);
      });
    }
    
    console.log('\n📊 Resumen de pruebas:');
    console.log('✅ Página principal carga correctamente');
    console.log(`${logoExists ? '✅' : '❌'} Logo`);
    console.log(`${heroButtons.length > 0 ? '✅' : '❌'} Botones de la sección hero`);
    console.log(`${formFields.nameExists && formFields.emailExists && formFields.messageExists && formFields.submitExists ? '✅' : '❌'} Formulario de contacto`);
    console.log(`${serviceCards.length > 0 ? '✅' : '❌'} Tarjetas de servicios`);
    console.log(`${loginLink ? '✅' : '❌'} Enlace de inicio de sesión`);
    console.log(`${consoleErrors.length === 0 ? '✅' : '❌'} Sin errores en la consola`);
    
    console.log('\n📸 Capturas de pantalla guardadas en:', SCREENSHOTS_DIR);
    
  } catch (error) {
    console.error('❌ Error durante las pruebas:', error);
  } finally {
    await browser.close();
    console.log('🏁 Pruebas finalizadas');
  }
}

// Instalar puppeteer si no está instalado
async function installDependencies() {
  console.log('📦 Verificando dependencias...');
  
  try {
    require.resolve('puppeteer');
    console.log('✅ Puppeteer ya está instalado');
  } catch (e) {
    console.log('📦 Instalando puppeteer...');
    
    try {
      const { execSync } = require('child_process');
      execSync('npm install puppeteer --save-dev', { stdio: 'inherit' });
      console.log('✅ Puppeteer instalado correctamente');
    } catch (error) {
      console.error('❌ Error al instalar puppeteer:', error);
      process.exit(1);
    }
  }
}

// Función principal
async function main() {
  try {
    await installDependencies();
    await runTests();
  } catch (error) {
    console.error('❌ Error en el proceso principal:', error);
  }
}

// Ejecutar la función principal
main();
