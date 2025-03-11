const fs = require('fs');
const path = require('path');

// Rutas principales
const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'app');

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
    @apply border-solid border-gray-200;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
  
  fs.writeFileSync(globalsCssPath, globalsCssContent);
  console.log('✅ Corregido app/globals.css');
}

// Corregir tailwind.config.js
function fixTailwindConfig() {
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
  console.log('✅ Corregido tailwind.config.js');
}

// Corregir componentes UI que usan border-border
function fixUIComponents() {
  const componentsDir = path.join(ROOT_DIR, 'components', 'ui');
  
  if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir);
    
    for (const file of files) {
      const filePath = path.join(componentsDir, file);
      
      if (fs.statSync(filePath).isFile() && file.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Reemplazar border-border por border-gray-200
        content = content.replace(/border-border/g, 'border-gray-200');
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ Corregido ${path.join('components', 'ui', file)}`);
      }
    }
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando corrección de configuración de Tailwind...');
  
  // 1. Corregir globals.css
  fixGlobalsCss();
  
  // 2. Corregir tailwind.config.js
  fixTailwindConfig();
  
  // 3. Corregir componentes UI
  fixUIComponents();
  
  console.log('');
  console.log('✅ Configuración de Tailwind corregida');
  console.log('');
  console.log('📋 Resumen de acciones:');
  console.log('1. Se ha corregido app/globals.css');
  console.log('2. Se ha corregido tailwind.config.js');
  console.log('3. Se han corregido los componentes UI que usaban border-border');
  console.log('');
  console.log('🏁 Ahora ejecuta:');
  console.log('   npm run dev');
}

main().catch(err => {
  console.error('❌ Error en el script:', err);
  process.exit(1);
});
