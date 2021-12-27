import React from 'react';

import scrollArrow from 'assets/images/scrollArrow.png';
import { SCROLL_BORDER_X, SCROLL_BORDER_Y, SCROLL_LIMIT } from 'constants/common';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Scroll = (): ReturnComponentType => {
  const scrollBtn = document.querySelector('.showScroll');
  if (scrollBtn) {
    window.onscroll = () => {
      if (window.scrollY > SCROLL_LIMIT) {
        scrollBtn.classList.remove('hideScroll');
      }
      if (window.scrollY < SCROLL_LIMIT) {
        scrollBtn.classList.add('hideScroll');
      }
    };
    scrollBtn.addEventListener('click', () => {
      window.scrollTo(SCROLL_BORDER_X, SCROLL_BORDER_Y);
    });
  }

  return (
    <div id="scrollToTop" className="showScroll hideScroll">
      <img src={scrollArrow} alt="" />
    </div>
  );
};
