import React, { useState, useEffect, useRef } from 'react';

export default function TeardownModal({ isOpen, onClose }) {
  const [eventName, setEventName] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [gross, setGross] = useState('$15k–$30k');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (firstInputRef.current) firstInputRef.current.focus();
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setIsSubmitted(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <div 
      className={`pop-up pop-up__preorder ${isOpen ? 'is-active' : ''}`} 
      id="teardown-modal" 
      aria-hidden={!isOpen}
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      <div className="pop-up__overlay pop-up__bg js-close-popup" onClick={onClose}></div>
      <div className="pop-up__content pop-up__contents">
        <button 
          type="button" 
          className="pop-up__close js-close-popup" 
          aria-label="Close" 
          onClick={onClose}
        ></button>
        
        {/* Modal Left Image */}
        <div className="pop-up__img-wrapper">
          <img src="/assets/concert.jpg" alt="SoldShow Live Event" className="pop-up__img-2" />
        </div>

        {/* Modal Right Form */}
        <div className="pop-up__form">
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
                onClick={onClose}
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
