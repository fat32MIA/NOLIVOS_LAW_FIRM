const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Rutas principales
const ROOT_DIR = process.cwd();
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const UI_DIR = path.join(COMPONENTS_DIR, 'ui');
const LIB_DIR = path.join(ROOT_DIR, 'lib');

// Asegurarse de que los directorios existen
function ensureDirectories() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
  }
  
  if (!fs.existsSync(UI_DIR)) {
    fs.mkdirSync(UI_DIR, { recursive: true });
  }
  
  if (!fs.existsSync(LIB_DIR)) {
    fs.mkdirSync(LIB_DIR, { recursive: true });
  }
}

// Crear el archivo utils.ts
function createUtilsFile() {
  const utilsPath = path.join(LIB_DIR, 'utils.ts');
  const utilsContent = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
  
  fs.writeFileSync(utilsPath, utilsContent);
  console.log('✅ Creado lib/utils.ts');
}

// Crear componentes UI
function createUIComponents() {
  // Componente Button
  const buttonPath = path.join(UI_DIR, 'button.tsx');
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
  
  fs.writeFileSync(buttonPath, buttonContent);
  console.log('✅ Creado components/ui/button.tsx');
  
  // Componente Card
  const cardPath = path.join(UI_DIR, 'card.tsx');
  const cardContent = `import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
`;
  
  fs.writeFileSync(cardPath, cardContent);
  console.log('✅ Creado components/ui/card.tsx');
  
  // Componente Input
  const inputPath = path.join(UI_DIR, 'input.tsx');
  const inputContent = `import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
`;
  
  fs.writeFileSync(inputPath, inputContent);
  console.log('✅ Creado components/ui/input.tsx');
  
  // Componente Label
  const labelPath = path.join(UI_DIR, 'label.tsx');
  const labelContent = `"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
`;
  
  fs.writeFileSync(labelPath, labelContent);
  console.log('✅ Creado components/ui/label.tsx');
  
  // Componente Textarea
  const textareaPath = path.join(UI_DIR, 'textarea.tsx');
  const textareaContent = `import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
`;
  
  fs.writeFileSync(textareaPath, textareaContent);
  console.log('✅ Creado components/ui/textarea.tsx');
}

// Crear componente ThemeProvider
function createThemeProvider() {
  const themeProviderPath = path.join(COMPONENTS_DIR, 'theme-provider.tsx');
  const themeProviderContent = `"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
`;
  
  fs.writeFileSync(themeProviderPath, themeProviderContent);
  console.log('✅ Creado components/theme-provider.tsx');
}

// Actualizar o crear globals.css
function updateGlobalsCss() {
  const globalsCssPath = path.join(ROOT_DIR, 'app', 'globals.css');
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
 
    --primary: 222.2 47.4% 11.2%;
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
    --ring: 222.2 84% 4.9%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
 
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
 
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
 
    --primary: 210 40% 98%;
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
    --ring: 212.7 26.8% 83.9%;
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
  
  fs.writeFileSync(globalsCssPath, globalsCssContent);
  console.log('✅ Actualizado app/globals.css');
}

// Actualizar tailwind.config.js
function updateTailwindConfig() {
  const tailwindConfigPath = path.join(ROOT_DIR, 'tailwind.config.js');
  const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
}
`;
  
  fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);
  console.log('✅ Actualizado tailwind.config.js');
}

// Actualizar package.json para añadir dependencias necesarias
function updatePackageJson() {
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Añadir dependencias necesarias
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies["@radix-ui/react-label"] = "^2.0.2";
    packageJson.dependencies["@radix-ui/react-slot"] = "^1.0.2";
    packageJson.dependencies["class-variance-authority"] = "^0.7.0";
    packageJson.dependencies["clsx"] = "^2.0.0";
    packageJson.dependencies["next-themes"] = "^0.2.1";
    packageJson.dependencies["tailwind-merge"] = "^2.0.0";
    packageJson.dependencies["tailwindcss-animate"] = "^1.0.7";
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Actualizado package.json con dependencias necesarias');
  }
}

// Instalar dependencias
function installDependencies() {
  try {
    console.log('📦 Instalando dependencias...');
    execSync('npm install', { cwd: ROOT_DIR, stdio: 'inherit' });
    console.log('✅ Dependencias instaladas correctamente');
  } catch (error) {
    console.error('❌ Error al instalar dependencias:', error);
  }
}

// Simplificar la página principal
function simplifyHomePage() {
  const homePagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
  const homePageContent = `'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold text-center mb-8">Nolivos Law Firm</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Admin</CardTitle>
              <CardDescription>Panel de administración</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Acceso a todas las funciones administrativas.</p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/dashboard" className="w-full">
                <Button className="w-full">Acceder</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Abogado</CardTitle>
              <CardDescription>Panel de abogado</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Gestión de casos y clientes.</p>
            </CardContent>
            <CardFooter>
              <Link href="/lawyer/dashboard" className="w-full">
                <Button className="w-full">Acceder</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cliente</CardTitle>
              <CardDescription>Portal de cliente</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Seguimiento de casos y documentos.</p>
            </CardContent>
            <CardFooter>
              <Link href="/client/dashboard" className="w-full">
                <Button className="w-full">Acceder</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
`;
  
  fs.writeFileSync(homePagePath, homePageContent);
  console.log('✅ Simplificada la página principal');
}

// Función principal
async function main() {
  console.log('🚀 Iniciando instalación de componentes UI...');
  
  // 1. Asegurarse de que los directorios existen
  ensureDirectories();
  
  // 2. Crear el archivo utils.ts
  createUtilsFile();
  
  // 3. Crear componentes UI
  createUIComponents();
  
  // 4. Crear componente ThemeProvider
  createThemeProvider();
  
  // 5. Actualizar globals.css
  updateGlobalsCss();
  
  // 6. Actualizar tailwind.config.js
  updateTailwindConfig();
  
  // 7. Actualizar package.json
  updatePackageJson();
  
  // 8. Simplificar la página principal
  simplifyHomePage();
  
  // 9. Instalar dependencias
  installDependencies();
  
  console.log('');
  console.log('✅ Componentes UI instalados correctamente');
  console.log('');
  console.log('📋 Resumen de acciones:');
  console.log('1. Se han creado los componentes UI básicos (button, card, input, label, textarea)');
  console.log('2. Se ha creado el componente ThemeProvider');
  console.log('3. Se ha actualizado globals.css con las variables de Tailwind');
  console.log('4. Se ha actualizado tailwind.config.js');
  console.log('5. Se ha actualizado package.json con las dependencias necesarias');
  console.log('6. Se ha simplificado la página principal');
  console.log('7. Se han instalado las dependencias');
  console.log('');
  console.log('🏁 Ahora ejecuta:');
  console.log('   npm run dev');
}

main().catch(err => {
  console.error('❌ Error en el script:', err);
  process.exit(1);
});
