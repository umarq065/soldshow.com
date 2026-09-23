import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 7 Sequence Frames per specification
const FRAMES = [
  {
    id: 0,
    tag: '72H',
    line1: 'Last-chance',
    line2: 'rush',
    accent: 'rush',
    body: 'Ticket demand spikes in the final 72 hours. Sold Show is built for that window, with every sequence, variant and link in place before the curve turns.',
    hasCta: false
  },
  {
    id: 1,
    tag: '72H',
    line1: 'The window',
    line2: 'opens',
    accent: 'opens',
    body: 'Reminder sequences go to everyone who registered interest, so the late deciders hear from you before they hear from any other event that weekend.',
    hasCta: false
  },
  {
    id: 2,
    tag: '48H',
    line1: 'No one left',
    line2: 'halfway',
    accent: 'halfway',
    body: 'Buyers who stopped at checkout are brought back automatically, with the exact event and ticket tier they left behind.',
    hasCta: false
  },
  {
    id: 3,
    tag: '24H',
    line1: 'New creative,',
    line2: 'same crowd',
    accent: 'crowd',
    body: 'Last-call ad variants rotate in, built for people who already viewed, clicked or saved your event.',
    hasCta: false
  },
  {
    id: 4,
    tag: '6H',
    line1: 'Final call,',
    line2: 'on time',
    accent: 'time',
    body: 'The last-chance sequence goes out while tickets are still available, not after the moment has passed.',
    hasCta: false
  },
  {
    id: 5,
    tag: 'DOORS',
    line1: 'Every ticket,',
    line2: 'traced',
    accent: 'traced',
    body: 'The live dashboard shows which ad, link and promo code sold each ticket, while there is still time to shift budget.',
    hasCta: false
  },
  {
    id: 6,
    tag: '21D',
    line1: 'Your last 72 hours,',
    line2: 'planned 21 days out',
    accent: 'planned',
    body: 'The rush is predictable. Being ready for it is the work.',
    hasCta: true
  }
];

// Time Rail Stations (Continuous horizontal right-to-left track)
const STATIONS = [
  { label: '72H', sub: 'RUSH STARTS', icon: 'sun' },
  { label: '60H', sub: 'INTEREST ENGAGED', icon: 'spark' },
  { label: '48H', sub: 'CHECKOUT RECOVERY', icon: 'cart' },
  { label: '36H', sub: 'TIER ALLOCATION', icon: 'clock' },
  { label: '24H', sub: 'RETARGETING ROTATION', icon: 'refresh' },
  { label: '18H', sub: 'URGENCY ACCELERATION', icon: 'spark' },
  { label: '12H', sub: 'COUNTDOWN ACTIVE', icon: 'clock' },
  { label: '6H', sub: 'PEAK MOMENTUM', icon: 'peak', isPeak: true },
  { label: '3H', sub: 'INVENTORY CLEARING', icon: 'fire' },
  { label: '1H', sub: 'FINAL PASS', icon: 'ticket' },
  { label: 'DOORS', sub: 'REAL-TIME TRACING', icon: 'door' },
  { label: '21D RUNWAY', sub: 'PLANNED AHEAD', icon: 'flag' }
];

// Milestone coordinates along the SVG 1440x450 bell curve
const CURVE_NODES = [
  { x: 30, y: 390 },
  { x: 160, y: 388 },
  { x: 320, y: 380 },
  { x: 460, y: 355 },
  { x: 570, y: 305 },
  { x: 650, y: 220 },
  { x: 720, y: 110, isPeak: true },
  { x: 790, y: 220 },
  { x: 870, y: 305 },
  { x: 980, y: 355 },
  { x: 1120, y: 380 },
  { x: 1280, y: 388 },
  { x: 1410, y: 390 }
];

