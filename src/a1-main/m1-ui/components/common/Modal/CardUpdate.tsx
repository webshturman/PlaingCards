import React, { useState } from 'react';

import { EMPTY_STRING } from '../../../../../constants/common';
import s from '../../../../../styles/Modal.module.css';
import { ReturnComponentType } from '../../../../../types/ReturnComponentType';
import { Button } from '../CustomButton/Button';
import { Input } from '../CustomInput/Input';

type CardUpdateType = {
  showUpdate: (modal: boolean) => void;
  handleUpdateCard: (question: string) => void;
};

export const CardUpdate: React.FC<CardUpdateType> = ({
  showUpdate,
  handleUpdateCard,
}): ReturnComponentType => {
  const [newName, setNewName] = useState(EMPTY_STRING);

  const updateCardName = (): void => {
    handleUpdateCard(newName);
  };
  return (
    <div className={s.containerModal}>
      <h1 className={s.titleModal}>Update Card</h1>
      <Input
        title=""
        placeholder="enter card name"
        onChangeText={setNewName}
        value={newName}
        type="text"
      />
      <Button onClick={updateCardName}>update</Button>
      <Button onClick={() => showUpdate(false)}>cancel</Button>
    </div>
  );
};
