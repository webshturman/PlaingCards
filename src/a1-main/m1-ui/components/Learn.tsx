import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { BackArrow } from './common/BackArrow/BackArrow';
import { Button } from './common/CustomButton/Button';
import Radio from './common/CustomRadio/CustomRadio';
import { Loader } from './common/Loader';

import {
  setAnswerStatus,
  setCardsId,
  setQuestionNumber,
} from 'a1-main/m2-bll/actions/learn-actions';
import { AppRootState } from 'a1-main/m2-bll/store';
import { getCards, sendCardRate } from 'a1-main/m2-bll/thunks/learn-thunk';
import { cardsType } from 'a1-main/m3-dal/types/cardsType';
import { ZERO, ZERO_LENGTH, ONE } from 'constants/common';
import { PATH } from 'enums/routes';
import s from 'styles/Learn.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Learn = (): ReturnComponentType => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  const cards = useSelector<AppRootState, any>(state => state.learn.cards);
  const questionCount = useSelector<AppRootState, number>(
    state => state.learn.cardsTotalCount,
  );
  const questionNumber = useSelector<AppRootState, number>(
    state => state.learn.questionNumber,
  );
  const isShowAnswer = useSelector<AppRootState, boolean>(
    state => state.learn.isShowAnswer,
  );
  const { packName, packId } = location.state;
  const options = ['1', '2', '3', '4', '5'];
  const [radioValue, setRadioValue] = useState<string | undefined>(undefined);
  const endLearnCondition = isShowAnswer && questionNumber + ONE === questionCount;

  const clearLearnSessionData = (): void => {
    setRadioValue(undefined);
    dispatch(setQuestionNumber(ZERO));
    dispatch(setAnswerStatus(false));
  };

  const exit = (): void => {
    navigate(PATH.CARDS);
  };

  const showAnswer = (): void => {
    dispatch(setAnswerStatus(true));
  };

  const nextQuestion = (currentQuestionNumber: number): void => {
    // eslint-disable-next-line no-underscore-dangle
    const cardId = cards[currentQuestionNumber]._id;
    dispatch(sendCardRate(Number(radioValue), cardId));
    dispatch(setAnswerStatus(false));
    setRadioValue(undefined);
    dispatch(setQuestionNumber(currentQuestionNumber + ONE));
  };

  const sendAndExit = (currentQuestionNumber: number): void => {
    // eslint-disable-next-line no-underscore-dangle
    const cardId = cards[currentQuestionNumber]._id;
    const promise = dispatch(sendCardRate(Number(radioValue), cardId));
    Promise.all([promise]).then(() => {
      exit();
    });
  };

  useEffect(() => {
    dispatch(getCards(packId));
    return () => {
      clearLearnSessionData();
    };
  }, []);

  if (cards.length !== ZERO_LENGTH) {
    const cardsId = cards.map(
      (card: cardsType) =>
        // eslint-disable-next-line no-underscore-dangle
        card._id,
    );
    dispatch(setCardsId(cardsId));
  }

  if (status) {
    return <Loader />;
  }

  if (cards.length === ZERO_LENGTH) {
    return (
      <div className={s.Container}>
        <BackArrow />
        <span className={s.title}>This card pack has no any cards</span>
      </div>
    );
  }

  if (!AuthUserStatus) return <Navigate to={PATH.LOGIN_FORM} />;

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
              labelClass={s.radioLabel}
            />
          </div>
          <div className={s.buttonContainer}>
            <Button className={s.Button} type="button" onClick={() => exit()}>
              Exit
            </Button>
            <Button
              className={s.Button}
              type="button"
              onClick={() =>
                endLearnCondition
                  ? sendAndExit(questionNumber)
                  : nextQuestion(questionNumber)
              }
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
