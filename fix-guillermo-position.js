// fix-guillermo-position.js
const fs = require('fs');
const path = require('path');

console.log('🔧 Ajustando posición y tamaño de la imagen de Guillermo...');

// Ajustar el componente ParallaxHero
const parallaxPath = path.join(process.cwd(), 'components', 'ParallaxHero.tsx');
if (fs.existsSync(parallaxPath)) {
  let content = fs.readFileSync(parallaxPath, 'utf8');
  
  // Buscar la sección de la imagen de Guillermo
  const abogadoImgRegex = /<img[^>]*data-parallax-layer="4"[^>]*>/;
  const abogadoImgMatch = content.match(abogadoImgRegex);
  
  if (abogadoImgMatch) {
    // Agregar estilos adicionales para ajustar la posición
    const originalImgTag = abogadoImgMatch[0];
    const updatedImgTag = originalImgTag.replace(
      'className={`${styles.parallax__layer_img} ${styles.parallax__lawyer}`}',
      'className={`${styles.parallax__layer_img} ${styles.parallax__lawyer}`} style={{objectPosition: "center 20%", height: "120%", top: "-10%"}}'
    );
    
    content = content.replace(originalImgTag, updatedImgTag);
    fs.writeFileSync(parallaxPath, content);
    console.log('✅ Ajustado posicionamiento de la imagen en ParallaxHero.tsx');
  }
}

// Actualizar estilos de parallax si es necesario
const parallaxCssPath = path.join(process.cwd(), 'styles', 'parallax.module.css');
if (fs.existsSync(parallaxCssPath)) {
  let cssContent = fs.readFileSync(parallaxCssPath, 'utf8');
  
  // Verificar si ya existe la clase para ajustar el abogado
  if (!cssContent.includes('parallax__lawyer_adjusted')) {
    // Añadir clase personalizada para la imagen del abogado
    cssContent += `
/* Clase mejorada para la imagen del abogado */
.parallax__lawyer_adjusted {
  z-index: 5 !important;
  position: relative;
  object-fit: cover;
  object-position: center 15%;
  transform-origin: center center;
  max-height: 120%;
  top: -10%;
}
`;
    fs.writeFileSync(parallaxCssPath, cssContent);
    console.log('✅ Añadidos estilos adicionales para la imagen del abogado');
  }
}

console.log('\n✨ Ajustes completados. Reconstruye la aplicación para ver los cambios:');
console.log('npm run build');
console.log('npm run start');
