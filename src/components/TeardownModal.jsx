import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TeardownModal({ isOpen, onClose }) {
  const [eventName, setEventName] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [gross, setGross] = useState('$15k–$30k');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const formRef = useRef(null);
  const closeBtnRef = useRef(null);
  const firstInputRef = useRef(null);
  const isClosingRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      isClosingRef.current = false;
      setShouldRender(true);
    } else if (shouldRender && !isClosingRef.current) {
      handleClose();
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    if (!overlayRef.current || !modalRef.current) {
      setShouldRender(false);
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setShouldRender(false);
        isClosingRef.current = false;
        setIsSubmitted(false);
        setIsSubmitting(false);
        onClose();
      }
    });

    tl.to(modalRef.current, {
      opacity: 0,
      scale: 0.90,
      y: 22,
      rotateX: -4,
      duration: 0.26,
      ease: 'power2.in'
    }, 0)
    .to(overlayRef.current, {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      duration: 0.26,
      ease: 'power2.in'
    }, 0);
  };

  useLayoutEffect(() => {
    if (!shouldRender || !isOpen) return;

    const ctx = gsap.context(() => {
      // 1. Overlay glassmorphism fade-in
      gsap.fromTo(overlayRef.current,
        { opacity: 0, backdropFilter: 'blur(0px)' },
        { opacity: 1, backdropFilter: 'blur(12px)', duration: 0.45, ease: 'power2.out' }
      );

      // 2. Modal card stylish spring entrance with perspective tilt
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.88, y: 35, rotateX: 6 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          rotateX: 0, 
          duration: 0.55, 
          ease: 'back.out(1.15)',
          clearProps: 'transform'
        }
      );

      // 3. Left concert photo reveals with subtle settling
      if (imgRef.current) {
        gsap.fromTo(imgRef.current,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' }
        );
      }

      // 4. Staggered reveal of form header & inputs
      const elementsToStagger = formRef.current?.querySelectorAll(
        '.pop-up__description-wrapper, .pop-up_input-content, .pop-up__pravicy-policy, .pop-up-button'
      );
      if (elementsToStagger && elementsToStagger.length > 0) {
        gsap.fromTo(elementsToStagger,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.38, ease: 'power2.out', delay: 0.12 }
        );
      }

      // 5. Close button pops in with a stylish 90-degree twist
      if (closeBtnRef.current) {
        gsap.fromTo(closeBtnRef.current,
          { opacity: 0, scale: 0.4, rotate: -90 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(1.8)', delay: 0.22 }
        );
      }
    });

    const timer = setTimeout(() => {
      if (firstInputRef.current) firstInputRef.current.focus();
    }, 380);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [shouldRender, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && shouldRender) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shouldRender]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (formRef.current) {
        gsap.fromTo('.form__state-success',
          { opacity: 0, scale: 0.95, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)' }
        );
      }
    }, 550);
  };

  if (!shouldRender) return null;

  return (
    <div 
      className="pop-up pop-up__preorder is-active" 
      id="teardown-modal" 
      aria-hidden={!isOpen}
    >
      <div 
        ref={overlayRef} 
        className="pop-up__overlay pop-up__bg js-close-popup" 
        onClick={handleClose}
      ></div>
      <div ref={modalRef} className="pop-up__content pop-up__contents">
        <button 
          ref={closeBtnRef}
          type="button" 
          className="pop-up__close js-close-popup" 
          aria-label="Close" 
          onClick={handleClose}
        ></button>
        
        {/* Modal Left Image */}
        <div ref={imgRef} className="pop-up__img-wrapper">
          <img src="/assets/concert.jpg" alt="SoldShow Live Event" className="pop-up__img-2" />
        </div>

        {/* Modal Right Form */}
        <div ref={formRef} className="pop-up__form">
          {!isSubmitted ? (
            <form className="pop-up__default-form" id="popup-form" onSubmit={handleSubmit}>
              <div className="pop-up__description-wrapper">
                <h3 className="text-title h3 text--base">
                  Get a free <span className="font-accent">teardown</span>
                </h3>
                <p className="text text-3 text--muted">
                  Built from your public pages and live ads. No access required to start.
                </p>
              </div>

              <div className="pop-up_input-content">
                <label htmlFor="modal-event" className="text-subtitle text-4 text--muted mono">
                  EVENT NAME
                </label>
                <input 
                  ref={firstInputRef}
                  id="modal-event" 
                  placeholder="e.g. Summer Solstice Fest 2026" 
                  type="text" 
                  className="form__input pop-up__input text-3" 
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required 
                />
              </div>

              <div className="pop-up_input-content">
                <label htmlFor="modal-url" className="text-subtitle text-4 text--muted mono">
                  TICKETING / LIVE ADS URL
                </label>
                <input 
                  id="modal-url" 
                  placeholder="https://eventbrite.com/e/... or ticketing site" 
                  type="url" 
                  className="form__input pop-up__input text-3" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required 
                />
              </div>

              <div className="pop-up_input-content">
                <label htmlFor="modal-email" className="text-subtitle text-4 text--muted mono">
                  ORGANIZER EMAIL
                </label>
                <input 
                  id="modal-email" 
                  placeholder="alex@eventorganizer.com" 
                  type="email" 
                  className="form__input pop-up__input text-3" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="pop-up_input-content">
                <label htmlFor="modal-gross" className="text-subtitle text-4 text--muted mono">
                  ESTIMATED EVENT GROSS
                </label>
                <select 
                  id="modal-gross" 
                  className="form__input pop-up__input text-3"
                  value={gross}
                  onChange={(e) => setGross(e.target.value)}
                >
                  <option value="$15k–$30k">$15,000 – $30,000</option>
                  <option value="$30k+">$30,000+</option>
                </select>
              </div>

              <div className="text text-4 pop-up__pravicy-policy">
                <span className="text--muted">Audit ready within 48 hours. Built purely from public data.</span>
              </div>

              <button type="submit" className="button pop-up-button fill--amber" disabled={isSubmitting}>
                <span className="text-button button-text text--base">
                  {isSubmitting ? 'Queuing teardown...' : 'Get a free teardown'}
                </span>
              </button>
            </form>
          ) : (
            <div className="form__state-success" id="popup-success" style={{ display: 'block' }}>
              <div className="pop-up__description-wrapper">
                <h3 className="text-title h3 text--base">Teardown Queued</h3>
                <p className="text text-3 text--muted">
                  We are analyzing your public ticketing page and active ad creative now. Your teardown report will arrive within 48 hours.
                </p>
              </div>
              <button 
                type="button" 
                className="button pop-up-button fill--amber js-close-popup" 
                style={{ marginTop: '2vw' }}
                onClick={handleClose}
              >
                <span className="text-button button-text text--base">Close</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
