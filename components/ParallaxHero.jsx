// components/ParallaxHero.jsx
"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '@/styles/parallax.module.css';

export default function ParallaxHero() {
  const [offsetY, setOffsetY] = useState(0);

  // Efecto para el scroll parallax
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.parallaxContainer}>
      <div className={styles.heroContainer}>
        {/* Imagen de fondo */}
        <Image
          src="/images/usa-law-background.webp"
          alt="Símbolos de la justicia estadounidense"
          fill
          priority
          quality={90}
          className={styles.backgroundImage}
          style={{
            transform: `translateY(${offsetY * 0.5}px)`
          }}
        />
        
        {/* Título grande */}
        <h1 
          className={styles.title}
          style={{
            transform: `translateY(${offsetY * 0.2}px)`
          }}
        >
          INMIGRACIÓN
        </h1>
        
        {/* Imagen del abogado */}
        <div 
          className={styles.abogadoContainer}
          style={{
            transform: `translateY(${offsetY * 0.1}px)`
          }}
        >
          <Image
            src="/images/guillermo.png"
            alt="Abogado Guillermo Nolivos"
            width={600}
            height={800}
            priority
            quality={100}
            className={styles.abogadoImage}
          />
        </div>
        
        {/* Overlay para mejor transición */}
        <div className={styles.heroOverlay}></div>
      </div>
    </div>
  );
}
