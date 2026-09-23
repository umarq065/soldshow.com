import React from 'react';

export default function StatCards() {
  const cards = [
    {
      num: '72',
      unit: 'hours',
      title: 'Live in 72 hours',
      desc: 'Your ticket page, creative, and tracking go live fast, while every other channel is still stuck in planning.',
      image: '/assets/concert.jpg'
    },
    {
      num: '24',
      unit: '/ 7',
      title: 'Runs 24/7 on its own',
      desc: 'Automated follow-up sequences handle reminders, abandoned checkouts, and last-chance pushes without you lifting a finger.',
      image: '/assets/conference.jpg'
    },
    {
      num: '100',
      unit: '%',
      title: '100% attribution',
      desc: 'Know exactly which ad, email, or post sold each ticket. Real-time cost-per-ticket tracking across all your channels.',
      image: '/assets/nightlife.jpg'
    }
  ];

  return (
    <section className="section numbers-fullview" id="system">
      <div className="numbers-fullview__wrapper">
        {cards.map((card, idx) => (
          <div className="numa-stat-card" key={idx}>
            {/* Top Area with Background Image, Brand Overlay, Amber Dot & Number */}
            <div className="numa-stat-card__gradient">
              {/* Event Background Image */}
              <img 
                src={card.image} 
                alt={card.title} 
                className="numa-stat-card__image" 
              />
              {/* Brand Color Gradient Overlay */}
              <div className="numa-stat-card__overlay"></div>

              {/* Brand Amber Dot */}
              <div className="numa-stat-card__dot"></div>

              {/* Huge Typography */}
              <div className="numa-stat-card__value">
                <span className="numa-stat-card__num">{card.num}</span>
                <span className="numa-stat-card__unit">{card.unit}</span>
              </div>
            </div>

            {/* Bottom White Area with Title & Description */}
            <div className="numa-stat-card__bottom">
              <h3 className="numa-stat-card__title">{card.title}</h3>
              <p className="numa-stat-card__desc">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
