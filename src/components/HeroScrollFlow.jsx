import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollFlow({ onOpenTeardown }) {
  const containerRef = useRef(null);
  const pinWrapRef = useRef(null);

  // Stage 1 (Hero) elements
  const heroContentRef = useRef(null);
  const heroMaskRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroBadgeRef = useRef(null);

  // Stage 2 (Streams) elements
  const streamWrapRef = useRef(null);
  const streamTopRef = useRef(null);
  const streamMidRef = useRef(null);
  const streamBotRef = useRef(null);

  // Stage 3 & 4 (Product Emblem & Split Text) elements
  const productCapsuleRef = useRef(null);
  const splitTextWrapRef = useRef(null);

  // Stage 5 (Stat Cards)
  const statCardsWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Master Scrub Timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=4200',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // -------------------------------------------------------------
      // PHASE 1: Hero Shrinks into Center Capsule (0.00 -> 0.18)
      // -------------------------------------------------------------
      masterTl
        .to([heroContentRef.current, heroBadgeRef.current], {
          y: -50,
          opacity: 0,
          filter: 'blur(8px)',
          duration: 0.16,
          ease: 'power2.inOut'
        }, 0)
        .to(heroMaskRef.current, {
          width: 'clamp(280px, 32vw, 440px)',
          height: 'clamp(170px, 19vw, 260px)',
          borderRadius: '9999px',
          duration: 0.18,
          boxShadow: '0 25px 70px rgba(11, 13, 9, 0.25)',
          ease: 'power2.inOut'
        }, 0)
        .to(heroImgRef.current, {
          scale: 1.18,
          opacity: 0.9,
          duration: 0.18,
          ease: 'power2.inOut'
        }, 0);

      // -------------------------------------------------------------
      // PHASE 2: Capsule Photo Streams Flow in & Cross (0.18 -> 0.44)
      // -------------------------------------------------------------
      masterTl
        .to(streamWrapRef.current, {
          opacity: 1,
          duration: 0.06,
          ease: 'none'
        }, 0.18)
        .fromTo(streamTopRef.current, 
          { xPercent: 25, opacity: 0 },
          { xPercent: -25, opacity: 1, duration: 0.26, ease: 'none' },
          0.18
        )
        .fromTo(streamMidRef.current, 
          { xPercent: -30, opacity: 0 },
          { xPercent: 20, opacity: 1, duration: 0.26, ease: 'none' },
          0.18
        )
        .fromTo(streamBotRef.current, 
          { xPercent: 28, opacity: 0 },
          { xPercent: -22, opacity: 1, duration: 0.26, ease: 'none' },
          0.18
        );

      // -------------------------------------------------------------
      // PHASE 3: Streams Slide Out -> Solitary Central Emblem (0.44 -> 0.62)
      // -------------------------------------------------------------
      masterTl
        .to(streamWrapRef.current, {
          opacity: 0,
          scale: 0.92,
          duration: 0.08,
          ease: 'power2.in'
        }, 0.44)
        .to(heroMaskRef.current, {
          opacity: 0,
          scale: 0.85,
          duration: 0.08,
          ease: 'power2.in'
        }, 0.44)
        .fromTo(productCapsuleRef.current,
          { opacity: 0, scale: 0.82, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 0.10, ease: 'power2.out' },
          0.46
        );

      // -------------------------------------------------------------
      // PHASE 4: Split Screen - Emblem Left + Big Text Right (0.62 -> 0.82)
      // -------------------------------------------------------------
      masterTl
        // Product capsule shifts to the left third of the screen
        .to(productCapsuleRef.current, {
          x: '-25vw',
          rotation: -7,
          scale: 0.96,
          duration: 0.14,
          ease: 'power2.inOut'
        }, 0.62)
        // Big typography sweeps in from right
        .fromTo(splitTextWrapRef.current,
          { x: 80, opacity: 0, filter: 'blur(8px)' },
          { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.14, ease: 'power2.out' },
          0.64
        );

      // -------------------------------------------------------------
      // PHASE 5: Transition into Stat Cards (0.82 -> 1.00)
      // -------------------------------------------------------------
      masterTl
        .to([productCapsuleRef.current, splitTextWrapRef.current], {
          y: -40,
          opacity: 0,
          scale: 0.92,
          duration: 0.06,
          ease: 'power2.in'
        }, 0.82)
        .fromTo(statCardsWrapRef.current,
          { opacity: 0, y: 70, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.14, ease: 'power2.out' },
          0.85
        )
        .fromTo('.flow-stat-card',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, duration: 0.12, ease: 'power2.out' },
          0.86
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const statCardsData = [
    {
      num: '72',
      unit: 'hours',
      title: 'Live in 72 hours',
      desc: 'Your ticket page, creative, and tracking go live fast, while every other channel is still stuck in planning.',
      image: '/assets/concert.jpg'
    },
    {
      num: '24',
      unit: '/ 7',
      title: 'Runs 24/7 on its own',
      desc: 'Automated follow-up sequences handle reminders, abandoned checkouts, and last-chance pushes without you lifting a finger.',
      image: '/assets/conference.jpg'
    },
    {
      num: '100',
      unit: '%',
      title: '100% attribution',
      desc: 'Know exactly which ad, email, or post sold each ticket. Real-time cost-per-ticket tracking across all your channels.',
      image: '/assets/nightlife.jpg'
    }
  ];

  return (
    <section ref={containerRef} className="hero-scroll-flow-section" id="hero">
      <div ref={pinWrapRef} className="hero-flow-pin-viewport">
        
        {/* ===================================================================
            LAYER 1: HERO VIEWPORT & SHRINKING CAPSULE MASK
            =================================================================== */}
        <div className="hero-flow-camera">
          <div ref={heroMaskRef} className="hero-flow-mask">
            
            {/* Visual Concert Atmosphere */}
            <div className="hero-flow-visual-stage">
              <div className="stage-gradient-glow"></div>
              <div className="stage-grid-lines"></div>
              <img 
                ref={heroImgRef}
                src="/assets/concert.jpg" 
                alt="Live Event Atmosphere" 
                className="hero-flow-stage-bg" 
              />
            </div>

            {/* Hero Content (Title, Subtitle, CTA Button) */}
            <div ref={heroContentRef} className="hero-flow-content">
              <div className="hero-flow-title text--base">
                <h1 className="text h1">An AI system that</h1>
                <h1 className="text h1"><span className="font-accent">sells</span> your tickets.</h1>
              </div>

              <div className="hero-flow-subtitle text--muted">
                <p className="text text-1">
                  SoldShow builds your creative, runs your ticket page, and follows up automatically — so you're not chasing sales the week before your event.
                </p>
              </div>

              <div className="pre-order-button__wrapper">
                <button type="button" className="button pre-order-button js-open-teardown" onClick={onOpenTeardown}>
                  <span className="text-button button-text text--base">Get a free teardown</span>
                </button>
              </div>
            </div>

            {/* Floating Telemetry Badge */}
            <div ref={heroBadgeRef} className="hero-flow-telemetry-badge mono">
              <span className="badge-dot"></span>
              <span>AI SYSTEM &bull; TICKET SALES INFRASTRUCTURE</span>
            </div>

          </div>
        </div>

        {/* ===================================================================
            LAYER 2: STREAMING CAPSULE PHOTO RIVER (Passes Behind / Around Center)
            =================================================================== */}
        <div ref={streamWrapRef} className="hero-flow-streams-wrapper">
          
          {/* Row 1: Top Stream */}
          <div ref={streamTopRef} className="flow-stream-row flow-stream-row--top">
            <div className="stream-capsule" style={{ backgroundImage: "url('/assets/fair.jpg')" }}>
              <span className="stream-capsule__tag mono">SUMMER FAIRS</span>
            </div>
            <div className="stream-capsule" style={{ backgroundImage: "url('/assets/concert.jpg')" }}>
              <span className="stream-capsule__tag mono">LIVE CONCERTS</span>
            </div>
            <div className="stream-capsule" style={{ backgroundImage: "url('/assets/conference.jpg')" }}>
              <span className="stream-capsule__tag mono">CONFERENCES</span>
            </div>
            <div className="stream-capsule" style={{ backgroundImage: "url('/assets/nightlife.jpg')" }}>
              <span className="stream-capsule__tag mono">NIGHTCLUBS</span>
            </div>
          </div>

          {/* Row 2: Middle Stream */}
          <div ref={streamMidRef} className="flow-stream-row flow-stream-row--mid">
            <div className="stream-capsule" style={{ backgroundImage: "url('/assets/nightlife.jpg')" }}>
              <span className="stream-capsule__tag mono">LOUNGE EVENTS</span>
            </div>
            <div className="stream-capsule" style={{ backgroundImage: "url('/assets/conference.jpg')" }}>
              <span className="stream-capsule__tag mono">SUMMITS</span>
            </div>
            <div className="stream-capsule" style={{ backgroundImage: "url('/assets/concert.jpg')" }}>
              <span className="stream-capsule__tag mono">MUSIC FESTIVALS</span>
            </div>
            <div className="stream-capsule" style={{ backgroundImage: "url('/assets/fair.jpg')" }}>
              <span className="stream-capsule__tag mono">EXPOS</span>
            </div>
          </div>

          {/* Row 3: Bottom Stream */}
          <div ref={streamBotRef} className="flow-stream-row flow-stream-row--bot">
            <div className="stream-capsule" style={{ backgroundImage: "url('/assets/conference.jpg')" }}>
              <span className="stream-capsule__tag mono">TECH EVENTS</span>
            </div>
            <div className="stream-capsule" style={{ backgroundImage: "url('/assets/concert.jpg')" }}>
              <span className="stream-capsule__tag mono">ARENA SHOWS</span>
            </div>
            <div className="stream-capsule" style={{ backgroundImage: "url('/assets/nightlife.jpg')" }}>
              <span className="stream-capsule__tag mono">ROOFTOP PARTIES</span>
            </div>
            <div className="stream-capsule" style={{ backgroundImage: "url('/assets/fair.jpg')" }}>
              <span className="stream-capsule__tag mono">COMMUNITY FAIRS</span>
            </div>
          </div>

        </div>

        {/* ===================================================================
            LAYER 3: CENTRAL SOLDSHOW PRODUCT EMBLEM CAPSULE
            =================================================================== */}
        <div className="hero-flow-stage-center">
          <div ref={productCapsuleRef} className="hero-flow-product-capsule">
            <div className="product-capsule-inner">
              <div className="product-capsule-glow"></div>
              
              {/* 3 Status Indicator Dots (Numa style) */}
              <div className="product-capsule-status-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              {/* Glowing Fitania SoldShow Mark */}
              <div className="product-capsule-mark-wrap">
                <svg className="product-capsule-svg" viewBox="0 0 1080 1106" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M723.32,453c-2.58-2.6-4.62-4.86-8.09-6l-31,31.22,15.82,16.45,26.84,27.26,103.37,104.05,14.41,14.92,78.92,79.01c9.86,9.87,15.54,27.21,3.89,38.89l-192.68,193.28c-10.97,11-29.74,8.71-38.17.36l-59.04-58.52,20.46-20.31,14.91-15,37.2,37.54c1.02.74,4.64,3.97,6.46,2.97l155.22-155.13c1.1-1.1,1.27-2.53,1.35-3.39.11-1.29-1.13-2.19-2.17-3.26l-10.86-11.19-25.49-25.4c-4.96-4.94-9.59-9.55-14.4-14.5l-14.34-14.75-29.01-28.85-23.07-23.04-8.33-8.53-21.13-21.09-121.99-122.39-28.95-29.1c-7.98-8.02-10.81-18.99-7.55-30.04,2.42-8.21,9.17-13.49,15.25-19.5l47.15-46.62,19.9-19.2,58.89-58.81c.69-.69,3.18-2.44,4.04-1.57l71.26,71.47,23.35,23.64-13.44,13.63-41.45,40.82,55.29,56.17,59.67,60.09,19.31,19.94,73.29,74.36,60.74,61.12c30.16,30.35,29.65,85.84,1.19,114.53l-116.22,117.16-19.57,19.53-33.77,34.26-77.34,77.23c-14.42,14.4-34.19,20.14-53.72,21.58l-9.43-.15c-17.78-.27-34.5-7.67-48.13-19.02l-14.94-14.23-75.34-75.1,33-33.85,87.22,87.07c15.99,11.73,37.09,9.5,50.49-3.96l37.38-37.55,42.77-43.32,160.88-161.32c13.25-13.29,14.24-37.42-.56-52.73l-11.32-11.71-33.92-33.9-12.58-12.65-165.83-166.47-36.08-36.43Z" 
                    fill="#f4b125"
                  />
                  <path 
                    d="M88.89,728.97l-.9,6.09c.02.31.06.76,0,1.02l.77,5.11c1.51,5.56,2.56,12.38,7.08,17.01l26.25,26.88,76.31,77.21,14.94,15.34,52.53,53.15,10.3,10.84,50.73,51.06,22.75,23.19c11.85,12.08,37.78,12.38,50.26,0l61.05-60.5,13.52-13.57,11.73-11.3,13.66-13.46,108.82-108.62,11.12-10.98,14.88-14.26,49.31-49.48c13.2-13.25,12.17-34.65.94-49.09l-13.57-13.44-23.28-22.61-27.44-26.53-16.44-15.53-22.86-22.1-30.99-29.93-26.83-26.12-23.32-22.67-34.19-32.68-19.38-18.56-13.46-12.76c-9.65-9.15-13.66-24.55-4.5-35.31l21.99-21.9,28.33-27.64,42.62-41.26,35.37-34.58,36.03-34.99,38.12-36.68,27.73-27.25,31.45-30.41c9.82-9.37,23.21-10.98,34.99-3.59l122.47,122.72,22.9,23.42,63.55,64.02c9.68,9.75,10.43,29.13-.92,40.32l-11.11,10.96-49.26,49.49-14.06,13.48-35.19-35.21,8.61-8.86,14-14.04,34.63-34.3c1.78-1.77-1.01-4.79-2.25-6.03l-32.53-32.4-16.74-17.33-14.01-13.9-19.53-19.61-82.14-82.37c-1.48-1.48-3.48-1.95-5.16-2.61-5.53,3.47-9.71,8.02-14.41,12.51l-18.9,18.06-26.84,26.09-21.39,20.64-35.05,33.84-33.42,32.56-37.11,35.8-35.54,35.19,11.42,12.3,61.51,61.07,12.47,11.81,62.47,62.12,15.38,14.86,51.06,50.62,15.23,14.85c11.2,10.92,18.89,23.62,23.37,38.61l1.77,9.46c1.6,8.58,1.27,17.05-.21,26.02-3.15,19.09-13.39,35.33-27.13,48.63l-23.42,22.66-49.38,48.57-78.88,77.96-133.29,132.16c-16.02,15.89-38.56,21.75-60.48,20.64-23.72-1.2-42.34-13.26-58.58-29.62l-84.95-85.59-13.36-14-142.53-142.77c-16.35-16.37-25.01-33.49-27.67-56.77-2.44-21.33,5.57-48.07,20.37-63.03l68.9-69.66,18.76-18.84,32.65,32.63-56.74,56.61-29.43,30.29c-4.36,4.48-5.99,11.69-6.31,16.89Z" 
                    fill="#f4b125"
                  />
                  <path 
                    d="M552.21,620.47l24.31,23.78,41.46,40.37c6.82,6.64,13.73,13.32,14.44,23.48.42,6.02-.2,13.63-4.85,18.27l-103.8,103.71-36.56,36.39-12.85,12.4-73.51,73.05c-4.36,4.34-8.28,8.72-13.99,11.12-6.95,2.92-16.79,3.04-23.33-.93-9.84-5.98-16.25-14.79-24.24-22.83l-66.59-67.06-13.35-13.93-59.58-60-5.79-6.44-40.03-40.64c-9.56-9.71-7.9-25.28,1.34-34.76l58.67-58.93,34.87,35.12-41.66,41.67,22.61,23.9,49.15,49.63,33.72,34.35,50.68,51.07,8.52,8.63c2.33,2.36,5.53,3.26,8.35.47l29.67-29.3,71.05-70.59,27.87-27.33,65.31-65.02-44.44-43.9-5.83-5.49-77.4-77.1-9.51-8.76-52.2-51.51-38.43-37.55c-14.66-14.32-26.74-30.79-29.52-51.35-1.13-8.35-1.55-15.77-.11-24.22,2.56-14.98,8.11-29.74,18.47-41.79l48.23-49.18,6.55-5.65,45.72-45.09,42.87-42.02,10.76-10.27,40.28-39.64,42.39-41.54,53.4-52.46,30.07-28.83c12.09-11.59,27.4-18.86,44.11-20.64l23.9-.07c16.29,1.47,30.93,8.9,43.47,19.24l24.66,24.26,14.17,14.76,53.75,54.04,21.25,21.94,61.04,61.65,10.88,11.21,5.92,6.08,44.17,44.58,6.58,6.52,23.89,24.95c16.9,17.65,21.99,48.32,16.82,72.23-2.7,13.54-9.47,25-17.39,36.75l-107.26,107.37-33.95-33.59,24.13-24.37,10.92-10.15,55.42-55.22,8.81-8.52c8.87-8.58,14.81-21.21,12.91-33.85-1.31-8.74-4.3-17.38-10.5-23.58l-26.99-27.01-97.95-98.5-8.32-9.01-66.55-67.19-61-61.43c-15.81-10.15-33.96-8.36-47.57,3.95l-26.93,25.93-41.69,41.1-19.82,19.31-48.77,48-35.85,35.11-25.75,25.22-8.04,7.02-39.45,38.39-32.67,32.25-26.89,26.14c-6.84,6.65-13.03,14.07-14.96,23.87-3.31,16.83,1.93,28.18,13.94,39.63l20.49,19.54,25.18,24.7,23.43,22.63,37.5,36.25,20.31,19.78,12.99,12.04,34.46,33.39Z" 
                    fill="#f4b125"
                  />
                  <path 
                    d="M502.01,706.16l-.11,8.48c-1.74,5.85-3.5,12.04-8.24,16.77l-91.79,91.64-26.92,25.76-90.07-90.27,39.3-39.51L59.38,454.29l-8.2-8.26c-16.06-16.18-25.93-46.23-22.42-69.78,2.42-16.24,7.63-32.56,19.49-44.8l48.57-50.09,51.64-52.17,24.86-25.29,53.15-53.53,13.74-14.53,75.41-75.06c12.58-12.52,37.49-21.56,54.99-20.69,19.52.96,41.96,6.21,56.01,20.06l74.18,73.14c3.63,3.58,5.71,8.19,10.23,10.99-4.73,7.48-12.15,12.68-17.11,17.68l-12.92,13.02c-.86.86-2.76.87-3.64.45-.54-.26-.85-1.3-1.61-2.08l-34.78-35.07-35.92-37.08c-13.52-13.95-32.82-19.78-50.96-10.93-7.63,3.72-13.17,10.5-19.18,16.56l-39.73,40.11-14.86,15.33-53.6,54.06-19.33,19.88-58.05,58.56-8.89,9.33-42.96,43.71-12.49,13.6c-8.51,10.66-11.66,24.37-7.44,37.26,2.15,6.58,4.67,12.36,9.84,17.54l179.94,180.22,18.86,19.45,54.97,54.79c2.28,2.27,3.84,4.74,6.97,6,2.43,3.73,5.45,6.38,9.14,9.37l31.86-31.87-55.48-55.77-17.39-17.88-81.99-82.5-10.91-11.42-79.53-80.21c-8.23-8.3-8.84-25.47-.86-33.78l36.81-38.32,51.6-52.14,23.35-23.86,77.53-77.99,13.9-14.35c2.1-2.16,4.75-3.61,6.84-6.13,5.66-6.8,14.56-10.9,23.29-10.02,8.6.87,14.86,4.85,20.58,10.62l22.85,23.05,22.62,22.34,3.22,4.28-34.26,34.23-34.03-33.48c-1.12-1.1-3.91.51-4.91,1.52l-59.28,59.37-10.71,11.39-10.01,9.99-7.01,7.11-75.56,75.96-11.93,12.82,19.8,20.48c2.89,2.99,5.56,5.57,8.56,8.58l58.19,58.52,34.73,35.31,10.97,11.07,61.16,61.51,20.74,21.43,49.19,49.59,32.37,32.44c5.24,5.25,7.22,11.56,8.43,18.2Z" 
                    fill="#f4b125"
                  />
                  <path d="M501.91,714.65l.11-8.48c.56,3.1.86,5.22-.11,8.48Z" fill="#f9d792" />
                </svg>
              </div>

              <div className="product-capsule-label font-logo">SOLD SHOW</div>
              <div className="product-capsule-tag mono">LIVE ON STAGE</div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            LAYER 4: SPLIT SCREEN TYPOGRAPHY ("Built to sell.")
            =================================================================== */}
        <div className="hero-flow-split-container">
          <div ref={splitTextWrapRef} className="hero-flow-split-text">
            <div className="flow-split-badge mono">
              <span className="badge-dot"></span>
              <span>AUTONOMOUS INFRASTRUCTURE</span>
            </div>
            <h2 className="flow-split-title">
              Built to <span className="font-accent">sell</span>.
            </h2>
            <p className="flow-split-desc text-1">
              SoldShow replaces guesswork with autonomous ad iteration, real-time ticket sales attribution, and automated follow-ups — operating 24/7 so you sell out before show day.
            </p>
          </div>
        </div>

        {/* ===================================================================
            LAYER 5: SECTION 2 STAT CARDS (72 Hours, 24/7, 100% Attribution)
            =================================================================== */}
        <div ref={statCardsWrapRef} className="hero-flow-stat-cards-wrapper" id="system">
          <div className="hero-flow-stat-cards-container">
            {statCardsData.map((card, idx) => (
              <div className="numa-stat-card flow-stat-card" key={idx}>
                
                {/* Top Photographic Area with Amber Dot & Value */}
                <div className="numa-stat-card__gradient">
                  <img src={card.image} alt={card.title} className="numa-stat-card__image" />
                  <div className="numa-stat-card__overlay"></div>
                  <div className="numa-stat-card__dot"></div>
                  <div className="numa-stat-card__value">
                    <span className="numa-stat-card__num">{card.num}</span>
                    <span className="numa-stat-card__unit">{card.unit}</span>
                  </div>
                </div>

                {/* Bottom Area */}
                <div className="numa-stat-card__bottom">
                  <h3 className="numa-stat-card__title">{card.title}</h3>
                  <p className="numa-stat-card__desc">{card.desc}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
