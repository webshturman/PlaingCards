import React, { useState } from 'react';

import { EMPTY_STRING } from '../../../../../constants/common';
import { ReturnComponentType } from '../../../../../types/ReturnComponentType';
import { Button } from '../CustomButton/Button';
import { Input } from '../CustomInput/Input';

type NewCardType = {
  showCreate: (modal: boolean) => void;
  handleAddCard: () => void;
};

export const NewCard: React.FC<NewCardType> = ({
  showCreate,
  handleAddCard,
}): ReturnComponentType => {
  const [newName, setNewName] = useState(EMPTY_STRING);

  const addNewCard = (): void => {
    handleAddCard();
  };

  return (
    <div>
      <h1>Create new Card</h1>
      <Input
        title=""
        placeholder="pack name"
        onChangeText={setNewName}
        value={newName}
        type="text"
      />
      <Button onClick={() => addNewCard()}>add</Button>
      <Button onClick={() => showCreate(false)}>cancel</Button>
    </div>
  );
};
