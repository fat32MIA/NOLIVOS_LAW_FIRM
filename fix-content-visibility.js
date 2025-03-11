const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Rutas principales
const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');

console.log(`Directorio raíz: ${ROOT_DIR}`);

// Verificar componentes UI necesarios
function verificarComponentesUI() {
  const componentesNecesarios = [
    'button',
    'card',
    'input',
    'textarea',
    'dropdown-menu'
  ];
  
  const uiDir = path.join(COMPONENTS_DIR, 'ui');
  if (!fs.existsSync(uiDir)) {
    fs.mkdirSync(uiDir, { recursive: true });
    console.log(`✅ Creado directorio: ${uiDir}`);
  }
  
  let faltanComponentes = false;
  
  for (const componente of componentesNecesarios) {
    const rutaComponente = path.join(uiDir, `${componente}.tsx`);
    if (!fs.existsSync(rutaComponente)) {
      console.log(`⚠️ Falta componente UI: ${componente}.tsx`);
      faltanComponentes = true;
    }
  }
  
  if (faltanComponentes) {
    console.log('🔄 Instalando componentes UI faltantes...');
    try {
      execSync('npx shadcn@latest init', { stdio: 'inherit' });
      
      for (const componente of componentesNecesarios) {
        try {
          execSync(`npx shadcn@latest add ${componente}`, { stdio: 'inherit' });
          console.log(`✅ Instalado componente: ${componente}`);
        } catch (error) {
          console.error(`❌ Error al instalar componente ${componente}:`, error);
        }
      }
    } catch (error) {
      console.error('❌ Error al inicializar shadcn/ui:', error);
    }
  } else {
    console.log('✅ Todos los componentes UI necesarios están presentes');
  }
}

// Corregir página principal
function corregirPaginaPrincipal() {
  const rutaPagina = path.join(APP_DIR, 'page.tsx');
  
  if (fs.existsSync(rutaPagina)) {
    try {
      const contenidoPagina = `import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Mail, Phone } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Fondo animado */}
      <AnimatedBackground />
      
      {/* Overlay para mejorar contraste */}
      <div className="absolute inset-0 bg-black/70 z-0" />
      
      {/* Contenido principal */}
      <div className="relative z-10 text-white">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-500">NOLIVOS LAW</span>
              <span className="text-sm text-gray-400">SERVICIOS LEGALES</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white">
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </Button>
              <Button variant="ghost" size="sm" className="text-white">
                <Mail className="w-4 h-4 mr-2" />
                contacto@nolivoslaw.com
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-32 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-blue-500">
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
            <Card className="max-w-xl mx-auto bg-black/70 border border-white/20">
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
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Nuestros Servicios
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-black/70 border border-white/20">
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

              <Card className="bg-black/70 border border-white/20">
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
          </div>
        </section>
      </div>
    </div>
  )
}`;
      
      fs.writeFileSync(rutaPagina, contenidoPagina);
      console.log(`✅ Corregida página principal: ${rutaPagina}`);
    } catch (error) {
      console.error(`❌ Error al corregir página principal:`, error);
    }
  } else {
    console.error(`❌ No se encontró la página principal: ${rutaPagina}`);
  }
}

// Corregir componente AnimatedBackground
function corregirAnimatedBackground() {
  const rutaComponente = path.join(COMPONENTS_DIR, 'animated-background.tsx');
  
  if (fs.existsSync(rutaComponente)) {
    try {
      const contenidoComponente = `"use client"

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
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  )
}`;
      
      fs.writeFileSync(rutaComponente, contenidoComponente);
      console.log(`✅ Corregido componente AnimatedBackground: ${rutaComponente}`);
    } catch (error) {
      console.error(`❌ Error al corregir componente AnimatedBackground:`, error);
    }
  } else {
    console.error(`❌ No se encontró el componente AnimatedBackground: ${rutaComponente}`);
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando corrección de visibilidad del contenido...');
  
  // 1. Verificar componentes UI necesarios
  verificarComponentesUI();
  
  // 2. Corregir componente AnimatedBackground
  corregirAnimatedBackground();
  
  // 3. Corregir página principal
  corregirPaginaPrincipal();
  
  // 4. Limpiar caché de Next.js
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
  console.log('✅ Corrección de visibilidad completada');
  console.log('');
  console.log('Ahora ejecuta:');
  console.log('   npm run dev');
}

// Ejecutar la función principal
main().catch(err => {
  console.error('❌ Error en el proceso:', err);
  process.exit(1);
});
