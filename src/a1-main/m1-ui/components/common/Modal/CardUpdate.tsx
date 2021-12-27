import React, { useState } from 'react';

import { EMPTY_STRING } from '../../../../../constants/common';
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
    <div>
      <h1>Update Card</h1>
      <Input
        title=""
        placeholder="new pack name"
        onChangeText={setNewName}
        value={newName}
        type="text"
      />
      <Button onClick={updateCardName}>update</Button>
      <Button onClick={() => showUpdate(false)}>cancel</Button>
    </div>
  );
};
