import React from 'react';

import s from '../../../../../styles/Modal.module.css';
import { ReturnComponentType } from '../../../../../types/ReturnComponentType';

type ModalType = {
  isOpen: boolean;
};

export const Modal: React.FC<ModalType> = ({ children, isOpen }): ReturnComponentType => (
  <div>
    {isOpen && (
      <div className={s.wrapper}>
        <div className={s.body}>
          <div>{children}</div>
        </div>
      </div>
    )}
  </div>
);
