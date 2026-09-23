/**
 * SoldShow.com — Smooth Scroll & Viewport-Pinned Scrub Animations
 * Mirroring numa.uprock.pro scroll architecture, pinned viewports, and micro-interactions.
 */

let lenisInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  initLenisSmoothScroll();
  initHeader();
  initCenterpieceTelemetry();
  initPopups();
  initScrollAnimations();
});

/* ==========================================================================
   1. Lenis Smooth Scroll Engine (Numa Momentum Feel)
   ========================================================================== */
function initLenisSmoothScroll() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis library not loaded.');
    return;
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false
  });

  // Connect Lenis to GSAP ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Smooth Anchor Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl && lenisInstance) {
          e.preventDefault();
          lenisInstance.scrollTo(targetEl, { offset: 0, duration: 1.2 });
        }
      }
    });
  });
}

/* ==========================================================================
   2. Header Menu & Scroll Behavior
   ========================================================================== */
function initHeader() {
  const header = document.getElementById('main-header');
  const menuPill = document.getElementById('header-menu-pill');
  const adaptiveMenu = document.getElementById('adaptive-menu');

  if (menuPill) {
    menuPill.addEventListener('mouseenter', () => {
      if (window.innerWidth > 991) {
        menuPill.classList.add('is-open');
      }
    });

    menuPill.addEventListener('mouseleave', () => {
      if (window.innerWidth > 991) {
        menuPill.classList.remove('is-open');
      }
    });

    menuPill.addEventListener('click', () => {
      if (window.innerWidth <= 991 && adaptiveMenu) {
        adaptiveMenu.classList.add('is-active');
        adaptiveMenu.setAttribute('aria-hidden', 'false');
        if (lenisInstance) lenisInstance.stop();
      } else {
        menuPill.classList.toggle('is-open');
      }
    });
  }

  // Close adaptive menu
  document.querySelectorAll('.js-close-menu').forEach(el => {
    el.addEventListener('click', () => {
      if (adaptiveMenu) {
        adaptiveMenu.classList.remove('is-active');
        adaptiveMenu.setAttribute('aria-hidden', 'true');
        if (lenisInstance) lenisInstance.start();
      }
    });
  });

  // Header Hide/Reveal on scroll
  let prevScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (!header) return;

    if (currentScrollY > 120 && currentScrollY > prevScrollY) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    prevScrollY = currentScrollY;
  }, { passive: true });
}

/* ==========================================================================
   3. Centerpiece Telemetry Switcher (Concerts, Nightlife, Conferences, Fairs)
   ========================================================================== */
