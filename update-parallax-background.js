// update-parallax-background.js
const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🔧 Actualizando fondo y mejorando el efecto parallax...');

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

// Descargar nueva imagen de fondo
async function updateBackgroundImage() {
  const newBackgroundUrl = 'https://i.postimg.cc/TYPpVM7N/DALL-E-2025-03-11-22-08-05-A-high-quality-ultra-large-transparent-PNG-background-for-an-immigrati.webp';
  const localPath = path.join(process.cwd(), 'public', 'images', 'usa-law-background.webp');
  
  try {
    await downloadImage(newBackgroundUrl, localPath);
    return true;
  } catch (error) {
    console.error('❌ Error descargando la imagen de fondo:', error.message);
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
    
    // Actualizar la imagen de fondo
    content = content.replace(
      /src="[^"]*"(\s+loading="eager"\s+width="100%"\s+data-parallax-layer="1")/,
      'src="/images/usa-law-background.webp"$1'
    );
    
    // Añadir efecto de opacidad a la imagen de fondo
    content = content.replace(
      /className={styles\.parallax__layer_img}(\s+\/>)(\s+\s+)/,
      'className={styles.parallax__layer_img} style={{opacity: 0.7}}$1$2'
    );
    
    // Asegurar que el texto "INMIGRACIÓN" esté detrás del abogado
    content = content.replace(
      /<div data-parallax-layer="2" className={styles\.parallax__layer_title}>/,
      '<div data-parallax-layer="2" className={styles.parallax__layer_title} style={{zIndex: 2}}>'
    );
    
    // Mejora del texto "INMIGRACIÓN"
    content = content.replace(
      /<h2 className={styles\.parallax__title}>INMIGRACIÓN<\/h2>/,
      '<h2 className={styles.parallax__title} style={{fontSize: "13vw", opacity: 0.3, letterSpacing: "0.1em"}}>INMIGRACIÓN</h2>'
    );
    
    // Ajustar la capa del abogado
    content = content.replace(
      /<div data-parallax-layer="4" className={styles\.parallax__lawyer_container}>/,
      '<div data-parallax-layer="4" className={styles.parallax__lawyer_container} style={{zIndex: 10}}>'
    );
    
    // Eliminar los espacios en blanco ajustando el contenedor principal
    content = content.replace(
      /<div className={styles\.parallax} ref={parallaxRef}>/,
      '<div className={styles.parallax} ref={parallaxRef} style={{overflow: "hidden", width: "100%", height: "100vh"}}>'
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
    
    // Ajustar el container principal para eliminar espacios en blanco
    if (!cssContent.includes('width: 100vw;')) {
      cssContent = cssContent.replace(
        '.parallax {',
        '.parallax {\n  width: 100vw;\n  overflow: hidden;\n  position: relative;'
      );
    }
    
    // Mejorar la opacidad del texto
    if (!cssContent.includes('opacity: 0.3;')) {
      cssContent = cssContent.replace(
        '.parallax__title {',
        '.parallax__title {\n  opacity: 0.3;\n  letter-spacing: 0.1em;'
      );
    }
    
    // Mejorar el contenedor del abogado
    if (!cssContent.includes('overflow: hidden;')) {
      cssContent = cssContent.replace(
        '.parallax__lawyer_container {',
        '.parallax__lawyer_container {\n  overflow: hidden;\n  z-index: 10;'
      );
    }
    
    // Añadir estilo para corregir el desbordamiento
    if (!cssContent.includes('.parallax__visuals {')) {
      cssContent += `\n
/* Asegurar que todo el contenido se ajuste correctamente */
.parallax__visuals {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Mejorar el fade para evitar bordes blancos */
.parallax__fade {
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.6) 100%);
}
`;
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
  console.log('🚀 Iniciando actualización del fondo y mejoras visuales...');
  
  const backgroundUpdated = await updateBackgroundImage();
  if (backgroundUpdated) {
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
