import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Header from './components/Header';
import TeardownModal from './components/TeardownModal';
import AdaptiveMenu from './components/AdaptiveMenu';
import IntroPreloader from './components/IntroPreloader';
import HeroScrollFlow from './components/HeroScrollFlow';
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenisRef = useRef(null);

  // 1. Lenis Smooth Scroll Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // 2. Smooth anchor navigation supporting Lenis
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href !== '#') {
        if (href === '#how-it-works') {
          e.preventDefault();
          const timelineEl = document.querySelector('#timeline');
          if (timelineEl && window.lenis) {
            const targetPos = timelineEl.offsetTop + 4200;
            window.lenis.scrollTo(targetPos, { duration: 1.2 });
            return;
          }
        }
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetEl, { offset: 0, duration: 1.2 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // 3. GSAP ScrollTrigger Orchestration for Subsequent Sections
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Testimonials Entrance
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: '#testimonials',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="theme-numa app-snap-container">
      {isIntroActive && (
        <IntroPreloader 
          onComplete={() => {
            setIsIntroActive(false);
            ScrollTrigger.refresh();
          }} 
        />
      )}

      <TeardownModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <AdaptiveMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onOpenTeardown={() => setIsModalOpen(true)} 
      />

      <Header 
        onOpenTeardown={() => setIsModalOpen(true)} 
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
      />

      <main className="snap-main">
        <HeroScrollFlow onOpenTeardown={() => setIsModalOpen(true)} />
        <Dashboard />
        <Timeline onOpenTeardown={() => setIsModalOpen(true)} />
        <Testimonials />
        <Footer onOpenTeardown={() => setIsModalOpen(true)} />
      </main>
    </div>
  );
}
