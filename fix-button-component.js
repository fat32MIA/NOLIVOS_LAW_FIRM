const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Rutas principales
const ROOT_DIR = process.cwd();
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');

console.log(`Directorio raíz: ${ROOT_DIR}`);

// Instalar dependencias necesarias
function instalarDependencias() {
  try {
    console.log('📦 Instalando @radix-ui/react-slot...');
    execSync('npm install @radix-ui/react-slot', { stdio: 'inherit' });
    console.log('✅ Dependencias instaladas correctamente');
  } catch (error) {
    console.error('❌ Error al instalar dependencias:', error);
  }
}

// Corregir componente Button
function corregirButton() {
  const uiDir = path.join(COMPONENTS_DIR, 'ui');
  if (!fs.existsSync(uiDir)) {
    fs.mkdirSync(uiDir, { recursive: true });
    console.log(`✅ Creado directorio: ${uiDir}`);
  }
  
  const buttonPath = path.join(uiDir, 'button.tsx');
  const buttonContent = `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
`;

  try {
    fs.writeFileSync(buttonPath, buttonContent);
    console.log(`✅ Corregido componente Button: ${buttonPath}`);
  } catch (error) {
    console.error(`❌ Error al corregir componente Button:`, error);
  }
}

// Corregir página principal para evitar usar asChild si es necesario
function corregirPaginaPrincipal() {
  const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
  
  if (fs.existsSync(pagePath)) {
    try {
      let content = fs.readFileSync(pagePath, 'utf8');
      
      // Reemplazar Button con asChild por Link directamente
      content = content.replace(/<Button variant="outline" asChild>([\s\S]*?)<\/Button>/g, (match, linkContent) => {
        // Extraer la URL del Link
        const hrefMatch = linkContent.match(/href="([^"]+)"/);
        const href = hrefMatch ? hrefMatch[1] : '#';
        
        // Extraer el contenido del Link
        const textMatch = linkContent.match(/<Link[^>]*>([\s\S]*?)<\/Link>/);
        const text = textMatch ? textMatch[1].trim() : 'Link';
        
        return `<Link href="${href}" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">${text}</Link>`;
      });
      
      fs.writeFileSync(pagePath, content);
      console.log(`✅ Corregida página principal: ${pagePath}`);
    } catch (error) {
      console.error(`❌ Error al corregir página principal:`, error);
    }
  }
}

// Crear o actualizar utils.ts si no existe
function crearUtils() {
  const libDir = path.join(ROOT_DIR, 'lib');
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
    console.log(`✅ Creado directorio: ${libDir}`);
  }
  
  const utilsPath = path.join(libDir, 'utils.ts');
  const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

  try {
    fs.writeFileSync(utilsPath, utilsContent);
    console.log(`✅ Creado/actualizado utils.ts: ${utilsPath}`);
  } catch (error) {
    console.error(`❌ Error al crear/actualizar utils.ts:`, error);
  }
}

// Instalar dependencias adicionales necesarias
function instalarDependenciasAdicionales() {
  try {
    console.log('📦 Instalando dependencias adicionales...');
    execSync('npm install clsx tailwind-merge class-variance-authority', { stdio: 'inherit' });
    console.log('✅ Dependencias adicionales instaladas correctamente');
  } catch (error) {
    console.error('❌ Error al instalar dependencias adicionales:', error);
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando corrección del componente Button...');
  
  // 1. Instalar dependencias necesarias
  instalarDependencias();
  
  // 2. Instalar dependencias adicionales
  instalarDependenciasAdicionales();
  
  // 3. Crear utils.ts si no existe
  crearUtils();
  
  // 4. Corregir componente Button
  corregirButton();
  
  // 5. Corregir página principal
  corregirPaginaPrincipal();
  
  // 6. Limpiar caché de Next.js
  const nextCacheDir = path.join(ROOT_DIR, '.next');
  if (fs.existsSync(nextCacheDir)) {
    try {
      fs.rmSync(nextCacheDir, { recursive: true, force: true });
      console.log(`✅ Eliminada caché de Next.js: ${nextCacheDir}`);
    } catch (error) {
      console.error(`❌ Error al eliminar caché de Next.js: ${error.message}`);
    }
  }
  
  console.log('');
  console.log('✅ Corrección del componente Button completada');
  console.log('');
  console.log('Ahora ejecuta:');
  console.log('   npm run dev');
}

// Ejecutar la función principal
main().catch(err => {
  console.error('❌ Error en el proceso:', err);
  process.exit(1);
});
