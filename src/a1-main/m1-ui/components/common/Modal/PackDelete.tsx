import React from 'react';

import s from '../../../../../styles/Modal.module.css';
import { ReturnComponentType } from '../../../../../types/ReturnComponentType';
import { Button } from '../CustomButton/Button';

type PackDeleteType = {
  showDelete: (modal: boolean) => void;
  deletePack: () => void;
};

export const PackDelete: React.FC<PackDeleteType> = ({
  showDelete,
  deletePack,
}): ReturnComponentType => (
  <div className={s.containerModal}>
    <h1 className={s.titleModal}>Delete Pack</h1>
    <h2>Are you sure?</h2>
    <Button onClick={deletePack}>delete</Button>
    <Button onClick={() => showDelete(false)}>cancel</Button>
  </div>
);
