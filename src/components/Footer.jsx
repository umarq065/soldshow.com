import React from 'react';

export default function Footer({ onOpenTeardown }) {
  return (
    <footer className="section footer" id="closing-cta">
      <div className="container footer__container">
        <div className="footer__wrapper">
          
          <div className="footer__h2--wrapper">
            <h2 className="text text--base h2-copy">
              Start <span className="font-accent">selling</span>
            </h2>
          </div>

          <div className="footer__description--wrapper">
            <p className="text text-1 text--muted footer__text-width">
              Built from your public pages and live ads. No access required to start.
            </p>

            <div className="footer__action-row">
              <button type="button" className="button pre-order-button fill--amber js-open-teardown" onClick={onOpenTeardown}>
                <span className="text-button button-text text--base">Get a free teardown</span>
              </button>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer__bottom">
            <div className="footer__border">
              
              <div className="footer__text-link--wrapper">
                <span className="footer__link mono">
                  &copy; 2026 SoldShow. Ticket sales system for event organizers. All rights reserved
                </span>
              </div>

              <div className="footer__text-link--bottom mono">
                <span className="footer__link">Concerts &bull; Nightlife &bull; Conferences &bull; Fairs</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
