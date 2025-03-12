// update-parallax-final.js
const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🔧 Actualizando imagen de Guillermo y ajustando el efecto parallax...');

// Función para descargar imagen
function downloadImage(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Error descargando imagen: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✅ Imagen descargada: ${destination}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(destination, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(destination, () => {});
      reject(err);
    });
  });
}

// Descargar nueva imagen de Guillermo
async function updateAbogadoImage() {
  const newImageUrl = 'https://i.postimg.cc/Nfd8wvPR/Adobe-Express-file.png';
  const localPath = path.join(process.cwd(), 'public', 'images', 'guillermo-nolivos-updated.png');
  
  try {
    await downloadImage(newImageUrl, localPath);
    return true;
  } catch (error) {
    console.error('❌ Error descargando la nueva imagen de Guillermo:', error.message);
    return false;
  }
}

// Actualizar el componente de parallax
function updateParallaxComponent() {
  const parallaxPath = path.join(process.cwd(), 'components', 'ParallaxHero.tsx');
  
  if (!fs.existsSync(parallaxPath)) {
    console.error('❌ No se encontró el archivo de componente ParallaxHero.tsx');
    return false;
  }
  
  try {
    let content = fs.readFileSync(parallaxPath, 'utf8');
    
    // Actualizar la imagen del abogado
    if (content.includes('Image from "next/image"')) {
      // Si ya está usando el componente Image de Next.js
      content = content.replace(
        /src="\/images\/guillermo-nolivos\.png"/,
        'src="/images/guillermo-nolivos-updated.png"'
      );
      
      content = content.replace(
        /width={600}\s+height={800}/,
        'width={500} height={700}'
      );
    } else {
      // Si usa img estándar
      content = content.replace(
        /src="\/images\/guillermo-nolivos\.png"/,
        'src="/images/guillermo-nolivos-updated.png"'
      );
    }
    
    // Ajustar z-index para asegurar que la tipografía vaya detrás
    content = content.replace(
      /<div data-parallax-layer="2"[^>]*>/,
      '<div data-parallax-layer="2" className={styles.parallax__layer_title} style={{zIndex: 3}}>'
    );
    
    content = content.replace(
      /<div data-parallax-layer="4"[^>]*>/,
      '<div data-parallax-layer="4" className={styles.parallax__lawyer_container} style={{zIndex: 5}}>'
    );
    
    // Actualizar el tamaño y estilo del texto
    content = content.replace(
      /<h2[^>]*>INMIGRACIÓN<\/h2>/,
      '<h2 className={styles.parallax__title} style={{fontSize: "15vw", opacity: 0.25, letterSpacing: "0.05em", fontWeight: 800}}>INMIGRACIÓN</h2>'
    );
    
    fs.writeFileSync(parallaxPath, content);
    console.log('✅ Actualizado componente ParallaxHero.tsx');
    return true;
  } catch (error) {
    console.error('❌ Error actualizando el componente:', error.message);
    return false;
  }
}

// Actualizar los estilos CSS
function updateParallaxStyles() {
  const cssPath = path.join(process.cwd(), 'styles', 'parallax.module.css');
  
  if (!fs.existsSync(cssPath)) {
    console.error('❌ No se encontró el archivo de estilos parallax.module.css');
    return false;
  }
  
  try {
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // Ajustar el z-index de las capas
    cssContent = cssContent.replace(
      '.parallax__layer_title {',
      '.parallax__layer_title {\n  z-index: 3;'
    );
    
    cssContent = cssContent.replace(
      '.parallax__lawyer {',
      '.parallax__lawyer {\n  z-index: 5;'
    );
    
    // Ajustar tamaño para la nueva imagen
    if (cssContent.includes('.parallax__lawyer_container {')) {
      cssContent = cssContent.replace(
        '.parallax__lawyer_container {',
        '.parallax__lawyer_container {\n  z-index: 5;\n  display: flex;\n  justify-content: center;\n  align-items: center;'
      );
    }
    
    // Mejorar el estilo del título para que se vea mejor
    if (cssContent.includes('.parallax__title {')) {
      cssContent = cssContent.replace(
        '.parallax__title {',
        '.parallax__title {\n  opacity: 0.25;\n  font-size: 15vw;\n  letter-spacing: 0.05em;\n  font-weight: 800;\n  color: white;\n  text-shadow: 0 0 10px rgba(0,0,0,0.5);'
      );
    }
    
    fs.writeFileSync(cssPath, cssContent);
    console.log('✅ Actualizados estilos CSS del parallax');
    return true;
  } catch (error) {
    console.error('❌ Error actualizando los estilos CSS:', error.message);
    return false;
  }
}

// Ejecutar todas las operaciones
async function main() {
  console.log('🚀 Iniciando actualización de la imagen de Guillermo y ajustes finales...');
  
  const imageUpdated = await updateAbogadoImage();
  if (imageUpdated) {
    const componentUpdated = updateParallaxComponent();
    const stylesUpdated = updateParallaxStyles();
    
    if (componentUpdated && stylesUpdated) {
      console.log('\n✨ Actualizaciones completadas con éxito');
      console.log('\nPara ver los cambios, ejecuta:');
      console.log('npm run build');
      console.log('npm run start');
    } else {
      console.log('\n⚠️ Algunas actualizaciones no se completaron correctamente');
    }
  }
}

main();
