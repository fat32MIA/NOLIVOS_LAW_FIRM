// setup-images.js
const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🖼️ Configurando imágenes y directorios...');

// Crear directorio de imágenes si no existe
const imagesDir = path.join(process.cwd(), 'public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('📁 Creado directorio public/images/');
}

// Función para descargar imagen
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Error al descargar imagen: ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✅ Imagen descargada correctamente: ${filepath}`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Limpiar archivo parcial
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Descargar logo
const logoUrl = 'https://nolivoslaw.com/wp-content/uploads/2024/07/logo-inolpng.png';
const logoPath = path.join(imagesDir, 'logo-inolpng.png');

if (!fs.existsSync(logoPath)) {
  console.log(`🔄 Descargando logo desde ${logoUrl}...`);
  downloadImage(logoUrl, logoPath)
    .then(() => {
      console.log('✅ Logo descargado correctamente');
    })
    .catch((error) => {
      console.error('❌ Error al descargar el logo:', error.message);
      
      // Crear un logo de respaldo si falla la descarga
      console.log('🔄 Creando logo de respaldo...');
      const backupLogoContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="40" viewBox="0 0 150 40">
          <rect width="150" height="40" fill="#0d2247"/>
          <text x="10" y="25" font-family="Arial" font-size="16" fill="white">NOLIVOS LAW</text>
        </svg>
      `;
      const backupLogoPath = path.join(imagesDir, 'logo-backup.svg');
      fs.writeFileSync(backupLogoPath, backupLogoContent);
      console.log('✅ Logo de respaldo creado en public/images/logo-backup.svg');
    });
} else {
  console.log('✅ El logo ya existe en public/images/');
}

console.log('\n✨ Configuración de imágenes completada');
