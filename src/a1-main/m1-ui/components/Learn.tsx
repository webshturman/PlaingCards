import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { setCardsId } from '../../m2-bll/actions/learn-actions';
import { cardsType } from '../../m3-dal/types/cardsType';

import { Button } from './common/CustomButton/Button';
import Radio from './common/CustomRadio/CustomRadio';
import { Loader } from './common/Loader';

import { AppRootState } from 'a1-main/m2-bll/store';
import {
  changeAnswerStatus,
  getCards,
  changeQuestionNumber,
} from 'a1-main/m2-bll/thunks/learn-thunk';
import { ONE, ZERO, ZERO_LENGTH } from 'constants/common';
import { PATH } from 'enums/routes';
import s from 'styles/Learn.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Learn = (): ReturnComponentType => {
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  const cards = useSelector<AppRootState, any>(state => state.learn.cards);
  const questionCount = useSelector<AppRootState, any>(
    state => state.learn.cardsTotalCount,
  );
  const questionNumber = useSelector<AppRootState, any>(
    state => state.learn.questionNumber,
  );
  const isShowAnswer = useSelector<AppRootState, boolean>(
    state => state.learn.isShowAnswer,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { packName, packId } = location.state;
  const options = [
    'Did not know',
    'Forgot',
    'A lot of thought',
    'Confused',
    'Knew the answer',
  ];
  const [radioValue, setRadioValue] = useState<string | undefined>(undefined);
  const endLearnCondition = isShowAnswer && questionNumber + ONE === questionCount;

  const showAnswer = (): void => {
    dispatch(changeAnswerStatus(true));
  };
  const nextQuestion = (currentQuestionNumber: number): void => {
    setRadioValue(undefined);
    dispatch(changeAnswerStatus(false));
    dispatch(changeQuestionNumber(currentQuestionNumber + ONE));
  };
  const exit = (): void => {
    dispatch(changeQuestionNumber(ZERO));
    dispatch(changeAnswerStatus(false));
    navigate(PATH.CARDS);
  };

  if (cards.length !== ZERO_LENGTH) {
    const cardsId = cards.map(
      (card: cardsType) =>
        // eslint-disable-next-line no-underscore-dangle
        card._id,
    );
    dispatch(setCardsId(cardsId));
  }

  useEffect(() => {
    dispatch(getCards(packId));
  }, []);

  if (status) {
    return <Loader />;
  }

  if (cards.length === ZERO_LENGTH) {
    return (
      <div className={s.Container}>
        <span className={s.title}>This card pack has no any cards</span>
        <Button className={s.Button} type="button" onClick={() => exit()}>
          Exit
        </Button>
      </div>
    );
  }

  return (
    <div className={s.Container}>
      <h1 className={s.title}>Learn card pack: {packName}</h1>
      <div className={s.textBlock}>
        <div>
          Question {questionNumber + ONE} of {questionCount}:
        </div>
        <div>{cards[questionNumber].question}</div>
      </div>
      {isShowAnswer && (
        <>
          <div className={s.textBlock}>
            <div>Answer:</div>
            <div>{cards[questionNumber].answer}</div>
          </div>
          <div className={s.rateContainer}>
            <span>Rate yourself:</span>
            <Radio
              name="radio"
              options={options}
              value={radioValue}
              onChangeOption={setRadioValue}
              containerClass={s.radioContainer}
            />
          </div>
          <div className={s.buttonContainer}>
            <Button className={s.Button} type="button" onClick={() => exit()}>
              Exit
            </Button>
            <Button
              className={s.Button}
              type="button"
              onClick={() => (endLearnCondition ? exit() : nextQuestion(questionNumber))}
              disabled={!radioValue}
            >
              {endLearnCondition ? <div>Done</div> : <div>Next</div>}
            </Button>
          </div>
        </>
      )}
      {!isShowAnswer && (
        <div className={s.buttonContainer}>
          <Button className={s.Button} type="button" onClick={() => exit()}>
            Exit
          </Button>
          <Button className={s.Button} type="button" onClick={() => showAnswer()}>
            Show answer
          </Button>
        </div>
      )}
    </div>
  );
};
