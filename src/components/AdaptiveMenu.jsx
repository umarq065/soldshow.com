import React from 'react';

export default function AdaptiveMenu({ isOpen, onClose, onOpenTeardown }) {
  if (!isOpen) return null;

  return (
    <div className="pop-up menu-adaptive__popup is-active" id="adaptive-menu" aria-hidden="false">
      <div className="pop-up__overlay overlay__pop-up-adaptive js-close-menu" onClick={onClose}></div>
      <div className="pop-up__content menu-adaptive">
        <button type="button" className="pop-up__close-adaptive js-close-menu" aria-label="Close menu" onClick={onClose}>
          &times;
        </button>
        <div className="menu-adaptive__text-wrapper">
          <div className="menu-adaptive__links">
            <a href="#system" className="submenu-item-text menu-adaptive__link js-close-menu" onClick={onClose}>
              What It Does
            </a>
            <a href="#how-it-works" className="submenu-item-text menu-adaptive__link js-close-menu" onClick={onClose}>
              How It Works
            </a>
          </div>
          <button 
            type="button" 
            className="button menu-adaptive__button fill--amber js-open-teardown"
            onClick={() => {
              onClose();
              onOpenTeardown();
            }}
          >
            <span className="text-button button-text text--base">Get a free teardown</span>
          </button>
        </div>
      </div>
    </div>
  );
}
