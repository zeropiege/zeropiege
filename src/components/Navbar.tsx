'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0A1A2F]/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="nav-container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="nav-logo text-xl font-bold uppercase tracking-wider text-white">
          [Nom de Marque]
        </div>
        <ul className="nav-menu flex list-none gap-8 md:gap-10">
          <li>
            <Link href="#hero" className="text-white hover:text-white/80 transition-colors relative py-2 after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
              Accueil
            </Link>
          </li>
          <li>
            <Link href="#features" className="text-white hover:text-white/80 transition-colors relative py-2 after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
              Fonctionnalités
            </Link>
          </li>
          <li>
            <Link href="#about" className="text-white hover:text-white/80 transition-colors relative py-2 after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
              À propos
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-white hover:text-white/80 transition-colors relative py-2 after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}