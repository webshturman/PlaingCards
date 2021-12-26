import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { setCardsId } from '../../m2-bll/actions/learn-actions';
import { cardsType } from '../../m3-dal/types/cardsType';

import { Button } from './common/CustomButton/Button';
import { Loader } from './common/Loader';

import { AppRootState } from 'a1-main/m2-bll/store';
import { getCards, incrementQuestionNumber } from 'a1-main/m2-bll/thunks/learn-thunk';
import { ONE, ZERO_LENGTH } from 'constants/common';
import { PATH } from 'enums/routes';
import s from 'styles/Learn.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Learn = (): ReturnComponentType => {
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  const cards = useSelector<AppRootState, any>(state => state.learn.cards);
  const questionNumber = useSelector<AppRootState, any>(
    state => state.learn.questionNumber,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { packName, packId } = location.state;
  const showAnswer = (currentQuestionNumber: number): void => {
    dispatch(incrementQuestionNumber(currentQuestionNumber + ONE));
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
        <div className={s.Block}>
          <span className={s.titleCardsBlock}>This card pack has no any cards</span>
          <Button className={s.Button} type="button" onClick={() => navigate(PATH.CARDS)}>
            Exit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.Container}>
      <div className={s.Block}>
        <h1 className={s.titleCardsBlock}>Learn card pack: {packName}</h1>
        <div>Question</div>
        <div className={s.buttonContainer}>
          <Button className={s.Button} type="button" onClick={() => navigate(PATH.CARDS)}>
            Exit
          </Button>
          <Button
            className={s.Button}
            type="button"
            onClick={() => {
              showAnswer(questionNumber);
            }}
          >
            Show answer
          </Button>
        </div>
      </div>
    </div>
  );
};
