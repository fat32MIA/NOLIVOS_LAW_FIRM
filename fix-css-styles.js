const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Rutas principales
const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const LIB_DIR = path.join(ROOT_DIR, 'lib');

// Asegurarse de que los directorios existen
function ensureDirectories() {
  const dirs = [
    LIB_DIR,
    path.join(COMPONENTS_DIR, 'theme'),
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Creado directorio: ${path.relative(ROOT_DIR, dir)}`);
    }
  }
}

// Corregir globals.css
function fixGlobalsCss() {
  const globalsCssPath = path.join(APP_DIR, 'globals.css');
  const globalsCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
 
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
 
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
 
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
 
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
 
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
 
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
 
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
 
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

  fs.writeFileSync(globalsCssPath, globalsCssContent);
  console.log('✅ Corregido globals.css');
}

// Corregir tailwind.config.js
function fixTailwindConfig() {
  const tailwindConfigPath = path.join(ROOT_DIR, 'tailwind.config.js');
  const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`;

  fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);
  console.log('✅ Corregido tailwind.config.js');
}

// Crear o actualizar utils.ts
function fixUtils() {
  const utilsPath = path.join(LIB_DIR, 'utils.ts');
  const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

  fs.writeFileSync(utilsPath, utilsContent);
  console.log('✅ Creado/Actualizado utils.ts');
}

// Crear componentes de tema
function createThemeComponents() {
  // ThemeProvider
  const themeProviderPath = path.join(COMPONENTS_DIR, 'theme', 'theme-provider.tsx');
  const themeProviderContent = `"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}`;

  fs.writeFileSync(themeProviderPath, themeProviderContent);
  console.log('✅ Creado theme-provider.tsx');

  // ThemeSwitcher
  const themeSwitcherPath = path.join(COMPONENTS_DIR, 'theme', 'theme-switcher.tsx');
  const themeSwitcherContent = `"use client"

import * as React from "react"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeSwitcher() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`;

  fs.writeFileSync(themeSwitcherPath, themeSwitcherContent);
  console.log('✅ Creado theme-switcher.tsx');
}

// Actualizar layout.tsx para incluir ThemeProvider
function updateLayout() {
  const layoutPath = path.join(APP_DIR, 'layout.tsx');
  const layoutContent = `import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nolivos Law Firm',
  description: 'Servicios legales de inmigración',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className + " min-h-screen flex flex-col"} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`;

  fs.writeFileSync(layoutPath, layoutContent);
  console.log('✅ Actualizado layout.tsx para incluir ThemeProvider');
}

// Actualizar Navbar para incluir ThemeSwitcher
function updateNavbar() {
  const navbarPath = path.join(COMPONENTS_DIR, 'navbar.tsx');
  
  if (fs.existsSync(navbarPath)) {
    let navbarContent = fs.readFileSync(navbarPath, 'utf8');
    
    // Añadir importación del ThemeSwitcher
    if (!navbarContent.includes('ThemeSwitcher')) {
      navbarContent = navbarContent.replace(
        "import { Menu, X, User, LogOut, Settings, ChevronDown } from 'lucide-react';",
        "import { Menu, X, User, LogOut, Settings, ChevronDown } from 'lucide-react';\nimport { ThemeSwitcher } from '@/components/theme/theme-switcher';"
      );
    }
    
    // Añadir el ThemeSwitcher al navbar
    if (!navbarContent.includes('<ThemeSwitcher />')) {
      navbarContent = navbarContent.replace(
        '<div className="hidden sm:ml-6 sm:flex sm:items-center">',
        '<div className="hidden sm:ml-6 sm:flex sm:items-center gap-2">\n            <ThemeSwitcher />'
      );
    }
    
    fs.writeFileSync(navbarPath, navbarContent);
    console.log('✅ Actualizado navbar.tsx para incluir ThemeSwitcher');
  }
}

// Crear o actualizar Badge component
function createBadgeComponent() {
  const badgePath = path.join(COMPONENTS_DIR, 'ui', 'badge.tsx');
  const badgeContent = `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-green-500 text-white hover:bg-green-500/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }`;

  fs.writeFileSync(badgePath, badgeContent);
  console.log('✅ Creado/Actualizado badge.tsx');
}

// Actualizar package.json para añadir dependencias necesarias
function updatePackageJson() {
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Añadir dependencias necesarias
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies["next-themes"] = "^0.2.1";
    packageJson.dependencies["clsx"] = "^2.0.0";
    packageJson.dependencies["tailwind-merge"] = "^2.0.0";
    packageJson.dependencies["class-variance-authority"] = "^0.7.0";
    packageJson.dependencies["tailwindcss-animate"] = "^1.0.7";
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Actualizado package.json con dependencias necesarias');
  }
}

// Función para instalar dependencias
function installDependencies() {
  try {
    console.log('📦 Instalando dependencias...');
    execSync('npm install', { cwd: ROOT_DIR, stdio: 'inherit' });
    console.log('✅ Dependencias instaladas correctamente');
  } catch (error) {
    console.error('❌ Error al instalar dependencias:', error);
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando corrección de estilos CSS...');
  
  // 1. Asegurarse de que los directorios existen
  ensureDirectories();
  
  // 2. Corregir globals.css
  fixGlobalsCss();
  
  // 3. Corregir tailwind.config.js
  fixTailwindConfig();
  
  // 4. Crear o actualizar utils.ts
  fixUtils();
  
  // 5. Crear componentes de tema
  createThemeComponents();
  
  // 6. Actualizar layout.tsx
  updateLayout();
  
  // 7. Actualizar Navbar
  updateNavbar();
  
  // 8. Crear o actualizar Badge component
  createBadgeComponent();
  
  // 9. Actualizar package.json
  updatePackageJson();
  
  // 10. Instalar dependencias
  installDependencies();
  
  console.log('');
  console.log('✅ Estilos CSS corregidos correctamente');
  console.log('');
  console.log('📋 Resumen de acciones:');
  console.log('1. Se ha corregido globals.css con las variables CSS necesarias');
  console.log('2. Se ha corregido tailwind.config.js para usar correctamente los temas');
  console.log('3. Se ha creado/actualizado utils.ts con la función cn()');
  console.log('4. Se han creado componentes de tema (ThemeProvider, ThemeSwitcher)');
  console.log('5. Se ha actualizado layout.tsx para incluir ThemeProvider');
  console.log('6. Se ha actualizado navbar.tsx para incluir ThemeSwitcher');
  console.log('7. Se ha creado/actualizado el componente Badge');
  console.log('8. Se ha actualizado package.json con las dependencias necesarias');
  console.log('9. Se han instalado las dependencias');
  console.log('');
  console.log('🏁 Ahora ejecuta:');
  console.log('   npm run dev');
  console.log('');
  console.log('Nota: Es posible que necesites reiniciar el servidor de desarrollo para que los cambios surtan efecto.');
}

main().catch(err => {
  console.error('❌ Error en el script:', err);
  process.exit(1);
});
