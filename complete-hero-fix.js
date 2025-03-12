// complete-hero-fix.js
const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🚀 Creando componente Hero definitivo...');

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

// Descargar todas las imágenes necesarias
const downloadAllImages = async () => {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  const images = [
    {
      url: 'https://i.postimg.cc/G3Yz1hBZ/Adobe-Express-file.png',
      dest: path.join(imagesDir, 'abogado.png')
    },
    {
      url: 'https://i.postimg.cc/7hw5dyQT/capas-fondo-y-luz.png',
      dest: path.join(imagesDir, 'light-effect.png')
    },
    {
      url: 'https://i.postimg.cc/Nfd8wvPR/Adobe-Express-file.png',
      dest: path.join(imagesDir, 'background.png')
    }
  ];
  
  // Crear imágenes para la animación de nubes
  const cloudImages = [];
  for (let i = 1; i <= 3; i++) {
    cloudImages.push({
      url: `https://i.postimg.cc/GpSKGjnT/cloud-${i}.png`,
      dest: path.join(imagesDir, `cloud-${i}.png`)
    });
  }
  
  try {
    console.log('📥 Descargando imágenes...');
    
    // Descargar imágenes principales
    for (const img of images) {
      if (!fs.existsSync(img.dest)) {
        await downloadImage(img.url, img.dest);
      } else {
        console.log(`✅ Ya existe: ${img.dest}`);
      }
    }
    
    // Crear imágenes de nubes si no existen
    for (const cloudImg of cloudImages) {
      if (!fs.existsSync(cloudImg.dest)) {
        try {
          await downloadImage(cloudImg.url, cloudImg.dest);
        } catch (error) {
          // Si falla la descarga, crear una nube simple
          console.log(`⚠️ No se pudo descargar la nube, creando imagen básica...`);
          createBasicCloudImage(cloudImg.dest);
        }
      } else {
        console.log(`✅ Ya existe: ${cloudImg.dest}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error descargando imágenes:', error.message);
    return false;
  }
};

// Crear una imagen de nube básica si la descarga falla
const createBasicCloudImage = (destination) => {
  const svgContent = `<svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
    <filter id="filter" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" />
    </filter>
    <g filter="url(#filter)">
      <ellipse cx="80" cy="60" rx="50" ry="30" fill="white" opacity="0.8" />
      <ellipse cx="120" cy="60" rx="60" ry="40" fill="white" opacity="0.8" />
      <ellipse cx="80" cy="40" rx="30" ry="20" fill="white" opacity="0.8" />
    </g>
  </svg>`;
  
  fs.writeFileSync(destination, svgContent);
  console.log(`✅ Creada imagen de nube básica: ${destination}`);
};

// Crear el nuevo componente Hero con todas las características
const createHeroComponent = () => {
  const componentDir = path.join(process.cwd(), 'components');
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }
  
  const componentPath = path.join(componentDir, 'Hero.jsx');
  const componentContent = `// components/Hero.jsx
"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/hero.module.css';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const [cloudPositions, setCloudPositions] = useState([
    { x: -10, y: 20 },
    { x: 60, y: 10 },
    { x: 30, y: 40 }
  ]);
  
  // Effect for parallax scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Effect for cloud animation
  useEffect(() => {
    const animateClouds = () => {
      setCloudPositions(prev => prev.map((cloud, index) => ({
        x: (cloud.x + 0.02) % 120 - 20,  // Move clouds horizontally and loop
        y: cloud.y
      })));
    };
    
    const intervalId = setInterval(animateClouds, 50);
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className={styles.heroContainer} ref={heroRef}>
      {/* Animated sky background */}
      <div className={styles.skyBackground}>
        <div className={styles.clouds}>
          {[1, 2, 3].map((num, index) => (
            <div 
              key={num}
              className={styles.cloud}
              style={{
                backgroundImage: \`url(/images/cloud-\${num}.png)\`,
                left: \`\${cloudPositions[index].x}%\`,
                top: \`\${cloudPositions[index].y}%\`,
                transform: \`translateY(\${scrollY * 0.1}px)\`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main background image */}
      <div 
        className={styles.backgroundImage}
        style={{
          transform: \`translateY(\${scrollY * 0.5}px)\`
        }}
      >
        <Image
          src="/images/background.png"
          alt="Justice symbols"
          fill
          quality={100}
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
          priority
        />
      </div>
      
      {/* Light effect overlay */}
      <div 
        className={styles.lightEffect}
        style={{
          transform: \`translateY(\${scrollY * 0.3}px)\`
        }}
      >
        <Image
          src="/images/light-effect.png"
          alt="Light effect"
          fill
          quality={90}
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      {/* INMIGRACIÓN text */}
      <h1 
        className={styles.mainTitle}
        style={{
          transform: \`translateY(\${scrollY * 0.2}px)\`
        }}
      >
        INMIGRACIÓN
      </h1>
      
      {/* Abogado image */}
      <div 
        className={styles.abogadoContainer}
        style={{
          transform: \`translateY(\${scrollY * 0.1}px)\`
        }}
      >
        <Image
          src="/images/abogado.png"
          alt="Abogado Guillermo Nolivos"
          width={600}
          height={800}
          quality={100}
          priority
          className={styles.abogadoImage}
        />
      </div>
      
      {/* Bottom gradient overlay for smooth transition */}
      <div className={styles.bottomGradient}></div>
    </div>
  );
}
`;

  fs.writeFileSync(componentPath, componentContent);
  console.log(`✅ Creado componente Hero: ${componentPath}`);
};

// Crear estilos CSS para el componente Hero
const createHeroStyles = () => {
  const stylesDir = path.join(process.cwd(), 'styles');
  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
  }
  
  const cssPath = path.join(stylesDir, 'hero.module.css');
  const cssContent = `/* styles/hero.module.css */
.heroContainer {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #0d2247;
}

/* Sky background with animated clouds */
.skyBackground {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #1a365d, #2a4a7a);
  z-index: 1;
}

.clouds {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.cloud {
  position: absolute;
  width: 300px;
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 2;
  opacity: 0.7;
  filter: blur(1px);
  transition: transform 0.3s ease-out;
}

/* Main background image */
.backgroundImage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}

/* Light effect overlay */
.lightEffect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  opacity: 0.6;
}

/* Main title */
.mainTitle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14vw;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.2);
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  z-index: 5;
  text-align: center;
  letter-spacing: 0.05em;
  width: 100%;
  margin: 0;
  padding: 0;
}

/* Abogado container */
.abogadoContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
}

.abogadoImage {
  height: auto;
  max-height: 90vh;
  max-width: 80%;
  object-fit: contain;
}

/* Bottom gradient for smooth transition */
.bottomGradient {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background: linear-gradient(to top, #0d2247 0%, rgba(13, 34, 71, 0) 100%);
  z-index: 7;
}

/* Animation for clouds */
@keyframes floatCloud {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100vw);
  }
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
  .mainTitle {
    font-size: 18vw;
  }
  
  .abogadoImage {
    max-height: 80vh;
  }
}
`;

  fs.writeFileSync(cssPath, cssContent);
  console.log(`✅ Creados estilos: ${cssPath}`);
};

// Actualizar la página principal para usar el componente Hero
const updateHomePage = () => {
  const homepagePath = path.join(process.cwd(), 'app', 'page.tsx');
  
  if (!fs.existsSync(homepagePath)) {
    console.log('⚠️ No se encontró la página principal app/page.tsx');
    return false;
  }
  
  try {
    let content = fs.readFileSync(homepagePath, 'utf8');
    
    // Asegurarse de que se importa el componente Hero
    if (!content.includes('import Hero from')) {
      content = content.replace(
        /import /,
        `import Hero from '@/components/Hero';\nimport `
      );
    }
    
    // Reemplazar cualquier ParallaxHero existente con el nuevo Hero
    if (content.includes('<ParallaxHero')) {
      content = content.replace(
        /<ParallaxHero[^/>]*\/>/g,
        '<Hero />'
      );
    } else {
      // Si no hay ParallaxHero, buscar el patrón de return para añadir Hero
      const returnPattern = /return\s*\(\s*(?:<>|<div)/;
      const match = content.match(returnPattern);
      
      if (match) {
        const index = match.index + match[0].length;
        content = content.slice(0, index) + '\n        <Hero />\n      ' + content.slice(index);
      }
    }
    
    fs.writeFileSync(homepagePath, content);
    console.log('✅ Actualizada página principal para usar el componente Hero');
    return true;
  } catch (error) {
    console.error('❌ Error actualizando la página principal:', error.message);
    return false;
  }
};

// Ejecutar todo el proceso
const main = async () => {
  // Paso 1: Descargar todas las imágenes
  const imagesDownloaded = await downloadAllImages();
  
  if (imagesDownloaded) {
    // Paso 2: Crear el componente Hero
    createHeroComponent();
    
    // Paso 3: Crear los estilos
    createHeroStyles();
    
    // Paso 4: Actualizar la página principal
    updateHomePage();
    
    console.log('\n✨ Creación del Hero completada exitosamente');
    console.log('\nPara ver los cambios, ejecuta:');
    console.log('npm run build');
    console.log('npm run start');
  }
};

main();
