const fs = require('fs');
const path = require('path');

// Rutas principales
const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'app');

// Simplificar globals.css al máximo
function simplifyGlobalsCss() {
  const globalsCssPath = path.join(APP_DIR, 'globals.css');
  const globalsCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;
 
:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
`;
  
  fs.writeFileSync(globalsCssPath, globalsCssContent);
  console.log('✅ Simplificado app/globals.css');
}

// Simplificar tailwind.config.js
function simplifyTailwindConfig() {
  const tailwindConfigPath = path.join(ROOT_DIR, 'tailwind.config.js');
  const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
`;
  
  fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);
  console.log('✅ Simplificado tailwind.config.js');
}

// Simplificar componentes UI
function simplifyUIComponents() {
  const componentsDir = path.join(ROOT_DIR, 'components', 'ui');
  
  if (fs.existsSync(componentsDir)) {
    // Button
    const buttonPath = path.join(componentsDir, 'button.tsx');
    const buttonContent = `import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      ghost: "hover:bg-gray-100",
      link: "text-blue-600 underline-offset-4 hover:underline"
    };
    
    const sizeStyles = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md text-sm",
      lg: "h-11 px-8 rounded-md",
      icon: "h-10 w-10"
    };
    
    const combinedClassName = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    ].filter(Boolean).join(" ");
    
    return (
      <button
        className={combinedClassName}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
`;
    
    fs.writeFileSync(buttonPath, buttonContent);
    console.log('✅ Simplificado components/ui/button.tsx');
    
    // Card
    const cardPath = path.join(componentsDir, 'card.tsx');
    const cardContent = `import * as React from "react"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={\`rounded-lg border border-gray-300 bg-white shadow-sm \${className || ''}\`}
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
    className={\`flex flex-col space-y-1.5 p-6 \${className || ''}\`}
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
    className={\`text-2xl font-semibold leading-none tracking-tight \${className || ''}\`}
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
    className={\`text-sm text-gray-500 \${className || ''}\`}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={\`p-6 pt-0 \${className || ''}\`} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={\`flex items-center p-6 pt-0 \${className || ''}\`}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
`;
    
    fs.writeFileSync(cardPath, cardContent);
    console.log('✅ Simplificado components/ui/card.tsx');
  }
}

// Simplificar utils.ts
function simplifyUtils() {
  const libDir = path.join(ROOT_DIR, 'lib');
  
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }
  
  const utilsPath = path.join(libDir, 'utils.ts');
  const utilsContent = `export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
`;
  
  fs.writeFileSync(utilsPath, utilsContent);
  console.log('✅ Simplificado lib/utils.ts');
}

// Función principal
async function main() {
  console.log('🚀 Iniciando simplificación de configuración de Tailwind...');
  
  // 1. Simplificar globals.css
  simplifyGlobalsCss();
  
  // 2. Simplificar tailwind.config.js
  simplifyTailwindConfig();
  
  // 3. Simplificar componentes UI
  simplifyUIComponents();
  
  // 4. Simplificar utils.ts
  simplifyUtils();
  
  console.log('');
  console.log('✅ Configuración de Tailwind simplificada');
  console.log('');
  console.log('📋 Resumen de acciones:');
  console.log('1. Se ha simplificado app/globals.css');
  console.log('2. Se ha simplificado tailwind.config.js');
  console.log('3. Se han simplificado los componentes UI');
  console.log('4. Se ha simplificado lib/utils.ts');
  console.log('');
  console.log('🏁 Ahora ejecuta:');
  console.log('   npm run dev');
}

main().catch(err => {
  console.error('❌ Error en el script:', err);
  process.exit(1);
});