export default function Timeline({ onOpenTeardown }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const graphStageRef = useRef(null);
  const railTrackRef = useRef(null);
  const curvePathRef = useRef(null);
  const activeStrokeRef = useRef(null);
  const amberDotRef = useRef(null);
  const dotHaloRef = useRef(null);
  const peakBadgeRef = useRef(null);
  const slidesRef = useRef([]);

  // Steps Flow Refs
  const stepsStageRef = useRef(null);
  const stepsTitleRef = useRef(null);
  const stepsCardsStageRef = useRef(null);
  const stepsCardsGridRef = useRef(null);
  const cardsRef = useRef([]);
  const cardImagesRef = useRef([]);
  const cardBadgesRef = useRef([]);

  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  // Station icon renderer
  const renderStationIcon = (type) => {
    switch (type) {
      case 'sun':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'cart':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        );
      case 'refresh':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
        );
      case 'peak':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 2L1 21h22L12 2zm0 4.2l7.53 13H4.47L12 6.2z"/>
            <circle cx="12" cy="15" r="2"/>
          </svg>
        );
      case 'fire':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12 23c-4.97 0-9-4.03-9-9 0-3.38 2.05-6.57 5.12-8.08.38-.19.84-.04 1.04.34.2.38.05.84-.33 1.04C6.27 8.57 4.7 11.19 4.7 14c0 4.03 3.27 7.3 7.3 7.3s7.3-3.27 7.3-7.3c0-2.34-1.12-4.57-3.03-5.99-.34-.25-.42-.72-.17-1.06.25-.34.72-.42 1.06-.17C19.46 8.42 20.8 11.1 20.8 14c0 4.97-4.03 9-9 9z"/>
          </svg>
        );
      case 'ticket':
      case 'door':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-9 7.5h-2v-2h2v2zm0-4.5h-2v-2h2v2zm0-4.5h-2v-2h2v2z"/>
          </svg>
        );
      case 'flag':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const graphStage = graphStageRef.current;
    const railTrack = railTrackRef.current;
    const curvePath = curvePathRef.current;
    const amberDot = amberDotRef.current;
    const dotHalo = dotHaloRef.current;
    const peakBadge = peakBadgeRef.current;
    const activeStroke = activeStrokeRef.current;
    const stepsTitle = stepsTitleRef.current;
    const stepsCardsStage = stepsCardsStageRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const cardImages = cardImagesRef.current.filter(Boolean);
    const cardBadges = cardBadgesRef.current.filter(Boolean);

    if (!section || !railTrack || !curvePath || !amberDot || !graphStage) return;

    let pathLength = 0;
    try {
      pathLength = curvePath.getTotalLength();
    } catch {
      pathLength = 1600;
    }

    if (activeStroke) {
      activeStroke.style.strokeDasharray = `${pathLength}`;
      activeStroke.style.strokeDashoffset = `${pathLength}`;
    }

    const ctx = gsap.context(() => {
      // Calculate dynamic rail translation
      const stations = railTrack.querySelectorAll('.axis-time-col');
      const firstStation = stations[0];
      const lastStation = stations[stations.length - 1];

      const getRailMetrics = () => {
        const containerWidth = section.clientWidth;
        const firstCenter = firstStation ? firstStation.offsetLeft + firstStation.offsetWidth / 2 : 0;
        const lastCenter = lastStation ? lastStation.offsetLeft + lastStation.offsetWidth / 2 : railTrack.scrollWidth;
        const startX = containerWidth / 2 - firstCenter;
        const endX = containerWidth / 2 - lastCenter;
        return { startX, endX, totalShift: startX - endX };
      };

      const metrics = getRailMetrics();

      // Master Unified Pinned Scrub Timeline (Graph -> Steps flow)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=6400',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // Graph is active from p = 0 to p = 0.54
            const gp = Math.min(1, p / 0.54);

            // 1. Advance Amber Dot mathematically along SVG curve
            let curveP = 0;
            if (gp <= 0.16) {
              curveP = gsap.utils.interpolate(0.02, 0.18, gp / 0.16);
            } else if (gp <= 0.38) {
              curveP = gsap.utils.interpolate(0.18, 0.35, (gp - 0.16) / 0.22);
            } else if (gp <= 0.54) {
              curveP = gsap.utils.interpolate(0.35, 0.45, (gp - 0.38) / 0.16);
            } else if (gp <= 0.70) {
              curveP = gsap.utils.interpolate(0.45, 0.50, (gp - 0.54) / 0.16);
            } else if (gp <= 0.86) {
              curveP = gsap.utils.interpolate(0.50, 0.78, (gp - 0.70) / 0.16);
            } else {
              curveP = gsap.utils.interpolate(0.78, 0.98, (gp - 0.86) / 0.14);
            }

            const targetLength = Math.max(0, Math.min(pathLength, curveP * pathLength));
            const point = curvePath.getPointAtLength(targetLength);

            amberDot.setAttribute('cx', point.x);
            amberDot.setAttribute('cy', point.y);
            if (dotHalo) {
              dotHalo.setAttribute('cx', point.x);
              dotHalo.setAttribute('cy', point.y);
            }

            // Traced curve glow line
            if (activeStroke) {
              activeStroke.style.strokeDashoffset = `${pathLength - targetLength}`;
            }

            // Determine active frame index
            let frameIdx = 0;
            if (gp < 0.14) frameIdx = 0;
            else if (gp < 0.28) frameIdx = 1;
            else if (gp < 0.44) frameIdx = 2;
            else if (gp < 0.58) frameIdx = 3;
            else if (gp < 0.74) frameIdx = 4;
            else if (gp < 0.88) frameIdx = 5;
            else frameIdx = 6;

            setActiveFrameIndex(frameIdx);

            // Highlight stations near center
            stations.forEach((stn) => {
              const rect = stn.getBoundingClientRect();
              const centerDist = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);
              if (centerDist < 90 && p < 0.56) {
                stn.classList.add('is-centered');
              } else {
                stn.classList.remove('is-centered');
              }
            });

            // Pulse peak badge when near 6H peak frame
            if (peakBadge) {
              const isPeakActive = (frameIdx === 4 || (gp >= 0.60 && gp <= 0.76)) && p < 0.56;
              if (isPeakActive) {
                peakBadge.classList.add('is-peak-active');
              } else {
                peakBadge.classList.remove('is-peak-active');
              }
            }
          }
        }
      });

      // ==========================================
      // STAGE A: GRAPH SCRUB (0.0 -> 0.54)
      // ==========================================

      // 1. Continuous Right-to-Left Rail Translation
      tl.fromTo(
        railTrack,
        { x: metrics.startX },
        { x: metrics.endX, ease: 'none', duration: 0.54 },
        0
      );

      // 2. 7-Frame Slide Crossfades within Graph Phase
      const frameWindows = [
        { fadeIn: null, fadeOut: [0.06, 0.09] },           // Frame 0: starts visible
        { fadeIn: [0.07, 0.10], fadeOut: [0.15, 0.18] },   // Frame 1
        { fadeIn: [0.16, 0.19], fadeOut: [0.24, 0.27] },   // Frame 2
        { fadeIn: [0.25, 0.28], fadeOut: [0.33, 0.36] },   // Frame 3
        { fadeIn: [0.34, 0.37], fadeOut: [0.42, 0.45] },   // Frame 4 (6H Peak)
        { fadeIn: [0.43, 0.46], fadeOut: [0.49, 0.52] },   // Frame 5 (DOORS)
        { fadeIn: [0.50, 0.53], fadeOut: null }            // Frame 6 (Closing CTA)
      ];

      slidesRef.current.forEach((slide, idx) => {
        if (!slide) return;
        const w = frameWindows[idx];

        if (idx === 0) {
          gsap.set(slide, { opacity: 1, y: 0, pointerEvents: 'auto' });
          tl.to(
            slide,
            { opacity: 0, y: -20, duration: w.fadeOut[1] - w.fadeOut[0], ease: 'power2.in', pointerEvents: 'none' },
            w.fadeOut[0]
          );
        } else if (idx === 6) {
          gsap.set(slide, { opacity: 0, y: 20, pointerEvents: 'none' });
          tl.to(
            slide,
            { opacity: 1, y: 0, duration: w.fadeIn[1] - w.fadeIn[0], ease: 'power2.out', pointerEvents: 'auto' },
            w.fadeIn[0]
          );
        } else {
          gsap.set(slide, { opacity: 0, y: 20, pointerEvents: 'none' });
          tl.to(
            slide,
            { opacity: 1, y: 0, duration: w.fadeIn[1] - w.fadeIn[0], ease: 'power2.out', pointerEvents: 'auto' },
            w.fadeIn[0]
          ).to(
            slide,
            { opacity: 0, y: -20, duration: w.fadeOut[1] - w.fadeOut[0], ease: 'power2.in', pointerEvents: 'none' },
            w.fadeOut[0]
          );
        }
      });

      // ==========================================
      // STAGE B: GRAPH DISSOLVES -> "START IN 3 SIMPLE STEPS" ENTERS (0.56 -> 0.66)
      // ==========================================

      // Graph stage smoothly fades out and elevates slightly into distance
      tl.to(graphStage, {
        opacity: 0,
        y: -40,
        scale: 0.95,
        filter: 'blur(8px)',
        duration: 0.08,
        ease: 'power2.inOut',
        pointerEvents: 'none'
      }, 0.56);

      // Centered headline "Start in 3 simple steps" scales in smoothly
      tl.fromTo(stepsTitle, 
        { opacity: 0, scale: 0.88, y: 35, filter: 'blur(6px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.08, ease: 'power2.out' },
        0.58
      );

      // Dwell on "Start in 3 simple steps" alone in the center: 0.66 -> 0.72

      // ==========================================
      // STAGE C: CARDS GLIDE UP WITH 3D DEPTH & STAGGER (0.72 -> 0.88)
      // ==========================================

      // Headline smoothly lifts and dissolves as cards arrive
      tl.to(stepsTitle, {
        opacity: 0,
        y: -40,
        scale: 0.96,
        duration: 0.06,
        ease: 'power2.in'
      }, 0.72);

      // Cards stage rises from below
      tl.fromTo(stepsCardsStage,
        { opacity: 0, yPercent: 120 },
        { opacity: 1, yPercent: 0, duration: 0.16, ease: 'power2.out', pointerEvents: 'auto' },
        0.72
      );

      // Individual cards staggered 3D rise
      if (cards.length >= 3) {
        tl.fromTo(cards[0], 
          { yPercent: 35, rotation: -1.5, scale: 0.94 }, 
          { yPercent: 0, rotation: 0, scale: 1, duration: 0.14, ease: 'power2.out' }, 
          0.73
        );
        tl.fromTo(cards[1], 
          { yPercent: 45, rotation: 0, scale: 0.94 }, 
          { yPercent: 0, rotation: 0, scale: 1, duration: 0.14, ease: 'power2.out' }, 
          0.75
        );
        tl.fromTo(cards[2], 
          { yPercent: 55, rotation: 1.5, scale: 0.94 }, 
          { yPercent: 0, rotation: 0, scale: 1, duration: 0.14, ease: 'power2.out' }, 
          0.77
        );
      }

      // Parallax image zoom effect inside cards
      if (cardImages.length > 0) {
        tl.fromTo(cardImages, 
          { scale: 1.18 }, 
          { scale: 1.0, duration: 0.14, ease: 'power2.out' }, 
          0.74
        );
      }

      // Circular step badges pop with spring
      if (cardBadges.length > 0) {
        tl.fromTo(cardBadges, 
          { scale: 0.4, opacity: 0 }, 
          { scale: 1.0, opacity: 1, stagger: 0.02, duration: 0.08, ease: 'back.out(2)' }, 
          0.78
        );
      }

      // On mobile screens (< 992px), scrub the 3 steps cards horizontally to the left!
      if (window.innerWidth <= 991 && stepsCardsGridRef.current) {
        tl.to(stepsCardsGridRef.current, {
          x: () => -(window.innerWidth * 0.82 * 2 + 32),
          ease: 'none',
          duration: 0.16
        }, 0.84);
      }

      // Settled plateau: 0.88 -> 1.0 (cards fully cover the section)

      // Recalculate on window resize
      const handleResize = () => {
        const updated = getRailMetrics();
        gsap.set(railTrack, { x: gsap.utils.interpolate(updated.startX, updated.endX, tl.scrollTrigger ? tl.scrollTrigger.progress : 0) });
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section timeline-numa-section" id="timeline" ref={sectionRef}>
      <div className="timeline-numa-container" ref={containerRef}>
        
        {/* =========================================================================
            STAGE 1: GRAPH & TIME RAIL STAGE
            ========================================================================= */}
        <div className="timeline-graph-stage" ref={graphStageRef}>
          {/* Top Fixed Time Indicator Pointer */}
          <div className="timeline-axis-pointer-wrap">
            <div className="axis-peak-triangle" />
            <div className="axis-pointer-line" />
          </div>

          {/* Top Continuous Horizontal Scrolling Time Rail */}
          <div className="timeline-numa-axis-viewport">
            <div className="timeline-rail-scroll-track" ref={railTrackRef}>
              {STATIONS.map((stn, idx) => (
                <div 
                  key={idx} 
                  className={`axis-time-col ${stn.isPeak ? 'axis-time-col--peak' : ''}`}
                >
                  <div className="axis-time-label-wrap">
                    <span className="axis-time-label">{stn.label}</span>
                    <span className="axis-time-sub">{stn.sub}</span>
                  </div>
                  
                  {/* 4 Intermediate Tick Lines */}
                  <div className="axis-tick-group">
                    <span className="axis-subtick" />
                    <span className="axis-subtick" />
                    <span className="axis-subtick axis-subtick--mid" />
                    <span className="axis-subtick" />
                  </div>

                  <div className={`axis-time-icon ${stn.isPeak ? 'axis-time-icon--peak' : ''}`}>
                    {renderStationIcon(stn.icon)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Stage: Dynamic Crossfading Frames + Bell Curve Mountain + Amber Dot */}
          <div className="timeline-numa-stage">
            
            {/* Circular Amber Peak Badge at the Apex (6H Frame 4 Highlight) */}
            <div className="timeline-peak-badge" ref={peakBadgeRef}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#FFC233" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="7"/>
                <line x1="16" y1="16" x2="21" y2="21"/>
                <line x1="11" y1="8" x2="11" y2="14"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
            </div>

            {/* 7 Typography Frames (Blauer Nue Headline + Abygaer Accent Word) */}
            <div className="timeline-numa-text-overlay">
              {FRAMES.map((f, idx) => (
                <div 
                  key={f.id} 
                  className="timeline-frame-slide"
                  ref={(el) => (slidesRef.current[idx] = el)}
                >
                  <div className="timeline-numa-big-text">
                    <span className="headline-line1">{f.line1}</span>
                    <span className="headline-line2">
                      {f.line2.includes(f.accent) ? (
                        <>
                          {f.line2.split(f.accent)[0]}
                          <span className="font-accent">{f.accent}</span>
                          {f.line2.split(f.accent)[1]}
                        </>
                      ) : (
                        f.line2
                      )}
                    </span>
                  </div>

                  <div className="timeline-numa-caption">
                    <p>{f.body}</p>
                  </div>

                  {f.hasCta && (
                    <div className="timeline-cta-wrap">
                      <button 
                        className="btn btn--primary timeline-cta-btn" 
                        onClick={onOpenTeardown}
                      >
                        <span>Get a free teardown</span>
                        <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* SVG Bell Curve Wave Mountain with Moving Amber Dot & Traced Glow */}
            <svg 
              className="timeline-wave-svg" 
              viewBox="0 0 1440 450" 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="wave-mountain-amber-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFC233" stopOpacity="0.28" />
                  <stop offset="55%" stopColor="#FFD466" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#FFF2D1" stopOpacity="0.01" />
                </linearGradient>
                <linearGradient id="active-stroke-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFC233" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FFB300" stopOpacity="1" />
                </linearGradient>
                <filter id="amber-dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Filled Mountain Area Under Curve */}
              <path 
                d="M 0 390 
                   C 220 390, 380 380, 500 340 
                   C 600 300, 670 190, 720 110 
                   C 770 190, 840 300, 940 340 
                   C 1060 380, 1220 390, 1440 390 
                   L 1440 450 L 0 450 Z" 
                fill="url(#wave-mountain-amber-grad)" 
              />

              {/* Base Subtle Curve Line */}
              <path 
                ref={curvePathRef}
                d="M 0 390 
                   C 220 390, 380 380, 500 340 
                   C 600 300, 670 190, 720 110 
                   C 770 190, 840 300, 940 340 
                   C 1060 380, 1220 390, 1440 390" 
                fill="none" 
                stroke="rgba(255, 194, 51, 0.45)" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />

              {/* Highlighted Tracing Stroke following Amber Dot */}
              <path 
                ref={activeStrokeRef}
                d="M 0 390 
                   C 220 390, 380 380, 500 340 
                   C 600 300, 670 190, 720 110 
                   C 770 190, 840 300, 940 340 
                   C 1060 380, 1220 390, 1440 390" 
                fill="none" 
                stroke="url(#active-stroke-grad)" 
                strokeWidth="4" 
                strokeLinecap="round" 
              />

              {/* Milestone Node Dots along Path */}
              {CURVE_NODES.map((node, idx) => (
                <circle 
                  key={idx}
                  cx={node.x} 
                  cy={node.y} 
                  r={node.isPeak ? 7.5 : 4.5} 
                  fill={node.isPeak ? "#FFC233" : "#0B0D09"} 
                  stroke="#FFC233" 
                  strokeWidth={node.isPeak ? 2.5 : 1.5} 
                  className="curve-node-dot"
                />
              ))}

              {/* Outer Glowing Pulsing Halo around Moving Dot */}
              <circle 
                ref={dotHaloRef}
                cx="30" 
                cy="390" 
                r="16" 
                fill="rgba(255, 194, 51, 0.28)" 
                stroke="rgba(255, 194, 51, 0.6)" 
                strokeWidth="1.5"
                className="timeline-dot-halo"
              />

              {/* Advancing Amber Dot */}
              <circle 
                ref={amberDotRef}
                cx="30" 
                cy="390" 
                r="6.5" 
                fill="#FFC233" 
                stroke="#0B0D09" 
                strokeWidth="2" 
                filter="url(#amber-dot-glow)"
                className="timeline-advancing-amber-dot"
              />
            </svg>

          </div>
        </div>

        {/* =========================================================================
            STAGE 2: "START IN 3 SIMPLE STEPS" & 3D CARDS GLIDE (Animated Flow)
            ========================================================================= */}
        <div className="timeline-steps-flow-stage" id="how-it-works" ref={stepsStageRef}>
          
          {/* Centered Luxury Headline */}
          <div className="timeline-steps-title-wrap" ref={stepsTitleRef}>
            <h2 className="timeline-steps-headline">
              Start in 3 simple <span className="font-accent">steps</span>
            </h2>
          </div>

          {/* 3 Step Cards that rise with staggered 3D depth */}
          <div className="timeline-steps-cards-stage" ref={stepsCardsStageRef}>
            <div className="timeline-steps-cards-grid" ref={stepsCardsGridRef}>
              
              {/* Step 1: Book the audit */}
              <div className="steps__numa-card" ref={(el) => (cardsRef.current[0] = el)}>
                <div className="steps__numa-card-img">
                  <img 
                    src="/assets/conference.jpg" 
                    alt="Book the audit" 
                    className="image__img" 
                    ref={(el) => (cardImagesRef.current[0] = el)} 
                  />
                </div>
                <div className="steps__numa-card-text">
                  <div className="steps__card-top-text">
                    <div className="steps__card-icon mono" ref={(el) => (cardBadgesRef.current[0] = el)}>01</div>
                    <h3 className="steps__card-title">Book the audit</h3>
                  </div>
                  <p className="steps__card-desc">
                    We review your ticketing, ads, and last event's numbers before anything gets built.
                  </p>
                </div>
              </div>

              {/* Step 2: System goes live */}
              <div className="steps__numa-card" ref={(el) => (cardsRef.current[1] = el)}>
                <div className="steps__numa-card-img">
                  <img 
                    src="/assets/concert.jpg" 
                    alt="System goes live" 
                    className="image__img" 
                    ref={(el) => (cardImagesRef.current[1] = el)} 
                  />
                </div>
                <div className="steps__numa-card-text">
                  <div className="steps__card-top-text">
                    <div className="steps__card-icon mono" ref={(el) => (cardBadgesRef.current[1] = el)}>02</div>
                    <h3 className="steps__card-title">System goes live</h3>
                  </div>
                  <p className="steps__card-desc">
                    Your creative, tracked page, and sequences launch within 72 hours of sign-off.
                  </p>
                </div>
              </div>

              {/* Step 3: It starts selling */}
              <div className="steps__numa-card" ref={(el) => (cardsRef.current[2] = el)}>
                <div className="steps__numa-card-img">
                  <img 
                    src="/assets/nightlife.jpg" 
                    alt="It starts selling" 
                    className="image__img" 
                    ref={(el) => (cardImagesRef.current[2] = el)} 
                  />
                </div>
                <div className="steps__numa-card-text">
                  <div className="steps__card-top-text">
                    <div className="steps__card-icon mono" ref={(el) => (cardBadgesRef.current[2] = el)}>03</div>
                    <h3 className="steps__card-title">It starts selling</h3>
                  </div>
                  <p className="steps__card-desc">
                    The system runs and reports automatically while you focus on your event.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
