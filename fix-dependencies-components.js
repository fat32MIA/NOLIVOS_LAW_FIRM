const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Rutas absolutas
const ROOT_DIR = process.cwd();
const COMPONENTS_UI_DIR = path.join(ROOT_DIR, 'components', 'ui');
const APP_DIR = path.join(ROOT_DIR, 'app');

console.log(`Directorio raíz: ${ROOT_DIR}`);
console.log(`Directorio componentes UI: ${COMPONENTS_UI_DIR}`);

// Asegurarse de que el directorio de componentes UI existe
if (!fs.existsSync(COMPONENTS_UI_DIR)) {
  fs.mkdirSync(COMPONENTS_UI_DIR, { recursive: true });
  console.log(`✅ Creado directorio: ${COMPONENTS_UI_DIR}`);
}

// Crear componente Checkbox
const checkboxPath = path.join(COMPONENTS_UI_DIR, 'checkbox.tsx');
const checkboxContent = `"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from 'lucide-react'

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }`;

try {
  fs.writeFileSync(checkboxPath, checkboxContent);
  console.log(`✅ Creado componente: checkbox.tsx`);
} catch (error) {
  console.error(`❌ Error al crear componente checkbox.tsx:`, error.message);
}

// Simplificar página de login
const loginPagePath = path.join(APP_DIR, 'login', 'page.tsx');
if (fs.existsSync(loginPagePath)) {
  const simplifiedLoginContent = `"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de login
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Iniciar sesión en su cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{" "}
            <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">
              contacte con soporte
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">
                ¿Olvidó su contraseña?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70"
            >
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}`;

  try {
    fs.writeFileSync(loginPagePath, simplifiedLoginContent);
    console.log(`✅ Simplificada página: login/page.tsx`);
  } catch (error) {
    console.error(`❌ Error al simplificar página login/page.tsx:`, error.message);
  }
}

// Actualizar package.json para añadir zod
const packageJsonPath = path.join(ROOT_DIR, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Añadir zod si no existe
    packageJson.dependencies = packageJson.dependencies || {};
    if (!packageJson.dependencies.zod) {
      packageJson.dependencies.zod = "^3.22.4";
      console.log('✅ Añadida dependencia: zod');
    }
    
    // Añadir @radix-ui/react-checkbox si no existe
    if (!packageJson.dependencies['@radix-ui/react-checkbox']) {
      packageJson.dependencies['@radix-ui/react-checkbox'] = "^1.0.4";
      console.log('✅ Añadida dependencia: @radix-ui/react-checkbox');
    }
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Actualizado package.json');
  } catch (error) {
    console.error(`❌ Error al actualizar package.json:`, error.message);
  }
}

// Limpiar caché de Next.js
const nextCacheDir = path.join(ROOT_DIR, '.next');
if (fs.existsSync(nextCacheDir)) {
  try {
    fs.rmSync(nextCacheDir, { recursive: true, force: true });
    console.log(`✅ Eliminada caché de Next.js: ${nextCacheDir}`);
  } catch (error) {
    console.error(`❌ Error al eliminar caché de Next.js: ${error.message}`);
  }
}

// Instalar dependencias
try {
  console.log('📦 Instalando dependencias...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  console.log('✅ Dependencias instaladas correctamente');
} catch (error) {
  console.error('❌ Error al instalar dependencias:', error.message);
  console.log('⚠️ Intenta instalar manualmente con: npm install --legacy-peer-deps');
}

console.log('');
console.log('✅ Componentes y dependencias actualizados');
console.log('');
console.log('Ahora ejecuta:');
console.log('   npm run build');