function initCenterpieceTelemetry() {
  const pills = document.querySelectorAll('.cat-pill');
  const cpTickets = document.getElementById('cp-tickets');
  const cpRevenue = document.getElementById('cp-revenue');
  const cpCpt = document.getElementById('cp-cpt');
  const cpCh1 = document.getElementById('cp-ch1');
  const cpCh2 = document.getElementById('cp-ch2');
  const cpCh3 = document.getElementById('cp-ch3');
  const cpTicker = document.getElementById('cp-ticker-text');

  const telemetryData = {
    concerts: {
      tickets: '3,842',
      revenue: '$192,100',
      cpt: '$4.12',
      ch1: '1,940 tix • $3.80 CPT',
      ch2: '1,060 tix • $0.48 CPT',
      ch3: '842 tix • Zero ad spend',
      ticker: '[11:42:09] 4x Tier 1 VIP ($480.00) attributed to Ad Variant #03 (Motion) via tracked lander'
    },
    nightlife: {
      tickets: '1,920',
      revenue: '$76,800',
      cpt: '$2.85',
      ch1: '1,020 tix • $2.60 CPT',
      ch2: '540 tix • $0.32 CPT',
      ch3: '360 tix • Zero ad spend',
      ticker: '[11:43:18] 2x General Entry ($90.00) attributed to Sequence #3 (Last Chance) at Tier 2 cutoff'
    },
    conferences: {
      tickets: '860',
      revenue: '$387,000',
      cpt: '$18.40',
      ch1: '430 tix • $16.20 CPT',
      ch2: '258 tix • $1.10 CPT',
      ch3: '172 tix • B2B Direct Inbound',
      ticker: '[11:44:02] 3x All-Access Pass ($1,350.00) attributed to B2B Ad Variant #08 (Static Architecture)'
    },
    fairs: {
      tickets: '6,450',
      revenue: '$129,000',
      cpt: '$1.92',
      ch1: '3,870 tix • $1.75 CPT',
      ch2: '1,610 tix • $0.22 CPT',
      ch3: '970 tix • Local QR Organic',
      ticker: '[11:44:55] 6x Family Weekend Pass ($120.00) attributed to Geo-Targeted Ad Variant #02'
    }
  };

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cat = pill.getAttribute('data-cat');
      const data = telemetryData[cat];
      if (!data) return;

      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      if (cpTickets) cpTickets.textContent = data.tickets;
      if (cpRevenue) cpRevenue.textContent = data.revenue;
      if (cpCpt) cpCpt.textContent = data.cpt;
      if (cpCh1) cpCh1.textContent = data.ch1;
      if (cpCh2) cpCh2.textContent = data.ch2;
      if (cpCh3) cpCh3.textContent = data.ch3;
      if (cpTicker) cpTicker.textContent = data.ticker;
    });
  });
}

/* ==========================================================================
   4. Pop-up Modal Handling (Teardown Dialog)
   ========================================================================== */
function initPopups() {
  const modal = document.getElementById('teardown-modal');
  const openButtons = document.querySelectorAll('.js-open-teardown');
  const closeButtons = document.querySelectorAll('.js-close-popup');
  const form = document.getElementById('popup-form');
  const successState = document.getElementById('popup-success');
  const grossSelect = document.getElementById('modal-gross');

  const openModal = (tier = null) => {
    if (!modal) return;
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lenisInstance) lenisInstance.stop();

    if (tier && grossSelect) {
      if (tier.includes('1,500')) {
        grossSelect.value = '$15k–$30k';
      } else if (tier.includes('3,500')) {
        grossSelect.value = '$30k+';
      }
    }

    const firstInput = modal.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 150);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lenisInstance) lenisInstance.start();

    setTimeout(() => {
      if (form) form.style.display = 'flex';
      if (successState) successState.style.display = 'none';
    }, 250);
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tier = btn.getAttribute('data-tier');
      openModal(tier);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = '<span class="text-button button-text text--base">Queuing teardown...</span>';
      }

      setTimeout(() => {
        form.style.display = 'none';
        if (successState) successState.style.display = 'block';
        if (submitBtn) {
          submitBtn.innerHTML = '<span class="text-button button-text text--base">Get a free teardown</span>';
        }
      }, 500);
    });
  }
}

