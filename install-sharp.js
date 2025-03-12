// fix-double-header.js
const fs = require('fs');
const path = require('path');

console.log('🔍 Buscando y corrigiendo doble encabezado...');

// Función para buscar importaciones de Navbar en archivos
function findNavbarImports(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.next')) {
        findNavbarImports(filePath, fileList);
      }
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('import Navbar') || content.includes('<Navbar')) {
        fileList.push({ path: filePath, content });
      }
    }
  });
  
  return fileList;
}

// Encuentra todos los archivos que importan Navbar
const files = findNavbarImports(process.cwd());
console.log(`🔍 Encontrados ${files.length} archivos que importan o usan Navbar`);

// Asegúrate de que solo app/layout.tsx tenga Navbar
files.forEach(file => {
  if (file.path.includes('app/layout.tsx')) {
    console.log('✅ Navbar encontrado en app/layout.tsx (correcto)');
  } else {
    console.log(`⚠️ Navbar encontrado en ${file.path} (podría causar doble encabezado)`);
    
    // Si es un archivo de página, elimina la importación y el uso de Navbar
    if (file.path.includes('page.tsx') || file.path.includes('page.jsx')) {
      let newContent = file.content;
      
      // Eliminar importación de Navbar
      newContent = newContent.replace(/import\s+Navbar\s+from\s+['"](.*?)['"];?\n?/g, '');
      
      // Eliminar uso de componente Navbar
      newContent = newContent.replace(/<Navbar\s*\/>\n?/g, '');
      newContent = newContent.replace(/<Navbar>\s*<\/Navbar>\n?/g, '');
      
      // Guardar el archivo modificado
      fs.writeFileSync(file.path, newContent);
      console.log(`✅ Eliminada referencia a Navbar en ${file.path}`);
    }
  }
});

// Asegurarse de que layout.tsx tenga Navbar correctamente configurado
const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  let layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Verificar si tiene Navbar
  if (!layoutContent.includes('import Navbar') || !layoutContent.includes('<Navbar')) {
    console.log('⚠️ app/layout.tsx no tiene Navbar, agregándolo...');
    
    // Agregar importación si no existe
    if (!layoutContent.includes('import Navbar')) {
      layoutContent = `import Navbar from '@/components/navbar';\n${layoutContent}`;
    }
    
    // Agregar componente Navbar en el cuerpo si no existe
    if (!layoutContent.includes('<Navbar')) {
      layoutContent = layoutContent.replace(
        /<body[^>]*>([\s\S]*?)<main/,
        '<body$1<Navbar />\n<main'
      );
    }
    
    fs.writeFileSync(layoutPath, layoutContent);
    console.log('✅ Agregado Navbar a app/layout.tsx');
  }
}

console.log('✨ Verificación de doble encabezado completada');
