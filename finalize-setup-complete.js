// finalize-setup-complete.js
const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🔧 Finalizando configuración del sitio...');

// Función para guardar la imagen local
function saveImage(imageUrl, localPath) {
  const dir = path.dirname(localPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    https.get(imageUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Error descargando imagen: ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(localPath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✅ Imagen guardada en: ${localPath}`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(localPath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Lista de imágenes a descargar
const images = [
  {
    url: 'https://i.postimg.cc/G3Yz1hBZ/Adobe-Express-file.png',
    localPath: 'public/images/guillermo-nolivos.png',
    replacementPath: '/images/guillermo-nolivos.png'
  },
  {
    url: 'https://i.postimg.cc/7hw5dyQT/capas-fondo-y-luz.png',
    localPath: 'public/images/capas-fondo-y-luz.png',
    replacementPath: '/images/capas-fondo-y-luz.png'
  },
  {
    url: 'https://i.postimg.cc/6QV203MN/DALL-E-2025-03-11-21-10-16-A-large-transparent-PNG-background-layer-for-a-website-designed-to-go.webp',
    localPath: 'public/images/background-layer.webp',
    replacementPath: '/images/background-layer.webp'
  }
];

// Actualizar el archivo del componente ParallaxHero para usar las imágenes locales
const updateParallaxImages = async () => {
  try {
    // Guardar todas las imágenes localmente
    for (const image of images) {
      await saveImage(image.url, image.localPath);
    }

    const parallaxPath = path.join(process.cwd(), 'components', 'ParallaxHero.tsx');
    if (fs.existsSync(parallaxPath)) {
      let content = fs.readFileSync(parallaxPath, 'utf8');
      
      // Actualizar todas las rutas de imagen
      for (const image of images) {
        const urlEscaped = image.url.replace(/\//g, '\\/').replace(/\./g, '\\.');
        const regex = new RegExp(`src="${urlEscaped}"`, 'g');
        content = content.replace(regex, `src="${image.replacementPath}"`);
      }
      
      // Actualizar el texto del título si es necesario
      content = content.replace(
        /<h2 className={styles.parallax__title}>IMMIGRATION<\/h2>/,
        '<h2 className={styles.parallax__title}>INMIGRACIÓN</h2>'
      );
      
      fs.writeFileSync(parallaxPath, content);
      console.log('✅ Actualizado ParallaxHero.tsx con imágenes locales');
    } else {
      console.log('⚠️ No se encontró el archivo ParallaxHero.tsx');
    }
  } catch (error) {
    console.error('⚠️ Error al actualizar las imágenes:', error.message);
  }
};

// Actualizar el layout para incluir la fuente personalizada
const updateLayout = () => {
  const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
  if (fs.existsSync(layoutPath)) {
    let content = fs.readFileSync(layoutPath, 'utf8');
    
    // Agregar importación de la fuente
    if (!content.includes('import { neueCorp }')) {
      content = content.replace(
        /import /,
        `import { neueCorp } from '@/lib/fonts';\nimport `
      );
    }
    
    // Agregar la clase de la fuente al HTML
    if (!content.includes('neueCorp.variable')) {
      content = content.replace(
        /<html[^>]*lang="es"[^>]*>/,
        `<html lang="es" className={neueCorp.variable} suppressHydrationWarning>`
      );
    }
    
    fs.writeFileSync(layoutPath, content);
    console.log('✅ Actualizado app/layout.tsx para incluir la fuente personalizada');
  } else {
    console.log('⚠️ No se encontró el archivo layout.tsx');
  }
};

// Actualizar la página principal para incluir el componente de parallax
const updateHomePage = () => {
  const homepagePath = path.join(process.cwd(), 'app', 'page.tsx');
  if (fs.existsSync(homepagePath)) {
    let content = fs.readFileSync(homepagePath, 'utf8');
    
    // Añadir importación del componente ParallaxHero si no existe
    if (!content.includes('import ParallaxHero')) {
      content = content.replace(
        /import /,
        `import ParallaxHero from '@/components/ParallaxHero';\nimport `
      );
    }
    
    // Buscar el patrón de inicio del componente
    if (content.includes('export default function Home')) {
      // Comprobar si ya tiene el componente ParallaxHero
      if (!content.includes('<ParallaxHero')) {
        // Buscar el inicio del return
        const returnMatch = content.match(/return\s*\(/);
        if (returnMatch) {
          const insertPoint = returnMatch.index + returnMatch[0].length;
          const before = content.substring(0, insertPoint);
          const after = content.substring(insertPoint);
          
          // Insertar el componente ParallaxHero
          content = before + `\n      <>\n        <ParallaxHero />\n        ` + after.replace(/<div/, '<div');
          
          // Cerrar el fragmento al final
          content = content.replace(
            /<\/div>\s*\);?\s*}/,
            '</div>\n      </>\n    );\n}'
          );
        }
      }
      
      fs.writeFileSync(homepagePath, content);
      console.log('✅ Actualizado app/page.tsx para incluir el componente ParallaxHero');
    } else {
      console.log('⚠️ No se encuentra el componente Home en page.tsx');
      
      // Crear una página básica
      const basicHomePage = `import ParallaxHero from '@/components/ParallaxHero';

export default function Home() {
  return (
    <>
      <ParallaxHero />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Nolivos Law Services</h1>
        <p className="text-lg mb-8">
          Soluciones legales personalizadas para todos tus trámites migratorios.
          Experiencia y compromiso para guiarte en cada paso del proceso.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">Visas y Permisos</h3>
            <p>Asesoría completa para visas de trabajo, turismo, estudios y reunificación familiar.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">Asilo y Refugio</h3>
            <p>Ayudamos a personas que buscan protección por persecución en sus países de origen.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">Documentos Legales</h3>
            <p>Gestión y procesamiento eficiente de toda tu documentación migratoria.</p>
          </div>
        </div>
      </div>
    </>
  );
}`;
      
      fs.writeFileSync(homepagePath, basicHomePage);
      console.log('✅ Creado un nuevo app/page.tsx con ParallaxHero');
    }
  } else {
    console.log('⚠️ No se encontró el archivo page.tsx');
  }
};

// Crear página "Acerca de nosotros" con información del abogado
const createAboutPage = () => {
  const aboutDir = path.join(process.cwd(), 'app', 'about');
  if (!fs.existsSync(aboutDir)) {
    fs.mkdirSync(aboutDir, { recursive: true });
  }
  
  const aboutPageContent = `import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Acerca de Nosotros</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <Image 
            src="/images/guillermo-nolivos.png" 
            alt="Guillermo Nolivos - Abogado de Inmigración"
            width={500}
            height={600}
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-4">Guillermo Nolivos</h2>
          <h3 className="text-xl text-blue-600 dark:text-blue-400 mb-6">Abogado Especialista en Inmigración</h3>
          
          <p className="mb-4">
            Con más de 15 años de experiencia en derecho migratorio, Guillermo Nolivos ha ayudado a 
            cientos de clientes a navegar con éxito el complejo sistema de inmigración.
          </p>
          
          <p className="mb-4">
            Graduado con honores de la Facultad de Derecho de la Universidad de Columbia, 
            Guillermo se especializa en casos de asilo político, visas de trabajo y reunificación familiar.
          </p>
          
          <p className="mb-4">
            Su compromiso con la justicia y su enfoque personalizado en cada caso han 
            hecho de Nolivos Law una firma reconocida por su excelencia y resultados.
          </p>
          
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-2">Áreas de Especialización:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Visas de trabajo (H-1B, L-1, O-1)</li>
              <li>Asilo político y refugio</li>
              <li>Reunificación familiar</li>
              <li>Naturalización y ciudadanía</li>
              <li>Defensa contra deportación</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync(path.join(aboutDir, 'page.tsx'), aboutPageContent);
  console.log('✅ Creada página "Acerca de nosotros" con información del abogado');
};

// Actualizar el componente de navegación para incluir la página About
const updateNavbar = () => {
  const navbarPath = path.join(process.cwd(), 'components', 'navbar.tsx');
  if (fs.existsSync(navbarPath)) {
    let content = fs.readFileSync(navbarPath, 'utf8');
    
    // Agregar enlace a About en navLinks si no existe
    if (!content.includes("href: \"/about\"")) {
      // Buscar donde se definen los enlaces de navegación
      const navLinksMatch = content.match(/const navLinks = \[[\s\S]*?\];/);
      if (navLinksMatch) {
        const navLinks = navLinksMatch[0];
        const homeLink = navLinks.match(/{\s*href: "\/".+?\},/);
        
        if (homeLink) {
          const updatedNavLinks = navLinks.replace(
            homeLink[0],
            `${homeLink[0]}
    { href: "/about", label: "Nosotros", icon: "Users" },`
          );
          
          content = content.replace(navLinksMatch[0], updatedNavLinks);
          fs.writeFileSync(navbarPath, content);
          console.log('✅ Actualizado navbar.tsx para incluir enlace a "Acerca de nosotros"');
        }
      }
    }
  } else {
    console.log('⚠️ No se encontró el archivo navbar.tsx');
  }
};

// Ejecutar todas las funciones
const runAll = async () => {
  try {
    await updateParallaxImages();
    updateLayout();
    updateHomePage();
    createAboutPage();
    updateNavbar();
    
    console.log('\n✨ Configuración finalizada con éxito');
    console.log('\nPuedes compilar y ejecutar la aplicación con:');
    console.log('npm run build');
    console.log('npm run start');
  } catch (error) {
    console.error('❌ Error durante la configuración:', error);
  }
};

runAll();
