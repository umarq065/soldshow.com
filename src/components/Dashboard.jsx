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
      phoneTitle: 'Live Attribution',
      phoneSubtitle: 'Live tracking of your ticket sales',
      statLabel: 'Tickets Sold',
      statValue: '3,842',
      statUnit: 'tix',
      statDelta: '+38.4% vs last event',
      chartPath: 'M 0 18 Q 20 14, 40 16 T 70 8 Q 85 4, 100 6',
      meta1: 'Meta Ads (12 Variants)',
      meta1Val: '1,940 tix • $3.80 CPT',
      meta2: 'Automated Sequences',
      meta2Val: '1,060 tix • $0.48 CPT',
      navActive: 'main',
      recent: [
        { name: '4x Tier 1 VIP ($480)', time: '2:15 PM' },
        { name: '2x General Entry ($90)', time: '2:20 PM' },
        { name: '3x All-Access Pass ($1,350)', time: '3:30 PM' }
      ]
    },
    {
      id: 'tab-2',
      stepNum: '02',
      title: "Everything's on track",
      tag: 'SYSTEM HEALTH & MONITORING',
      subtitle: "The system gently notifies you of important points. Low conversion, sudden fluctuations in CPT, inventory pace — you will find out everything on time and without too much noise.",
      chips: ['98.6% Health Score', '0ms Page Lag'],
      phoneTitle: "Everything's On Track",
      phoneSubtitle: 'All key indicators are within optimal range',
      statLabel: 'Campaign Health',
      statValue: '98.6%',
      statUnit: 'score',
      statDelta: 'All systems operational',
      chartPath: 'M 0 16 Q 25 15, 50 14 T 80 10 Q 90 8, 100 9',
      meta1: 'Ticket Page Uptime',
      meta1Val: '100% • 0ms lag',
      meta2: 'Tracking Accuracy',
      meta2Val: '99.4% server-side verified',
      navActive: 'monitor',
      recent: [
        { name: 'Pixel & CAPI verified', time: '12:00 PM' },
        { name: 'Checkout funnel optimal', time: '1:15 PM' },
        { name: '4 Sequences active', time: '2:45 PM' }
      ]
    },
    {
      id: 'tab-3',
      stepNum: '03',
      title: 'Client access',
      tag: 'STAKEHOLDER PORTAL',
      subtitle: 'Give your promoter team or clients direct access to the live attribution feed. No static PDF reports or waiting on weekly updates.',
      chips: ['4 Online Viewers', 'Live Telemetry Link'],
      phoneTitle: 'Client & Team Access',
      phoneSubtitle: 'Live multi-stakeholder dashboard',
      statLabel: 'Active Viewers',
      statValue: '4',
      statUnit: 'online',
      statDelta: 'Promoters & Stakeholders',
      chartPath: 'M 0 19 Q 30 17, 55 12 T 85 8 Q 92 6, 100 7',
      meta1: 'Promoter Link',
      meta1Val: 'soldshow.com/live/e39',
      meta2: 'Permissions',
      meta2Val: 'View-only • Live telemetry',
      navActive: 'team',
      recent: [
        { name: 'Promoter joined feed', time: '10:15 AM' },
        { name: 'Report exported to CSV', time: '11:40 AM' },
        { name: 'Finance link synced', time: '1:00 PM' }
      ]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial positions
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
          end: '+=3200',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.35) {
              setActiveTab(0);
            } else if (p < 0.68) {
              setActiveTab(1);
            } else {
              setActiveTab(2);
            }
          }
        }
      });

      // -------------------------------------------------------------
      // STAGE 1 REST (0.00 -> 0.15)
      // -------------------------------------------------------------
      masterTl.to({}, { duration: 0.15 });

      // -------------------------------------------------------------
      // TRANSITION 1 -> 2: Phone 2 & Card 2 rise from below (0.15 -> 0.45)
      // -------------------------------------------------------------
      masterTl
        // Phone 1 recedes slightly up
        .to(phone1Ref.current, {
          yPercent: -14,
          scale: 0.96,
          opacity: 0.45,
          ease: 'power1.inOut',
          duration: 0.30
        }, 0.15)
        // Card 1 recedes slightly up
        .to(card1Ref.current, {
          yPercent: -14,
          scale: 0.96,
          opacity: 0.45,
          ease: 'power1.inOut',
          duration: 0.30
        }, 0.15)
        // Phone 2 rises into view over Phone 1
        .to(phone2Ref.current, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          ease: 'power1.inOut',
          duration: 0.30
        }, 0.15)
        // Card 2 rises into view over Card 1
        .to(card2Ref.current, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          ease: 'power1.inOut',
          duration: 0.30
        }, 0.15);

      // -------------------------------------------------------------
      // STAGE 2 REST (0.45 -> 0.55)
      // -------------------------------------------------------------
      masterTl.to({}, { duration: 0.10 });

      // -------------------------------------------------------------
      // TRANSITION 2 -> 3: Phone 3 & Card 3 rise from below (0.55 -> 0.85)
      // -------------------------------------------------------------
      masterTl
        // Phone 2 recedes slightly up
        .to(phone2Ref.current, {
          yPercent: -14,
          scale: 0.96,
          opacity: 0.45,
          ease: 'power1.inOut',
          duration: 0.30
        }, 0.55)
        // Card 2 recedes slightly up
        .to(card2Ref.current, {
          yPercent: -14,
          scale: 0.96,
          opacity: 0.45,
          ease: 'power1.inOut',
          duration: 0.30
        }, 0.55)
        // Phone 3 rises into view over Phone 2
        .to(phone3Ref.current, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          ease: 'power1.inOut',
          duration: 0.30
        }, 0.55)
        // Card 3 rises into view over Card 2
        .to(card3Ref.current, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          ease: 'power1.inOut',
          duration: 0.30
        }, 0.55);

      // -------------------------------------------------------------
      // STAGE 3 REST (0.85 -> 1.00)
      // -------------------------------------------------------------
      masterTl.to({}, { duration: 0.15 });

      stRef.current = masterTl.scrollTrigger;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePillClick = (idx) => {
    setActiveTab(idx);
    if (stRef.current && window.lenis) {
      const st = stRef.current;
      const targets = [0.08, 0.50, 0.90];
      const targetScroll = st.start + targets[idx] * (st.end - st.start);
      window.lenis.scrollTo(targetScroll, { duration: 0.8 });
    }
  };

  // Helper to render individual phone screen
  const renderPhoneMockup = (tab, ref, zIdx) => (
    <div ref={ref} className="numa-phone-stack-item" style={{ zIndex: zIdx }}>
      <div className="numa-phone-outer">
        {/* Dynamic Island */}
        <div className="numa-phone-island"></div>
        
        {/* iOS Screen */}
        <div className="numa-phone-screen">
          {/* Status Bar */}
          <div className="phone-statusbar">
            <span className="phone-time">9:41</span>
            <div className="phone-icons">
              <span className="phone-signal">••••</span>
              <span className="phone-wifi">WiFi</span>
              <span className="phone-battery">100%</span>
            </div>
          </div>

          {/* App Header */}
          <div className="phone-app-header">
            <h4 className="phone-screen-title">{tab.phoneTitle}</h4>
            <p className="phone-screen-sub">{tab.phoneSubtitle}</p>
            <div className="phone-live-indicator">
              <span className="phone-live-dot"></span>
              <span>Updated just now</span>
            </div>
          </div>

          {/* Content */}
          <div className="phone-app-content">
            {/* Stat Card */}
            <div className="phone-metric-box">
              <div className="phone-metric-meta">
                <span className="phone-metric-label">{tab.statLabel}</span>
                <span className="phone-metric-tag">Live</span>
              </div>
              <div className="phone-metric-val-row">
                <span className="phone-metric-num">{tab.statValue}</span>
                <span className="phone-metric-unit">{tab.statUnit}</span>
              </div>

              {/* Mini Wave Chart */}
              <div className="phone-mini-chart">
                <svg viewBox="0 0 100 24" className="phone-chart-svg">
                  <path 
                    d={tab.chartPath} 
                    fill="none" 
                    stroke="#FFC233" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                  />
                  <line x1="0" y1="12" x2="100" y2="12" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                </svg>
              </div>
              <div className="phone-delta-label">{tab.statDelta}</div>
            </div>

            {/* Channel Breakdown Rows */}
            <div className="phone-channel-row">
              <span className="phone-ch-name">{tab.meta1}</span>
              <span className="phone-ch-val">{tab.meta1Val}</span>
            </div>
            <div className="phone-channel-row">
              <span className="phone-ch-name">{tab.meta2}</span>
              <span className="phone-ch-val">{tab.meta2Val}</span>
            </div>

            {/* Activity Feed */}
            <div className="phone-feed-list">
              {tab.recent.map((item, rIdx) => (
                <div className="phone-feed-item" key={rIdx}>
                  <span className="feed-item-name">{item.name}</span>
                  <span className="feed-item-time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="phone-bottom-nav">
            <div className={`nav-tab ${tab.navActive === 'main' ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              <span>Main</span>
            </div>
            <div className="nav-tab">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span>Stats</span>
            </div>
            <div className={`nav-tab ${tab.navActive === 'monitor' ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              <span>Monitor</span>
            </div>
            <div className={`nav-tab ${tab.navActive === 'team' ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Team</span>
            </div>
          </div>

        </div>
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
