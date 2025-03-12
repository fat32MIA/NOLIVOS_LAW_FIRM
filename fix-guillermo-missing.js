// fix-guillermo-missing.js
const fs = require('fs');
const path = require('path');

console.log('🔧 Corrigiendo problema de Guillermo faltante y espacios en blanco...');

// Actualizar el componente ParallaxHero
const updateParallaxComponent = () => {
  const parallaxPath = path.join(process.cwd(), 'components', 'ParallaxHero.tsx');
  
  if (!fs.existsSync(parallaxPath)) {
    console.error('❌ No se encontró el archivo ParallaxHero.tsx');
    return false;
  }
  
  try {
    let content = fs.readFileSync(parallaxPath, 'utf8');
    
    // Verificar si Guillermo se ha eliminado por completo
    const hasGuillermo = content.includes('data-parallax-layer="4"');
    
    if (!hasGuillermo) {
      // Si Guillermo ha desaparecido, necesitamos restaurarlo completo
      // Encuentra la sección donde van las capas del parallax
      const layersMatch = content.match(/<div data-parallax-layers[^>]*>[\s\S]*?<\/div>/);
      
      if (layersMatch) {
        const layersContent = layersMatch[0];
        
        // Agregar la capa de Guillermo
        const newLayersContent = layersContent.replace(
          /(<\/div>\s*<div className={styles\.parallax__fade})/,
          `
              {/* Capa 4: Guillermo Nolivos */}
              <div data-parallax-layer="4" className={styles.parallax__lawyer_container}>
                <Image 
                  src="/images/guillermo-nolivos-updated.png"
                  alt="Abogado Guillermo Nolivos"
                  width={500}
                  height={700}
                  quality={100}
                  priority
                  className={styles.parallax__lawyer}
                />
              </div>
              $1`
        );
        
        content = content.replace(layersContent, newLayersContent);
      }
    } else {
      // Si Guillermo todavía está en el código pero no aparece, ajustamos su z-index
      content = content.replace(
        /(<div data-parallax-layer="4"[^>]*>)/,
        '$1 {/* Capa de Guillermo */}'
      );
      
      // Ajustar z-index para asegurar que aparezca sobre el fondo
      if (content.includes('parallax__lawyer_container')) {
        content = content.replace(
          'className={styles.parallax__lawyer_container}',
          'className={styles.parallax__lawyer_container} style={{zIndex: 20, position: "absolute"}}'
        );
      }
      
      // Ajustar z-index del Image componente también
      if (content.includes('className={styles.parallax__lawyer}')) {
        content = content.replace(
          'className={styles.parallax__lawyer}',
          'className={styles.parallax__lawyer} style={{zIndex: 20}}'
        );
      }
    }
    
    // Eliminar espacios en blanco ajustando el contenedor
    content = content.replace(
      /<div className={styles\.parallax}[^>]*>/,
      '<div className={styles.parallax} style={{width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden"}}>'
    );
    
    // Asegurar que el texto INMIGRACIÓN aparezca, si es necesario
    if (!content.includes('<h2') || !content.includes('INMIGRACIÓN')) {
      // Si no hay título, lo añadimos
      content = content.replace(
        /<div data-parallax-layer="2"[^>]*>/,
        '<div data-parallax-layer="2" className={styles.parallax__layer_title}>\n              <h2 className={styles.parallax__title}>INMIGRACIÓN</h2>'
      );
    }
    
    fs.writeFileSync(parallaxPath, content);
    console.log('✅ Restaurado contenido de Guillermo y ajustado espacios en blanco');
    return true;
  } catch (error) {
    console.error('❌ Error actualizando el componente:', error.message);
    return false;
  }
};

// Actualizar los estilos CSS
const updateStyles = () => {
  const cssPath = path.join(process.cwd(), 'styles', 'parallax.module.css');
  
  if (!fs.existsSync(cssPath)) {
    console.error('❌ No se encontró el archivo parallax.module.css');
    return false;
  }
  
  try {
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // Mejorar contenedor principal para eliminar espacios en blanco
    cssContent = cssContent.replace(
      '.parallax {',
      '.parallax {\n  width: 100vw;\n  height: 100vh;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;'
    );
    
    // Asegurar que el container del abogado tiene alto z-index
    if (cssContent.includes('.parallax__lawyer_container {')) {
      cssContent = cssContent.replace(
        '.parallax__lawyer_container {',
        '.parallax__lawyer_container {\n  z-index: 20;\n  position: absolute;'
      );
    } else {
      cssContent += `
/* Contenedor para la imagen del abogado */
.parallax__lawyer_container {
  z-index: 20 !important;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
`;
    }
    
    // Asegurar que la imagen del abogado tiene alto z-index
    if (cssContent.includes('.parallax__lawyer {')) {
      cssContent = cssContent.replace(
        '.parallax__lawyer {',
        '.parallax__lawyer {\n  z-index: 20 !important;'
      );
    } else {
      cssContent += `
/* Imagen del abogado */
.parallax__lawyer {
  z-index: 20 !important;
  height: auto !important;
  width: auto !important;
  max-height: 85% !important;
  max-width: 70% !important;
  object-fit: contain !important;
  position: relative !important;
}
`;
    }
    
    fs.writeFileSync(cssPath, cssContent);
    console.log('✅ Actualizados estilos CSS');
    return true;
  } catch (error) {
    console.error('❌ Error actualizando los estilos:', error.message);
    return false;
  }
};

// Actualizar config de Next.js para manejar imágenes grandes
const updateNextConfig = () => {
  const configPath = path.join(process.cwd(), 'next.config.js');
  
  if (!fs.existsSync(configPath)) {
    console.error('❌ No se encontró el archivo next.config.js');
    return false;
  }
  
  try {
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Añadir configuración para imágenes más grandes
    if (!configContent.includes('images: {')) {
      configContent = configContent.replace(
        'const nextConfig = {',
        `const nextConfig = {
  images: {
    domains: ['i.postimg.cc'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },`
      );
    } else if (!configContent.includes('deviceSizes:')) {
      configContent = configContent.replace(
        'images: {',
        `images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],`
      );
    }
    
    fs.writeFileSync(configPath, configContent);
    console.log('✅ Actualizado next.config.js para manejar imágenes grandes');
    return true;
  } catch (error) {
    console.error('❌ Error actualizando next.config.js:', error.message);
    return false;
  }
};

// Ejecutar todas las correcciones
const main = () => {
  console.log('🚀 Iniciando correcciones...');
  
  const componentUpdated = updateParallaxComponent();
  const stylesUpdated = updateStyles();
  const configUpdated = updateNextConfig();
  
  if (componentUpdated && stylesUpdated && configUpdated) {
    console.log('\n✨ Todas las correcciones completadas con éxito');
  } else {
    console.log('\n⚠️ Algunas correcciones no se completaron correctamente');
  }
  
  console.log('\nReconstruye tu aplicación para ver los cambios:');
  console.log('npm run build');
  console.log('npm run start');
};

main();
