import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const stRef = useRef(null);
  
  // Phone refs
  const phone1Ref = useRef(null);
  const phone2Ref = useRef(null);
  const phone3Ref = useRef(null);

  // Card refs
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  const tabs = [
    {
      id: 'tab-1',
      stepNum: '01',
      title: 'Live attribution',
      tag: 'REAL-TIME ATTRIBUTION',
      subtitle: 'The system syncs every channel and shows ticket count, spend, and cost per ticket in real time without manual checking.',
      chips: ['3,842 Tickets Sold', 'Auto-Sync Active'],
      image: '/assets/dashboard-screen.png'
    },
    {
      id: 'tab-2',
      stepNum: '02',
      title: "Everything's on track",
      tag: 'SYSTEM HEALTH & MONITORING',
      subtitle: "The system gently notifies you of important points. Low conversion, sudden fluctuations in CPT, inventory pace — you will find out everything on time and without too much noise.",
      chips: ['98.6% Health Score', '0ms Page Lag'],
      image: '/assets/dashboard-screen.png'
    },
    {
      id: 'tab-3',
      stepNum: '03',
      title: 'Client access',
      tag: 'STAKEHOLDER PORTAL',
      subtitle: 'Give your promoter team or clients direct access to the live attribution feed. No static PDF reports or waiting on weekly updates.',
      chips: ['4 Online Viewers', 'Live Telemetry Link'],
      image: '/assets/dashboard-screen.png'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: Smooth Pinned Scroll Stack (>= 992px)
      mm.add('(min-width: 992px)', () => {
        gsap.set(phone1Ref.current, { yPercent: 0, opacity: 1, scale: 1 });
        gsap.set(card1Ref.current, { yPercent: 0, opacity: 1, scale: 1 });

        gsap.set(phone2Ref.current, { yPercent: 110, opacity: 1, scale: 0.98 });
        gsap.set(card2Ref.current, { yPercent: 110, opacity: 1, scale: 0.98 });

        gsap.set(phone3Ref.current, { yPercent: 110, opacity: 1, scale: 0.98 });
        gsap.set(card3Ref.current, { yPercent: 110, opacity: 1, scale: 0.98 });

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=2800',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.35) setActiveTab(0);
              else if (p < 0.70) setActiveTab(1);
              else setActiveTab(2);
            }
          }
        });

        // Stage 1 Dwell
        masterTl.to({}, { duration: 0.15 });

        // Transition 1 -> 2
        masterTl
          .to(phone1Ref.current, { yPercent: -14, scale: 0.96, opacity: 0.45, ease: 'power1.inOut', duration: 0.30 }, 0.15)
          .to(card1Ref.current, { yPercent: -14, scale: 0.96, opacity: 0.45, ease: 'power1.inOut', duration: 0.30 }, 0.15)
          .to(phone2Ref.current, { yPercent: 0, scale: 1, opacity: 1, ease: 'power1.inOut', duration: 0.30 }, 0.15)
          .to(card2Ref.current, { yPercent: 0, scale: 1, opacity: 1, ease: 'power1.inOut', duration: 0.30 }, 0.15);

        // Stage 2 Dwell
        masterTl.to({}, { duration: 0.10 });

        // Transition 2 -> 3
        masterTl
          .to(phone2Ref.current, { yPercent: -14, scale: 0.96, opacity: 0.45, ease: 'power1.inOut', duration: 0.30 }, 0.55)
          .to(card2Ref.current, { yPercent: -14, scale: 0.96, opacity: 0.45, ease: 'power1.inOut', duration: 0.30 }, 0.55)
          .to(phone3Ref.current, { yPercent: 0, scale: 1, opacity: 1, ease: 'power1.inOut', duration: 0.30 }, 0.55)
          .to(card3Ref.current, { yPercent: 0, scale: 1, opacity: 1, ease: 'power1.inOut', duration: 0.30 }, 0.55);

        // Stage 3 Dwell
        masterTl.to({}, { duration: 0.15 });

        stRef.current = masterTl.scrollTrigger;
      });

      // MOBILE & TABLET (< 992px): Interactive clean tabs
      mm.add('(max-width: 991px)', () => {
        const phones = [phone1Ref.current, phone2Ref.current, phone3Ref.current];
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
        phones.forEach((p, idx) => {
          if (!p) return;
          gsap.set(p, { 
            yPercent: 0, 
            scale: 1, 
            opacity: idx === 0 ? 1 : 0, 
            display: idx === 0 ? 'block' : 'none' 
          });
        });
        cards.forEach((c, idx) => {
          if (!c) return;
          gsap.set(c, { 
            yPercent: 0, 
            scale: 1, 
            opacity: idx === 0 ? 1 : 0, 
            display: idx === 0 ? 'block' : 'none' 
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePillClick = (idx) => {
    setActiveTab(idx);
    if (window.innerWidth >= 992) {
      if (stRef.current && window.lenis) {
        const st = stRef.current;
        const targets = [0.08, 0.50, 0.90];
        const targetScroll = st.start + targets[idx] * (st.end - st.start);
        window.lenis.scrollTo(targetScroll, { duration: 0.8 });
      }
    } else {
      // Mobile crossfade
      const phones = [phone1Ref.current, phone2Ref.current, phone3Ref.current];
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
      phones.forEach((p, i) => {
        if (!p) return;
        if (i === idx) {
          gsap.set(p, { display: 'block' });
          gsap.to(p, { opacity: 1, duration: 0.3 });
        } else {
          gsap.to(p, { opacity: 0, duration: 0.2, onComplete: () => gsap.set(p, { display: 'none' }) });
        }
      });
      cards.forEach((c, i) => {
        if (!c) return;
        if (i === idx) {
          gsap.set(c, { display: 'block' });
          gsap.to(c, { opacity: 1, duration: 0.3 });
        } else {
          gsap.to(c, { opacity: 0, duration: 0.2, onComplete: () => gsap.set(c, { display: 'none' }) });
        }
      });
    }
  };

  // Helper to render individual phone with clean screen image
  const renderPhoneMockup = (tab, ref, zIdx) => (
    <div ref={ref} className="numa-phone-stack-item" style={{ zIndex: zIdx }}>
      <div className="numa-phone-outer numa-phone-outer--clean">
        <img 
          src={tab.image} 
          alt={tab.title} 
          className="numa-phone-mockup-img" 
        />
      </div>
    </div>
  );

  // Helper to render individual right-column card
  const renderCardItem = (tab, ref, zIdx) => (
    <div ref={ref} className="numa-card-stack-item" style={{ zIndex: zIdx }}>
      <div className="numa-card-content">
        <div className="numa-card-top-badge">
          <span className="numa-card-amber-dot"></span>
          <span className="numa-card-tag mono">{tab.tag}</span>
        </div>

        <h3 className="numa-card-title">{tab.title}</h3>
        <p className="numa-card-desc">{tab.subtitle}</p>

        <div className="numa-card-chips">
          {tab.chips.map((chip, cIdx) => (
            <span key={cIdx} className="numa-card-chip mono">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section ref={containerRef} className="section dashboard-numa-section" id="dashboard">
      <div className="dashboard-numa-container">
        
        {/* Left Column: Heading + App Badges */}
        <div className="dashboard-numa-col-left">
          <h2 className="dashboard-numa-title">
            Managed<br />in one <span className="font-accent">dashboard</span>
          </h2>

          <div className="dashboard-numa-badges">
            <div className="badge-pill">
              <svg className="badge-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 7.17c.61-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.63 1.34-.56.65-1.04 1.71-.91 2.73 1.01.08 2.02-.48 2.61-1.22z"/>
              </svg>
              <svg className="badge-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993 0 .5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.0833 12 8.0833s-3.5902.3283-5.1368.8664L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Center Column: Realistic Layered iPhone Stack that slides up on scroll */}
        <div className="dashboard-numa-col-center">
          <div className="numa-phone-stack-stage">
            {renderPhoneMockup(tabs[0], phone1Ref, 1)}
            {renderPhoneMockup(tabs[1], phone2Ref, 2)}
            {renderPhoneMockup(tabs[2], phone3Ref, 3)}
          </div>
        </div>

        {/* Right Column: Layered Cards with Interactive Navigation Pills */}
        <div className="dashboard-numa-col-right">
          {/* Quick Nav Indicators */}
          <div className="dashboard-numa-pill-nav">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                type="button"
                className={`dashboard-nav-pill ${activeTab === idx ? 'is-active' : ''}`}
                onClick={() => handlePillClick(idx)}
              >
                <span className="pill-dot"></span>
                <span>{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Stacked Cards Stage matching Phone Scrub Animation */}
          <div className="numa-card-stack-viewport">
            {renderCardItem(tabs[0], card1Ref, 1)}
            {renderCardItem(tabs[1], card2Ref, 2)}
            {renderCardItem(tabs[2], card3Ref, 3)}
          </div>
        </div>

      </div>
    </section>
  );
}
