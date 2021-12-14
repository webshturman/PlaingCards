import React from 'react';

import preloader from 'assets/images/preloader.svg';

export const Preloader = (): React.ReactElement => (
  <div>
    <img src={preloader} alt="preloader animation" />
  </div>
);
