import React from 'react';

import s from '../../../../../styles/Modal.module.css';
import { ReturnComponentType } from '../../../../../types/ReturnComponentType';
import { Button } from '../CustomButton/Button';

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
    <Button onClick={handleDeleteCard}>delete</Button>
    <Button onClick={() => showDelete(false)}>cancel</Button>
  </div>
);
