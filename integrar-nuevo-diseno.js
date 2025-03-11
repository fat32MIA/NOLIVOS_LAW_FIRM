const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Rutas principales
const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');

console.log(`Directorio raíz: ${ROOT_DIR}`);

// Crear directorios si no existen
function crearDirectoriosSiNoExisten() {
  const directorios = [
    path.join(COMPONENTS_DIR),
    path.join(COMPONENTS_DIR, 'ui')
  ];
  
  directorios.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Creado directorio: ${dir}`);
    }
  });
}

// Crear o actualizar archivos de componentes
function crearComponentes() {
  const componentes = [
    {
      ruta: path.join(COMPONENTS_DIR, 'animated-logo.tsx'),
      contenido: `"use client"

import { motion } from "framer-motion"

export function AnimatedLogo() {
  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-10 h-10"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#2563eb' }} />
              <stop offset="100%" style={{ stopColor: '#60a5fa' }} />
            </linearGradient>
          </defs>
          <motion.path
            d="M20 80 L20 20 L50 20 L80 20 L80 80 L50 80 M20 50 L80 50"
            stroke="url(#logoGradient)"
            strokeWidth="8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col"
      >
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          NOLIVOS LAW
        </span>
        <span className="text-xs text-muted-foreground">
          SERVICIOS LEGALES
        </span>
      </motion.div>
    </motion.div>
  )
}`
    },
    {
      ruta: path.join(COMPONENTS_DIR, 'animated-background.tsx'),
      contenido: `"use client"

import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configurar el tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Crear partículas
    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = \`rgba(37, 99, 235, \${this.opacity})\`
        ctx.fill()
      }
    }

    // Inicializar partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Conectar partículas cercanas
    function connect() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            if (!ctx) return
            ctx.beginPath()
            ctx.strokeStyle = \`rgba(37, 99, 235, \${0.1 * (1 - distance/150)})\`
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Función de animación
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      connect()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-50"
    />
  )
}`
    },
    {
      ruta: path.join(COMPONENTS_DIR, 'mode-toggle.tsx'),
      contenido: `"use client"

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

export function ModeToggle() {
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
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`
    }
  ];
  
  componentes.forEach(({ ruta, contenido }) => {
    try {
      fs.writeFileSync(ruta, contenido);
      console.log(`✅ Creado/actualizado: ${ruta}`);
    } catch (error) {
      console.error(`❌ Error al crear/actualizar ${ruta}:`, error);
    }
  });
}

// Actualizar página principal
function actualizarPaginaPrincipal() {
  const rutaPagina = path.join(APP_DIR, 'page.tsx');
  const contenidoPagina = `import { AnimatedLogo } from "@/components/animated-logo"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowRight, Mail, Phone } from 'lucide-react'
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <AnimatedLogo />
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white">
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </Button>
              <Button variant="ghost" size="sm" className="text-white">
                <Mail className="w-4 h-4 mr-2" />
                contacto@nolivoslaw.com
              </Button>
              <ModeToggle />
              <Button variant="outline" asChild>
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-32 px-4 text-white">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Servicios Legales de Inmigración
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Soluciones legales personalizadas para todos tus trámites migratorios.
              Experiencia y compromiso para guiarte en cada paso del proceso.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Consulta Gratuita
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10">
                Conoce Más
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Consultation Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-xl mx-auto backdrop-blur-sm bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Consulta Rápida</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input 
                    placeholder="Tu nombre" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Input 
                    type="email" 
                    placeholder="tu@email.com" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Textarea 
                    placeholder="¿Cómo podemos ayudarte?" 
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Enviar Consulta
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 max-w-4xl">
            <Card className="backdrop-blur-sm bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Visas y Permisos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-4">
                  Ofrecemos asesoría completa para visas de trabajo, turismo,
                  estudios y reunificación familiar.
                </p>
                <Button variant="outline" className="w-full text-white border-white/50 hover:bg-white/10">
                  Más Información
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Asilo y Refugio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-4">
                  Ayudamos a personas que buscan protección por persecución
                  o temor fundado en sus países de origen.
                </p>
                <Button variant="outline" className="w-full text-white border-white/50 hover:bg-white/10">
                  Más Información
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}`;

  try {
    fs.writeFileSync(rutaPagina, contenidoPagina);
    console.log(`✅ Actualizada página principal: ${rutaPagina}`);
  } catch (error) {
    console.error(`❌ Error al actualizar página principal:`, error);
  }
}

// Actualizar dependencias
function actualizarDependencias() {
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // Añadir dependencias necesarias
      packageJson.dependencies = packageJson.dependencies || {};
      packageJson.dependencies["framer-motion"] = "^10.16.4";
      packageJson.dependencies["next-themes"] = "^0.2.1";
      packageJson.dependencies["lucide-react"] = "^0.294.0";
      
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('✅ Actualizado package.json con nuevas dependencias');
    } catch (error) {
      console.error('❌ Error al actualizar package.json:', error);
    }
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando integración del nuevo diseño...');
  
  // 1. Crear directorios si no existen
  crearDirectoriosSiNoExisten();
  
  // 2. Crear componentes
  crearComponentes();
  
  // 3. Actualizar página principal
  actualizarPaginaPrincipal();
  
  // 4. Actualizar dependencias
  actualizarDependencias();
  
  console.log('');
  console.log('✅ Integración completada');
  console.log('');
  console.log('Ahora ejecuta:');
  console.log('   npm install');
  console.log('   npm run build');
  console.log('   npm run dev');
}

// Ejecutar la función principal
main().catch(err => {
  console.error('❌ Error en el proceso:', err);
  process.exit(1);
});
