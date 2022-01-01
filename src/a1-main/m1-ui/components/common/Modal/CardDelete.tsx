import React from 'react';

import { Button } from '../CustomButton/Button';

import s from 'styles/Modal.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type CardDeleteType = {
  showDelete: (modal: boolean) => void;
  handleDeleteCard: () => void;
};

export const CardDelete: React.FC<CardDeleteType> = ({
  showDelete,
  handleDeleteCard,
}): ReturnComponentType => (
  <div className={s.containerModal}>
    <h1 className={s.titleModal}>Delete Card</h1>
    <h2>Are you sure?</h2>
    <Button onClick={handleDeleteCard} className={s.buttonLRMargin}>
      delete
    </Button>
    <Button onClick={() => showDelete(false)} className={s.buttonLRMargin}>
      cancel
    </Button>
  </div>
);
