// components/ParallaxHero.tsx
"use client";

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import styles from '@/styles/parallax.module.css';

export default function ParallaxHero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Esta función se ejecutará después de que GSAP y ScrollTrigger estén cargados
    const initParallax = () => {
      if (typeof window !== 'undefined' && 
          window.gsap && 
          window.ScrollTrigger && 
          parallaxRef.current) {
        
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        const triggerElement = parallaxRef.current.querySelector('[data-parallax-layers]');
        if (!triggerElement) return;
        
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
        
        const layers = [
          { layer: "1", yPercent: 40 }, // Fondo
          { layer: "2", yPercent: 20 }, // Texto "IMMIGRATION"
          { layer: "3", yPercent: 30 }, // Sombra transparente
          { layer: "4", yPercent: 0 }   // Abogado (No se mueve)
        ];
        
        layers.forEach((layerObj, idx) => {
          const elements = triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
          if (elements.length) {
            tl.to(
              elements,
              {
                yPercent: layerObj.yPercent,
                ease: "none"
              },
              idx === 0 ? undefined : "<"
            );
          }
        });
        
        // Configuración de desplazamiento suave con Lenis si está disponible
        if (window.Lenis) {
          const lenis = new window.Lenis();
          lenis.on('scroll', ScrollTrigger.update);
          gsap.ticker.add((time) => { lenis.raf(time * 1000); });
          gsap.ticker.lagSmoothing(0);
        }
      }
    };

    // Intentar inicializar el parallax si las bibliotecas ya están cargadas
    if (typeof window !== 'undefined' && 
        window.gsap && 
        window.ScrollTrigger) {
      initParallax();
    }

    // Agregar un listener para el evento customGsapLoaded que se dispara después de que los scripts se carguen
    window.addEventListener('customGsapLoaded', initParallax);

    return () => {
      window.removeEventListener('customGsapLoaded', initParallax);
    };
  }, []);

  return (
    <>
      {/* Scripts necesarios */}
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Verificar si todos los scripts están cargados
          if (window.gsap && window.ScrollTrigger && window.Lenis) {
            window.dispatchEvent(new Event('customGsapLoaded'));
          }
        }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Verificar si todos los scripts están cargados
          if (window.gsap && window.ScrollTrigger && window.Lenis) {
            window.dispatchEvent(new Event('customGsapLoaded'));
          }
        }}
      />
      <Script
        src="https://unpkg.com/lenis@1.1.14/dist/lenis.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Verificar si todos los scripts están cargados
          if (window.gsap && window.ScrollTrigger && window.Lenis) {
            window.dispatchEvent(new Event('customGsapLoaded'));
          }
        }}
      />

      {/* Contenedor principal */}
      <div className={styles.parallax} style={{width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden"}}>
        <section className={styles.parallax__header}>
          <div className={styles.parallax__visuals}>
            <div className={styles.parallax__black_line_overflow}></div>
            <div data-parallax-layers className={styles.parallax__layers}>
              
              {/* Capa 1: Fondo */}
              <img src="/images/usa-law-background.webp" 
                  loading="eager" 
                  width="100%" 
                  data-parallax-layer="1" 
                  alt="Fondo" 
                  className={styles.parallax__layer_img} style={{opacity: 0.7}} />
              
              {/* Capa 2: Texto "IMMIGRATION" detrás del abogado */}
              <div data-parallax-layer="2" className={styles.parallax__layer_title} style={{zIndex: 3}}>
                <h2 className={styles.parallax__title} style={{fontSize: "15vw", opacity: 0.25, letterSpacing: "0.05em", fontWeight: 800}}>INMIGRACIÓN</h2>
              </div>
              
              {/* Capa 3: Sombra Suave */}
              <img src="/images/capas-fondo-y-luz.png" 
                  loading="eager" 
                  width="100%" 
                  data-parallax-layer="3" 
                  alt="Sombra" 
                  className={`${styles.parallax__layer_img} ${styles.parallax__shadow}`} />
              
              {/* Capa 4: Abogado con Cara Visible */}
              <div data-parallax-layer="4" className={styles.parallax__lawyer_container} style={{zIndex: 20, position: "absolute"}} style={{zIndex: 5}}> {/* Capa de Guillermo */}
              <Image 
                src="/images/guillermo-nolivos-updated.png"
                alt="Abogado Guillermo Nolivos"
                width={600}
                height={800}
                quality={100}
                priority
                className={styles.parallax__lawyer} style={{zIndex: 20}}
              />
            </div>
            
            </div>
            <div className={styles.parallax__fade}></div>
          </div>
        </section>
      </div>
    </>
  );
}
