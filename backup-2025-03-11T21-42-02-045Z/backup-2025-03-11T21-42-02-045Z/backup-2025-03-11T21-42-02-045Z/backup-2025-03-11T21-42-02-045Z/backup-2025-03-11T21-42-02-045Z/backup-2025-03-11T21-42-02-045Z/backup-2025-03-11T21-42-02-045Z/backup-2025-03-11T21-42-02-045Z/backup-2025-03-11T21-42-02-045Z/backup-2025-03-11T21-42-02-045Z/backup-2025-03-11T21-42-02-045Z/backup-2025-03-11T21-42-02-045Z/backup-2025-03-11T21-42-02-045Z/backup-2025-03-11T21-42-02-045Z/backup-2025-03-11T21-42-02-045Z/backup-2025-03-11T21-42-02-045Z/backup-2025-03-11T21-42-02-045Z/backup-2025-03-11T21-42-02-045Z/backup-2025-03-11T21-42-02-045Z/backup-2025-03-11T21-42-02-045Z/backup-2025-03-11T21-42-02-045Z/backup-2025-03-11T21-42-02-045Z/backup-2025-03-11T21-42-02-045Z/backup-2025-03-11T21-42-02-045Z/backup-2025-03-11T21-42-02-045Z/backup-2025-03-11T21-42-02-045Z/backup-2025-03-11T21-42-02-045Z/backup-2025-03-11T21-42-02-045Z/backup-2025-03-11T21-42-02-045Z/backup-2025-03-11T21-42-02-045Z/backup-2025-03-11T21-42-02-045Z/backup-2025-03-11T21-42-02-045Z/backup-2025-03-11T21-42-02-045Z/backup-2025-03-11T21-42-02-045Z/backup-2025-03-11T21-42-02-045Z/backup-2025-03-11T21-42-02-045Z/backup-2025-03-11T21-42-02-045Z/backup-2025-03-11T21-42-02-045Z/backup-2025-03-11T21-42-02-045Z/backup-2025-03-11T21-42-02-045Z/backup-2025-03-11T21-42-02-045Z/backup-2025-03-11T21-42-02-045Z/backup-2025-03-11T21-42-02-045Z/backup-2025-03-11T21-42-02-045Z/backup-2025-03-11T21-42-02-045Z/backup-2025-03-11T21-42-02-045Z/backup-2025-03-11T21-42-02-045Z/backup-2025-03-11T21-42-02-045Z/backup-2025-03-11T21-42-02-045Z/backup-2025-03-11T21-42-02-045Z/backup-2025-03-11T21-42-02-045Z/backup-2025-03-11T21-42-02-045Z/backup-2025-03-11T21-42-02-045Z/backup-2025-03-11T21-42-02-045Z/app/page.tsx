import { AnimatedBackground } from "@/components/animated-background"
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
              <Link href="/login" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">Iniciar Sesión</Link>
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
}