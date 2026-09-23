import React from 'react';

export default function Advantages({ activeIndex = 0, onSelectTab }) {
  const tabs = ['On Time', 'Tracked', 'Managed'];

  return (
    <section className="section advantages" id="advantages">
      <div className="container advantages__camera">
        <div className="advantages__wrapper">
          
          {/* Left Part: Heading, 3 Tabs with sliding marker, Description & SLA Line */}
          <div className="advantages__left-part">
            
            <div className="advantages__h3-heading">
              <h2 className="text h3 text--base">
                Built to launch, <span className="font-accent">trusted</span> to deliver
              </h2>
            </div>

            {/* Vertical Interactive Tabs with Sliding Pill Marker */}
            <div className="advantages__tabs-wrapper">
              {tabs.map((tab, idx) => (
                <p 
                  key={tab}
                  tab={idx + 1}
                  className={`text text-4 advantages__tab ${activeIndex === idx ? 'is-active' : ''}`}
                  id={`tab-btn-${idx + 1}`}
                  onClick={() => onSelectTab && onSelectTab(idx)}
                >
                  {tab}
                </p>
              ))}
              <div 
                className="advantages__marker fill--amber" 
                id="tabs-marker"
                style={{
                  top: `${activeIndex * 3.3 + 0.2}vw`
                }}
              >
                <div className="advantages__marker-small fill--base"></div>
              </div>
            </div>

            {/* Dynamic Descriptions */}
            <div className="advantages__description-wrapper">
              <div className={`advantages__description ${activeIndex === 0 ? 'is-active' : ''}`} id="tab-desc-1">
                <h3 className="text text--base h4">On Time 24/7</h3>
                <p className="text text--muted text-1 advantages__text-description">
                  Fast 72-hour turnaround — Your ticket page and 12 creative variants launch without delaying your promotion schedule.
                </p>
              </div>

              <div className={`advantages__description ${activeIndex === 1 ? 'is-active' : ''}`} id="tab-desc-2">
                <h3 className="text text--base h4">Tracked 24/7</h3>
                <p className="text text--muted text-1 advantages__text-description">
                  Day-one attribution — Conversion tracking and analytics hooked up before the first ad dollar is spent.
                </p>
              </div>

              <div className={`advantages__description ${activeIndex === 2 ? 'is-active' : ''}`} id="tab-desc-3">
                <h3 className="text text--base h4">Managed 24/7</h3>
                <p className="text text--muted text-1 advantages__text-description">
                  The system runs on its own once live. Creative, page, and follow-up sequences all managed without you checking in.
                </p>
              </div>
            </div>

            <div className="system-sla-badge mono">
              <span className="badge-dot"></span>
              <span>Live and selling within <span className="font-accent" style={{ fontSize: '1.15em', letterSpacing: 0 }}>72 hours</span>.</span>
            </div>

          </div>

          {/* Right Part: Large Rounded Showcase Window */}
          <div className="advantages__right-part">
            <div className="advantages__mask">
              <div className="advantages__video-big-wrapper">
                
                <div className={`advantages__video-wrapper ${activeIndex === 0 ? 'is-active' : ''}`} id="adv-visual-1">
                  <img src="/assets/concert.jpg" alt="On Time Launch" className="advantages__visual-img" />
                  <div className="adv-caption mono">ON TIME 24/7 &bull; 72H DEPLOYMENT</div>
                </div>

                <div className={`advantages__video-wrapper ${activeIndex === 1 ? 'is-active' : ''}`} id="adv-visual-2">
                  <img src="/assets/conference.jpg" alt="Tracked Architecture" className="advantages__visual-img" />
                  <div className="adv-caption mono">DAY ONE TRACKING &bull; CONVERSION API</div>
                </div>

                <div className={`advantages__video-wrapper ${activeIndex === 2 ? 'is-active' : ''}`} id="adv-visual-3">
                  <img src="/assets/nightlife.jpg" alt="Managed 24/7" className="advantages__visual-img" />
                  <div className="adv-caption mono">MANAGED 24/7 &bull; AUTONOMOUS SEQUENCES</div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
