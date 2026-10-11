'use client';

import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { useRef, useEffect, useState } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const [textState, setTextState] = useState(0);

  const textStates = [
    'Des ressources puissantes, testées et approuvées',
    'Des tutoriels pas à pas, en français',
    'Une nouvelle ressource chaque semaine'
  ];

  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const video = videoRef.current;
    if (!heroSection || !video) return;

    let ticking = false;
    let lastUpdate = 0;
    const updateInterval = 16;

    function updateVideoState() {
      const now = performance.now();
      if (now - lastUpdate < updateInterval) return;
      lastUpdate = now;

      // Use non-null assertion since we already checked heroSection exists
      const sectionTop = heroSection!.offsetTop;
      const sectionHeight = heroSection!.offsetHeight;
      const scrollPosition = window.pageYOffset;

      let progress = (scrollPosition - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight);
      progress = Math.max(0, Math.min(1, progress));

      if (video && Number.isFinite(video.duration)) {
        video.currentTime = video.duration * progress;
      }

      // Update text state based on scroll progress
      const stateIndex = Math.floor(progress * 3);
      setTextState(Math.min(stateIndex, 2));
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateVideoState();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    if (video && video.readyState >= 2) {
      updateVideoState();
    } else if (video) {
      video.addEventListener('loadedmetadata', updateVideoState);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (video) {
        video.removeEventListener('loadedmetadata', updateVideoState);
      }
    };
  }, []);

  return (
    <section id="hero" className="hero relative" ref={heroSectionRef}>
      {/* Shader Gradient Canvas - Arrière-plan animé subtil */}
      <ShaderGradientCanvas
        style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.15 }}
        pixelDensity={1.5}
        fov={45}
      >
        <ShaderGradient
          cDistance={32}
          cPolarAngle={125}
          animate="on"
          uSpeed={0.08}
          uFrequency={1.2}
          uStrength={0.35}
          uAmplitude={0.5}
          color1="#FAF7F2"
          color2="#D97757"
          color3="#E8A87C"
          grain="on"
          grainBlending={0.025}
          shader="defaults"
          type="plane"
        />
      </ShaderGradientCanvas>

      <div className="hero-video-container absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="hero-video absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
          muted
          playsInline
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        >
          <source src="/video.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo HTML5.
        </video>
        <div className="hero-overlay absolute inset-0 flex items-center justify-center text-center px-6 bg-gradient-to-b from-[#0A1A2F]/70 to-[#0A1A2F]/90">
          <div className="hero-content relative z-10 text-white max-w-3xl min-h-[200px]">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6 leading-tight">
              Zéro Piège
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl font-normal opacity-90 mb-10 max-w-xl mx-auto leading-relaxed">
              Des outils et des tutoriels IA, sans mauvaise surprise
            </p>
            <div className="hero-text-states h-12 flex items-center justify-center mb-10">
              <p className={`hero-text-state transition-opacity duration-500 ${textState === 0 ? 'opacity-100' : 'opacity-0'}`}>
                {textStates[0]}
              </p>
              <p className={`hero-text-state transition-opacity duration-500 ml-2 ${textState === 1 ? 'opacity-100' : 'opacity-0'}`}>
                {textStates[1]}
              </p>
              <p className={`hero-text-state transition-opacity duration-500 ml-2 ${textState === 2 ? 'opacity-100' : 'opacity-0'}`}>
                {textStates[2]}
              </p>
            </div>
            <a href="/tutoriels" className="hero-cta inline-block bg-transparent text-white border-2 border-white px-10 py-4 text-lg font-medium uppercase tracking-wider hover:bg-white hover:text-[#0A1A2F] transition-all duration-300">
              Voir les tutoriels
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}