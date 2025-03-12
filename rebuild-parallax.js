// rebuild-parallax.js
const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🛠️ Reconstruyendo completamente el componente Parallax...');

// Función para descargar imagen
const downloadImage = (url, destination) => {
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
};

// Asegurarse de que las imágenes estén descargadas
const downloadImages = async () => {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    // Descargar imagen de Guillermo
    const guillermoPath = path.join(imagesDir, 'guillermo.png');
    if (!fs.existsSync(guillermoPath)) {
      await downloadImage('https://i.postimg.cc/G3Yz1hBZ/Adobe-Express-file.png', guillermoPath);
    }
    
    console.log('✅ Imágenes verificadas/descargadas correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error descargando imágenes:', error.message);
    return false;
  }
};

// Reemplazar completamente el archivo CSS
const createParallaxCSS = () => {
  const cssPath = path.join(process.cwd(), 'styles', 'parallax.module.css');
  const cssContent = `/* styles/parallax.module.css */
.parallaxContainer {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #0d2247;
}

.heroContainer {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.backgroundImage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
  z-index: 1;
}

.title {
  position: absolute;
  z-index: 2;
  font-size: 16vw;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.2);
  text-align: center;
  letter-spacing: 0.05em;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  opacity: 0.8;
}

.abogadoContainer {
  position: absolute;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.abogadoImage {
  height: auto;
  max-height: 90vh;
  max-width: 90%;
  object-fit: contain;
  object-position: center center;
}

.contentSection {
  padding: 4rem 2rem;
  background-color: white;
  position: relative;
  z-index: 10;
}

.contentContainer {
  max-width: 1200px;
  margin: 0 auto;
}

.heroOverlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(to top, rgba(13, 34, 71, 1) 0%, rgba(13, 34, 71, 0) 100%);
  z-index: 4;
}

/* Animación para el título */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 0.8;
    transform: translateY(0);
  }
}

.title {
  animation: fadeIn 1.5s ease-out forwards;
}

/* Media queries */
@media (max-width: 768px) {
  .title {
    font-size: 20vw;
  }
}
`;

  fs.writeFileSync(cssPath, cssContent);
  console.log('✅ Creado nuevo archivo CSS para el parallax');
};

// Crear nuevo componente ParallaxHero
const createParallaxComponent = () => {
  const componentPath = path.join(process.cwd(), 'components', 'ParallaxHero.jsx');
  const componentContent = `// components/ParallaxHero.jsx
"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '@/styles/parallax.module.css';

export default function ParallaxHero() {
  const [offsetY, setOffsetY] = useState(0);

  // Efecto para el scroll parallax
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.parallaxContainer}>
      <div className={styles.heroContainer}>
        {/* Imagen de fondo */}
        <Image
          src="/images/usa-law-background.webp"
          alt="Símbolos de la justicia estadounidense"
          fill
          priority
          quality={90}
          className={styles.backgroundImage}
          style={{
            transform: \`translateY(\${offsetY * 0.5}px)\`
          }}
        />
        
        {/* Título grande */}
        <h1 
          className={styles.title}
          style={{
            transform: \`translateY(\${offsetY * 0.2}px)\`
          }}
        >
          INMIGRACIÓN
        </h1>
        
        {/* Imagen del abogado */}
        <div 
          className={styles.abogadoContainer}
          style={{
            transform: \`translateY(\${offsetY * 0.1}px)\`
          }}
        >
          <Image
            src="/images/guillermo.png"
            alt="Abogado Guillermo Nolivos"
            width={600}
            height={800}
            priority
            quality={100}
            className={styles.abogadoImage}
          />
        </div>
        
        {/* Overlay para mejor transición */}
        <div className={styles.heroOverlay}></div>
      </div>
    </div>
  );
}
`;

  fs.writeFileSync(componentPath, componentContent);
  console.log('✅ Creado nuevo componente ParallaxHero');
};

// Actualizar página principal
const updateHomePage = () => {
  const pageFilePath = path.join(process.cwd(), 'app', 'page.tsx');
  
  if (!fs.existsSync(pageFilePath)) {
    console.error('❌ No se encontró el archivo de página principal');
    return false;
  }
  
  try {
    let content = fs.readFileSync(pageFilePath, 'utf8');
    
    // Verificar que la página importe y use ParallaxHero
    if (!content.includes('import ParallaxHero')) {
      content = content.replace(
        /import /,
        `import ParallaxHero from '@/components/ParallaxHero';\nimport `
      );
    }
    
    // Asegurarse de que el componente se usa en la página
    if (!content.includes('<ParallaxHero')) {
      // Buscar el patrón de retorno
      const returnMatch = content.match(/return\s*\(/);
      
      if (returnMatch) {
        const returnIndex = returnMatch.index + returnMatch[0].length;
        
        // Insertar ParallaxHero al inicio del retorno
        const contentBefore = content.substring(0, returnIndex);
        const contentAfter = content.substring(returnIndex);
        
        content = contentBefore + `\n      <>\n        <ParallaxHero />\n` + contentAfter;
        
        // Asegurarse de cerrar el fragmento
        if (!contentAfter.includes('</>\n')) {
          content = content.replace(
            /<\/div>\s*\);/,
            '</div>\n      </>\n    );'
          );
        }
      }
    }
    
    fs.writeFileSync(pageFilePath, content);
    console.log('✅ Actualizada página principal para usar ParallaxHero');
    return true;
  } catch (error) {
    console.error('❌ Error actualizando la página principal:', error.message);
    return false;
  }
};

// Ejecutar todas las tareas
const main = async () => {
  console.log('🚀 Iniciando reconstrucción completa del componente Parallax...');
  
  // Asegurar que tenemos la imagen
  const imagesDownloaded = await downloadImages();
  
  if (imagesDownloaded) {
    // Crear el CSS
    createParallaxCSS();
    
    // Crear el componente
    createParallaxComponent();
    
    // Actualizar la página principal
    updateHomePage();
    
    console.log('\n✨ Reconstrucción completa terminada');
    console.log('\nPara ver los cambios, ejecuta:');
    console.log('npm run build');
    console.log('npm run start');
  }
};

main();
