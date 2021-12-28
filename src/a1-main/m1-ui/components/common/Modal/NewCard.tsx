import React, { useState } from 'react';

import { EMPTY_STRING } from '../../../../../constants/common';
import s from '../../../../../styles/Modal.module.css';
import { ReturnComponentType } from '../../../../../types/ReturnComponentType';
import { Button } from '../CustomButton/Button';
import { Input } from '../CustomInput/Input';

type NewCardType = {
  showCreate: (modal: boolean) => void;
  handleAddCard: (question: string, answer: string) => void;
};

export const NewCard: React.FC<NewCardType> = ({
  showCreate,
  handleAddCard,
}): ReturnComponentType => {
  const [question, setQuestion] = useState(EMPTY_STRING);
  const [answer, setAnswer] = useState(EMPTY_STRING);

  const addNewCard = (): void => {
    handleAddCard(question, answer);
  };

  return (
    <div className={s.containerModal}>
      <h1 className={s.titleModal}>Create new Card</h1>
      <Input
        title=""
        placeholder="enter question"
        onChangeText={setQuestion}
        value={question}
        type="text"
      />
      <Input
        title=""
        placeholder="enter answer"
        onChangeText={setAnswer}
        value={answer}
        type="text"
      />
      <Button onClick={() => addNewCard()}>add</Button>
      <Button onClick={() => showCreate(false)}>cancel</Button>
    </div>
  );
};
