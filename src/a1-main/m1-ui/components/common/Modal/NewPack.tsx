import React, { useState } from 'react';

import { Button } from '../CustomButton/Button';
import { Input } from '../CustomInput/Input';

import { EMPTY_STRING } from 'constants/common';
import s from 'styles/Modal.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type NewPackType = {
  showCreate: (modal: boolean) => void;
  addPack: (title: string) => void;
};

export const NewPack: React.FC<NewPackType> = ({
  showCreate,
  addPack,
}): ReturnComponentType => {
  const [newName, setNewName] = useState(EMPTY_STRING);

  const addNewPack = (): void => {
    addPack(newName);
  };
  return (
    <div className={s.containerModal}>
      <h1 className={s.titleModal}>Create new Pack</h1>
      <Input
        title=""
        placeholder="enter pack name"
        onChangeText={setNewName}
        value={newName}
        type="text"
      />
      <Button onClick={addNewPack} className={s.buttonLRMargin}>
        add
      </Button>
      <Button onClick={() => showCreate(false)} className={s.buttonLRMargin}>
        cancel
      </Button>
    </div>
  );
};
