import React from 'react';

import { Outlet } from 'react-router-dom';

import { ReturnComponentType } from '../../../types/ReturnComponentType';

export const Layout = (): ReturnComponentType => (
  <div>
    <Outlet />
  </div>
);
export default Layout;
