"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Phone, Mail, Calendar, Menu } from "lucide-react"
import { useState } from "react"

export function ProfessionalHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-inolpng-YtLwdxbVEOzITNQbc3Gfyiz6KQ7q0b.png"
                alt="Nolivos Law"
                className="h-8"
              />
              <span className="font-semibold text-lg hidden md:inline-block">Nolivos Law</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
          </nav>

          {/* Contact Info and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <a href="tel:+15551234567" className="flex items-center text-sm hover:text-primary transition-colors">
                <Phone className="h-4 w-4 mr-1" />
                <span className="hidden lg:inline">(555) 123-4567</span>
              </a>
              <a
                href="mailto:info@nolivoslaw.com"
                className="flex items-center text-sm hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 mr-1" />
                <span className="hidden lg:inline">info@nolivoslaw.com</span>
              </a>
              <Link href="/schedule" className="flex items-center text-sm hover:text-primary transition-colors">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="hidden lg:inline">Schedule Consultation</span>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
                Services
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                Blog
              </Link>
            </nav>
            <div className="flex flex-col space-y-3 mt-4 pt-4 border-t">
              <a href="tel:+15551234567" className="flex items-center text-sm hover:text-primary transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                (555) 123-4567
              </a>
              <a
                href="mailto:info@nolivoslaw.com"
                className="flex items-center text-sm hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                info@nolivoslaw.com
              </a>
              <Link href="/schedule" className="flex items-center text-sm hover:text-primary transition-colors">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