/* ==========================================================================
   5. Main Scroll Animations (Exact Numa Pinned Sections & Scrub Orchestration)
   ========================================================================== */
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Responsive ScrollTrigger matchMedia
  ScrollTrigger.matchMedia({

    /* ------------------------------------------------------------------------
       DESKTOP VIEWPORT (min-width: 992px): PINNED SECTIONS & DETAILED SCRUB
       ------------------------------------------------------------------------ */
    "(min-width: 992px)": function() {

      // --- SECTION 1: HERO EXIT SCRUB ---
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      });

      heroTimeline
        .to('.cover__mask', {
          scale: 0.96,
          borderRadius: '3.2vw',
          opacity: 0.75,
          ease: 'none'
        }, 0)
        .to('.cover__title, .cover__subtitle, .pre-order-button__wrapper', {
          y: -40,
          opacity: 0,
          filter: 'blur(12px)',
          ease: 'none'
        }, 0);

      // --- SECTION 2: STAT CARDS ENTRANCE ---
      gsap.from('#system .numbers__card', {
        scrollTrigger: {
          trigger: '#system',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.85,
        ease: 'power2.out'
      });

      // --- SECTION 3: ADVANTAGES TABS (PINNED VIEWPORT SCRUB) ---
      const advTabs = document.querySelectorAll('.advantages__tab');
      const advDescs = document.querySelectorAll('.advantages__description');
      const advVisuals = document.querySelectorAll('.advantages__video-wrapper');
      const marker = document.getElementById('tabs-marker');

      function switchAdvTab(tabIndex) {
        advTabs.forEach((tab, i) => {
          if (i === tabIndex) {
            tab.classList.add('is-active');
            if (marker) {
              marker.style.top = `${tab.offsetTop + 4}px`;
            }
          } else {
            tab.classList.remove('is-active');
          }
        });

        advDescs.forEach((d, i) => {
          if (i === tabIndex) d.classList.add('is-active');
          else d.classList.remove('is-active');
        });

        advVisuals.forEach((v, i) => {
          if (i === tabIndex) v.classList.add('is-active');
          else v.classList.remove('is-active');
        });
      }

      // Initial active tab
      switchAdvTab(0);

      const advPinTrigger = ScrollTrigger.create({
        trigger: '#advantages',
        pin: true,
        start: 'top top',
        end: '+=200%',
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.38) {
            switchAdvTab(0);
          } else if (p < 0.72) {
            switchAdvTab(1);
          } else {
            switchAdvTab(2);
          }
        }
      });

      // Allow clicking tabs to smoothly scroll to corresponding scrub progress
      advTabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          if (!advPinTrigger) return;
          const targetProgress = index === 0 ? 0.05 : index === 1 ? 0.52 : 0.88;
          const scrollDistance = advPinTrigger.end - advPinTrigger.start;
          const targetY = advPinTrigger.start + (targetProgress * scrollDistance);
          if (lenisInstance) {
            lenisInstance.scrollTo(targetY, { duration: 1.0 });
          } else {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        });
      });

      // --- SECTION 4: TIMELINE (PINNED DEMAND CURVE & SCENES SCRUB) ---
      const curvePath = document.getElementById('timeline-curve-path');
      const curveFill = document.getElementById('timeline-curve-fill');
      const pathLength = curvePath ? curvePath.getTotalLength() : 800;

      if (curvePath) {
        gsap.set(curvePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      }

      const timelinePinTrigger = ScrollTrigger.create({
        trigger: '#timeline',
        pin: true,
        start: 'top top',
        end: '+=200%',
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress;

          // Draw SVG curve line
          if (curvePath) {
            const drawOffset = pathLength * (1 - p);
            curvePath.style.strokeDashoffset = drawOffset;
          }
          if (curveFill) {
            curveFill.style.opacity = p * 0.22;
          }

          // Cycle stage pills and cards
          const pill1 = document.getElementById('time-pill-1');
          const pill2 = document.getElementById('time-pill-2');
          const pill3 = document.getElementById('time-pill-3');
          const scene1 = document.getElementById('timeline-scene-1');
          const scene2 = document.getElementById('timeline-scene-2');
          const heroCard = document.querySelector('.timeline-hero-card');

          if (p < 0.36) {
            if (pill1) pill1.classList.add('is-active');
            if (pill2) pill2.classList.remove('is-active');
            if (pill3) pill3.classList.remove('is-active');
            if (scene1) scene1.classList.add('is-active');
            if (scene2) scene2.classList.remove('is-active');
            if (heroCard) heroCard.classList.remove('is-active');
          } else if (p < 0.72) {
            if (pill1) pill1.classList.remove('is-active');
            if (pill2) pill2.classList.add('is-active');
            if (pill3) pill3.classList.remove('is-active');
            if (scene1) scene1.classList.remove('is-active');
            if (scene2) scene2.classList.add('is-active');
            if (heroCard) heroCard.classList.remove('is-active');
          } else {
            if (pill1) pill1.classList.remove('is-active');
            if (pill2) pill2.classList.remove('is-active');
            if (pill3) pill3.classList.add('is-active');
            if (scene1) scene1.classList.remove('is-active');
            if (scene2) scene2.classList.remove('is-active');
            if (heroCard) heroCard.classList.add('is-active');
          }
        }
      });

      // --- SECTION 5: DASHBOARD (PINNED DRIFTING RIBBONS & 3D HARDWARE CARD) ---
      const dashboardTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#dashboard',
          pin: true,
          start: 'top top',
          end: '+=180%',
          scrub: 0.5
        }
      });

      dashboardTl
        // Horizontal ribbons drift
        .fromTo('#route-top', { x: '5vw' }, { x: '-28vw', ease: 'none' }, 0)
        .fromTo('#route-mid', { x: '-20vw' }, { x: '18vw', ease: 'none' }, 0)
        .fromTo('#route-bot', { x: '10vw' }, { x: '-25vw', ease: 'none' }, 0)

        // Centerpiece telemetry card floating scale & tilt
        .fromTo('.centerpiece-telemetry-card', 
          { scale: 0.88, y: 50, opacity: 0.8, rotateX: 6 },
          { scale: 1.0, y: 0, opacity: 1.0, rotateX: 0, ease: 'power1.out' }, 0.1)

        // Feature cards below staggered reveal
        .fromTo('.dash-feature-card',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out' }, 0.4);

      // --- SECTION 6: HOW IT WORKS (PINNED 3 STEPS REVEAL) ---
      const stepsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#how-it-works',
          pin: true,
          start: 'top top',
          end: '+=160%',
          scrub: 0.5
        }
      });

      const stepCards = document.querySelectorAll('.steps__card');
      if (stepCards.length >= 3) {
        stepsTl
          .fromTo(stepCards[0], { y: 40, opacity: 0.3 }, { y: 0, opacity: 1, ease: 'power1.out' }, 0)
          .fromTo(stepCards[1], { y: 60, opacity: 0.2 }, { y: 0, opacity: 1, ease: 'power1.out' }, 0.3)
          .fromTo(stepCards[2], { y: 80, opacity: 0.1 }, { y: 0, opacity: 1, ease: 'power1.out' }, 0.6);
      }

      // --- SECTION 7: TESTIMONIALS (STAGGER ENTRANCE) ---
      gsap.from('#testimonials .testimonial-card', {
        scrollTrigger: {
          trigger: '#testimonials',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
      });

      // --- SECTION 8: CLOSING CTA (SCALE IN) ---
      gsap.fromTo('#closing-cta .h2-copy', 
        { scale: 0.88, opacity: 0.6 },
        {
          scrollTrigger: {
            trigger: '#closing-cta',
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.5
          },
          scale: 1.0,
          opacity: 1.0,
          ease: 'power2.out'
        }
      );

    },

    /* ------------------------------------------------------------------------
       MOBILE VIEWPORT (max-width: 991px): SMOOTH UNPINNED NATURAL FLOW
       ------------------------------------------------------------------------ */
    "(max-width: 991px)": function() {
      // Mobile Tab Clicking
      const advTabs = document.querySelectorAll('.advantages__tab');
      const advDescs = document.querySelectorAll('.advantages__description');
      const advVisuals = document.querySelectorAll('.advantages__video-wrapper');

      advTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
          advTabs.forEach(t => t.classList.remove('is-active'));
          tab.classList.add('is-active');

          advDescs.forEach((d, i) => {
            if (i === index) d.classList.add('is-active');
            else d.classList.remove('is-active');
          });

          advVisuals.forEach((v, i) => {
            if (i === index) v.classList.add('is-active');
            else v.classList.remove('is-active');
          });
        });
      });

      // Simple, elegant fade-ins for cards on mobile
      gsap.utils.toArray('.numbers__card, .dash-feature-card, .steps__card, .testimonial-card').forEach(el => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    }

  });
}
