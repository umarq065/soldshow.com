import React from 'react';

export default function Testimonials() {
  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container testimonials-camera">
        <div className="testimonials-wrapper">
          
          <div className="testimonials-heading-wrap">
            <h2 className="text h3 text--base">
              Trusted by Event <span className="font-accent">Organizers</span>
            </h2>
          </div>

          <div className="testimonials-grid">
            
            {/* Card 1 */}
            <div className="testimonial-card">
              <div className="testimonial-quote-icon">&ldquo;</div>
              <p className="testimonial-quote">
                "I stopped guessing which post actually sold tickets. Now I just watch the dashboard."
              </p>
              <div className="testimonial-author-wrap">
                <span className="testimonial-author">Jordan Blake</span>
                <span className="testimonial-role mono">[Demo] Event Promoter</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="testimonial-card">
              <div className="testimonial-quote-icon">&ldquo;</div>
              <p className="testimonial-quote">
                "The page was live before I even finished picking a venue photo. That speed alone changed how I plan every show."
              </p>
              <div className="testimonial-author-wrap">
                <span className="testimonial-author">Maria Torres</span>
                <span className="testimonial-role mono">[Demo] Bar & Lounge Owner</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="testimonial-card">
              <div className="testimonial-quote-icon">&ldquo;</div>
              <p className="testimonial-quote">
                "For the first time, I know exactly what my ad spend is doing before the show even starts."
              </p>
              <div className="testimonial-author-wrap">
                <span className="testimonial-author">Chris Adeyemi</span>
                <span className="testimonial-role mono">[Demo] Festival Organizer</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
