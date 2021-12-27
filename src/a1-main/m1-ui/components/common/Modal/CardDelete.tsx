import React from 'react';

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
  <div>
    <h1>Delete Card</h1>
    <Button onClick={handleDeleteCard}>delete</Button>
    <Button onClick={() => showDelete(false)}>cancel</Button>
  </div>
);
