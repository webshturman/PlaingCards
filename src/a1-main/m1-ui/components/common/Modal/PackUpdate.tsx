import React, { useState } from 'react';

import { Button } from '../CustomButton/Button';
import { Input } from '../CustomInput/Input';

import { EMPTY_STRING } from 'constants/common';
import s from 'styles/Modal.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PackUpdateType = {
  showUpdate: (modal: boolean) => void;
  updatePack: (title: string) => void;
};

export const PackUpdate: React.FC<PackUpdateType> = ({
  showUpdate,
  updatePack,
}): ReturnComponentType => {
  const [newName, setNewName] = useState(EMPTY_STRING);

  const updatePackName = (): void => {
    updatePack(newName);
  };
  return (
    <div className={s.containerModal}>
      <h1 className={s.titleModal}>Update Pack</h1>
      <Input
        title=""
        placeholder="new pack name"
        onChangeText={setNewName}
        value={newName}
        type="text"
      />
      <Button onClick={updatePackName} className={s.buttonLRMargin}>
        update
      </Button>
      <Button onClick={() => showUpdate(false)} className={s.buttonLRMargin}>
        cancel
      </Button>
    </div>
  );
};
