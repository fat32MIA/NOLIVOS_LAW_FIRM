// fix-theme-provider.js
const fs = require('fs');
const path = require('path');

console.log('🔧 Mejorando implementación del tema claro/oscuro...');

// Directorio para el proveedor de tema
const themeDir = path.join(process.cwd(), 'components', 'theme');
if (!fs.existsSync(themeDir)) {
  fs.mkdirSync(themeDir, { recursive: true });
}

// Contenido mejorado para el ThemeProvider
const themeProviderContent = `// components/theme/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // Effect para manejar la hidratación
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevenir parpadeo durante la hidratación del servidor
  if (!mounted) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}`;

// Guardar el archivo del ThemeProvider
fs.writeFileSync(path.join(themeDir, 'theme-provider.tsx'), themeProviderContent);
console.log('✅ Mejorado components/theme/theme-provider.tsx');

// Verificar que el layout use correctamente el ThemeProvider
const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  let layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Verificar que importe el ThemeProvider
  if (!layoutContent.includes('import { ThemeProvider }')) {
    console.log('⚠️ layout.tsx no importa ThemeProvider, actualizando...');
    
    // Agregar importación si no existe
    if (!layoutContent.includes('theme/theme-provider')) {
      layoutContent = layoutContent.replace(
        /import/,
        `import { ThemeProvider } from '@/components/theme/theme-provider';\nimport`
      );
    }
    
    // Asegurar que envuelva todo el contenido con ThemeProvider
    if (!layoutContent.includes('<ThemeProvider')) {
      layoutContent = layoutContent.replace(
        /<body[^>]*>([\s\S]*?)<\/body>/,
        '<body$1<ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>$1</ThemeProvider></body>'
      );
    }
    
    fs.writeFileSync(layoutPath, layoutContent);
    console.log('✅ Actualizado app/layout.tsx para usar ThemeProvider');
  }
}

console.log('✨ Mejora del tema claro/oscuro completada');
