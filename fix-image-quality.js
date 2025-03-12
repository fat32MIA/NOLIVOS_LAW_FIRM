// fix-image-quality.js
const fs = require('fs');
const path = require('path');

console.log('🔧 Mejorando la calidad y tamaño de la imagen del abogado...');

// Ajustar el componente ParallaxHero
const parallaxPath = path.join(process.cwd(), 'components', 'ParallaxHero.tsx');
if (fs.existsSync(parallaxPath)) {
  let content = fs.readFileSync(parallaxPath, 'utf8');
  
  // Buscar la sección de la imagen de Guillermo
  const abogadoImgRegex = /<img[^>]*data-parallax-layer="4"[^>]*>/;
  const abogadoImgMatch = content.match(abogadoImgRegex);
  
  if (abogadoImgMatch) {
    // Actualizar la etiqueta de imagen con mejores estilos
    const originalImgTag = abogadoImgMatch[0];
    const updatedImgTag = originalImgTag.replace(
      'className={`${styles.parallax__layer_img} ${styles.parallax__lawyer}`}',
      'className={`${styles.parallax__layer_img} ${styles.parallax__lawyer}`} style={{objectPosition: "center center", height: "100%", width: "auto", maxWidth: "80%", left: "50%", transform: "translateX(-50%)", objectFit: "contain"}}'
    );
    
    content = content.replace(originalImgTag, updatedImgTag);
    fs.writeFileSync(parallaxPath, content);
    console.log('✅ Ajustados estilos de la imagen en ParallaxHero.tsx');
  }

  // Mejorar la calidad de la imagen convirtiéndola a Next.js Image component
  if (content.includes('data-parallax-layer="4"') && !content.includes('Image from "next/image"')) {
    // Añadir importación de Image si no existe
    if (!content.includes('import Image from "next/image"')) {
      content = content.replace(
        "import Script from 'next/script';",
        "import Script from 'next/script';\nimport Image from 'next/image';"
      );
    }

    // Reemplazar la etiqueta img con el componente Image de Next.js
    content = content.replace(
      /<img\s+src="\/images\/guillermo-nolivos\.png"\s+loading="eager"\s+width="100%"\s+data-parallax-layer="4"\s+alt="Abogado"\s+className={`[^`]*`}[^>]*>/,
      `<div data-parallax-layer="4" className={styles.parallax__lawyer_container}>
              <Image 
                src="/images/guillermo-nolivos.png"
                alt="Abogado Guillermo Nolivos"
                width={600}
                height={800}
                quality={100}
                priority
                className={styles.parallax__lawyer}
              />
            </div>`
    );
    
    fs.writeFileSync(parallaxPath, content);
    console.log('✅ Mejorada calidad de imagen usando Next.js Image component');
  }
}

// Actualizar estilos CSS
const parallaxCssPath = path.join(process.cwd(), 'styles', 'parallax.module.css');
if (fs.existsSync(parallaxCssPath)) {
  let cssContent = fs.readFileSync(parallaxCssPath, 'utf8');
  
  // Añadir nuevos estilos para el contenedor y la imagen
  if (!cssContent.includes('parallax__lawyer_container')) {
    cssContent += `
/* Contenedor para la imagen del abogado */
.parallax__lawyer_container {
  z-index: 5 !important;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
}

/* Ajustes para la imagen del abogado */
.parallax__lawyer {
  height: auto !important;
  width: auto !important;
  max-height: 90% !important;
  max-width: 70% !important;
  object-fit: contain !important;
  position: relative !important;
  margin: 0 auto;
}

/* Ajuste para el fondo */
.parallax__layer_img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
`;
    fs.writeFileSync(parallaxCssPath, cssContent);
    console.log('✅ Añadidos nuevos estilos CSS para mejorar la imagen');
  }
}

console.log('\n✨ Ajustes de imagen completados');
console.log('\nReconstruye tu aplicación con:');
console.log('npm run build');
console.log('npm run start');
