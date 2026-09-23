import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Steps() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsWrapRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cardsWrap = cardsWrapRef.current;
    if (!section || !title || !cardsWrap) return;

    const ctx = gsap.context(() => {
      const cards = cardsWrap.querySelectorAll('.steps__numa-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // 1. Initial State:
      // Headline is dead-center in the viewport
      gsap.set(title, { 
        opacity: 1,
        y: 0,
        scale: 1
      });

      // Cards are positioned below viewport
      gsap.set(cardsWrap, {
        yPercent: 125,
        opacity: 0
      });

      // 2. Timeline Animation:
      // Phase 1 (0.0 -> 0.22): Dwell on "Start in 3 simple steps" alone in center
      // Phase 2 (0.22 -> 0.72): Cards smoothly rise up from below to fully cover the stage
      tl.to(cardsWrap, {
        yPercent: 0,
        opacity: 1,
        duration: 0.55,
        ease: 'power2.out'
      }, 0.22);

      // Phase 3 (0.32 -> 0.62): Headline smoothly fades out as cards rise into center
      tl.to(title, {
        opacity: 0,
        y: -35,
        scale: 0.96,
        duration: 0.32,
        ease: 'power2.inOut'
      }, 0.32);

      // Subtle stagger on the cards as they settle
      tl.fromTo(cards, 
        { y: 35 },
        { y: 0, stagger: 0.06, duration: 0.35, ease: 'power1.out' },
        0.52
      );

      // Phase 4 (0.72 -> 1.0): Settled dwell state where cards fully cover the section

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section steps steps--pinned" id="how-it-works" ref={sectionRef}>
      <div className="steps__pinned-container">
        
        {/* Centered Headline that transitions upward */}
        <div className="steps__title-stage" ref={titleRef}>
          <h2 className="steps__headline">
            Start in 3 simple <span className="font-accent">steps</span>
          </h2>
        </div>

        {/* 3 Step Cards that rise from below */}
        <div className="steps__cards-stage" ref={cardsWrapRef}>
          <div className="steps__cards-grid">
            
            {/* Step 1: Book the audit */}
            <div className="steps__numa-card">
              <div className="steps__numa-card-img">
                <img src="/assets/conference.jpg" alt="Book the audit" className="image__img" />
              </div>
              <div className="steps__numa-card-text">
                <div className="steps__card-top-text">
                  <div className="steps__card-icon mono">01</div>
                  <h3 className="steps__card-title">Book the audit</h3>
                </div>
                <p className="steps__card-desc">
                  We review your ticketing, ads, and last event's numbers before anything gets built.
                </p>
              </div>
            </div>

            {/* Step 2: System goes live */}
            <div className="steps__numa-card">
              <div className="steps__numa-card-img">
                <img src="/assets/concert.jpg" alt="System goes live" className="image__img" />
              </div>
              <div className="steps__numa-card-text">
                <div className="steps__card-top-text">
                  <div className="steps__card-icon mono">02</div>
                  <h3 className="steps__card-title">System goes live</h3>
                </div>
                <p className="steps__card-desc">
                  Your creative, tracked page, and sequences launch within 72 hours of sign-off.
                </p>
              </div>
            </div>

            {/* Step 3: It starts selling */}
            <div className="steps__numa-card">
              <div className="steps__numa-card-img">
                <img src="/assets/nightlife.jpg" alt="It starts selling" className="image__img" />
              </div>
              <div className="steps__numa-card-text">
                <div className="steps__card-top-text">
                  <div className="steps__card-icon mono">03</div>
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
    </section>
  );
}
