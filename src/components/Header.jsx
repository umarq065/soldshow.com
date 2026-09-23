import React, { useState, useEffect } from 'react';

export default function Header({ onOpenTeardown, onToggleMenu }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let prevScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 120 && currentScrollY > prevScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className="section header" 
      id="main-header"
      style={{
        transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.35s ease'
      }}
    >
      <div className="container header__container">
        <div className="header__wrapper">
          
          {/* Left: Pill Menu with 4 Dots (Numa Glass Style) */}
          <div 
            className={`menu__wrapper ${isOpen ? 'is-open' : ''}`} 
            id="header-menu-pill"
            onMouseEnter={() => { if (window.innerWidth > 991) setIsOpen(true); }}
            onMouseLeave={() => { if (window.innerWidth > 991) setIsOpen(false); }}
            onClick={() => {
              if (window.innerWidth <= 991) {
                onToggleMenu();
              } else {
                setIsOpen(!isOpen);
              }
            }}
          >
            <div role="button" className="menu__head js-toggle-menu" aria-label="Toggle navigation menu">
              <div className="text menu-item-text text--base">
                <span>Menu</span>
              </div>
              <div className="menu__icon-wrapper">
                <div className="menu__icon-circle"></div>
                <div className="menu__icon-circle"></div>
                <div className="menu__icon-circle"></div>
                <div className="menu__icon-circle"></div>
              </div>
            </div>
            <div className="menu__line"></div>
            <div className="menu__items">
              <div className="menu__item-mask">
                <a href="#system" className="link submenu-item-text text--base menu__link">What It Does</a>
              </div>
              <div className="menu__item-mask">
                <a href="#how-it-works" className="link submenu-item-text text--base menu__link">How It Works</a>
              </div>
            </div>
          </div>

          {/* Center: Official Wide Logo Uploaded by User */}
          <a href="#" className="link-block logo__wrapper" aria-label="soldshow">
            <img src="/assets/soldshow-wide-dark.png" alt="soldshow" className="soldshow-header-logo" />
          </a>

          {/* Right: Pill Action Button with '+' Plus Icon (Numa Exact) */}
          <button 
            type="button" 
            className="button header-button js-open-teardown"
            onClick={onOpenTeardown}
          >
            <span className="text-button menu-item-text text--base">
              <span>Get a free teardown</span>
            </span>
            <span className="svg-icon header-button__svg-icon">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 2.1C6.9 2.1 7.26 2.42 7.26 2.84V5.74H10.16C10.58 5.74 10.93 6.08 10.93 6.5C10.93 6.92 10.58 7.26 10.16 7.26H7.26V10.16C7.26 10.58 6.92 10.92 6.5 10.92C6.08 10.92 5.74 10.58 5.74 10.16V7.26H2.84C2.42 7.26 2.08 6.92 2.08 6.5C2.08 6.08 2.42 5.74 2.84 5.74H5.74V2.84C5.74 2.42 6.08 2.1 6.5 2.1Z" fill="#0B0D09"/>
              </svg>
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}
