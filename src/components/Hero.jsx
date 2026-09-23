import React from 'react';

export default function Hero({ onOpenTeardown }) {
  return (
    <section className="section cover" id="hero">
      <div className="container cover__camera">
        <div className="cover__mask-wrapper">
          <div className="cover__mask">
            <div className="cover__content-wrapper">
              
              {/* Atmospheric Bright Stage Lighting Canvas */}
              <div className="cover__visual-stage">
                <div className="stage-gradient-glow"></div>
                <div className="stage-grid-lines"></div>
                <img src="/assets/concert.jpg" alt="Live Event Atmosphere" className="cover__stage-bg" />
              </div>

              {/* Numa Hero Typography & Actions (Lower Left) */}
              <div className="cover__content">
                
                <div className="cover__title text--base">
                  <div className="cover__title-mask">
                    <h1 className="text h1">An AI system that</h1>
                  </div>
                  <div className="cover__title-mask">
                    <h1 className="text h1"><span className="font-accent">sells</span> your tickets.</h1>
                  </div>
                </div>

                <div className="cover__subtitle text--muted">
                  <div className="subtitle__mask">
                    <p className="text text-1">
                      SoldShow builds your creative, runs your ticket page, and follows up automatically — so you're not chasing sales the week before your event.
                    </p>
                  </div>
                </div>

                <div className="pre-order-button__wrapper">
                  <button type="button" className="button pre-order-button js-open-teardown" onClick={onOpenTeardown}>
                    <span className="text-button button-text text--base">Get a free teardown</span>
                  </button>
                </div>

              </div>

              {/* Top Right Floating Telemetry Badge */}
              <div className="cover__telemetry-badge mono">
                <span className="badge-dot"></span>
                <span>AI SYSTEM &bull; TICKET SALES INFRASTRUCTURE</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
