// components/Hero.jsx
"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/hero.module.css';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const [cloudPositions, setCloudPositions] = useState([
    { x: -10, y: 20 },
    { x: 60, y: 10 },
    { x: 30, y: 40 }
  ]);
  
  // Effect for parallax scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Effect for cloud animation
  useEffect(() => {
    const animateClouds = () => {
      setCloudPositions(prev => prev.map((cloud, index) => ({
        x: (cloud.x + 0.02) % 120 - 20,  // Move clouds horizontally and loop
        y: cloud.y
      })));
    };
    
    const intervalId = setInterval(animateClouds, 50);
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className={styles.heroContainer} ref={heroRef}>
      {/* Animated sky background */}
      <div className={styles.skyBackground}>
        <div className={styles.clouds}>
          {[1, 2, 3].map((num, index) => (
            <div 
              key={num}
              className={styles.cloud}
              style={{
                backgroundImage: `url(/images/cloud-${num}.png)`,
                left: `${cloudPositions[index].x}%`,
                top: `${cloudPositions[index].y}%`,
                transform: `translateY(${scrollY * 0.1}px)`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main background image */}
      <div 
        className={styles.backgroundImage}
        style={{
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        <Image
          src="/images/background.png"
          alt="Justice symbols"
          fill
          quality={100}
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
          priority
        />
      </div>
      
      {/* Light effect overlay */}
      <div 
        className={styles.lightEffect}
        style={{
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      >
        <Image
          src="/images/light-effect.png"
          alt="Light effect"
          fill
          quality={90}
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      {/* INMIGRACIÓN text */}
      <h1 
        className={styles.mainTitle}
        style={{
          transform: `translateY(${scrollY * 0.2}px)`
        }}
      >
        INMIGRACIÓN
      </h1>
      
      {/* Abogado image */}
      <div 
        className={styles.abogadoContainer}
        style={{
          transform: `translateY(${scrollY * 0.1}px)`
        }}
      >
        <Image
          src="/images/abogado.png"
          alt="Abogado Guillermo Nolivos"
          width={600}
          height={800}
          quality={100}
          priority
          className={styles.abogadoImage}
        />
      </div>
      
      {/* Bottom gradient overlay for smooth transition */}
      <div className={styles.bottomGradient}></div>
    </div>
  );
}
