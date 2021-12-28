import React from 'react';

import { useNavigate } from 'react-router-dom';

import arrowBack from 'assets/images/backArrow.png';
import { PREVIOUS_PAGE } from 'constants/common';
import style from 'styles/BackArrow.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const BackArrow = (): ReturnComponentType => {
  const navigate = useNavigate();
  const goBack = (): void => navigate(PREVIOUS_PAGE);
  return (
    <div className={style.backArrow}>
      <img
        src={arrowBack}
        alt=""
        onClick={goBack}
        role="presentation"
        className={style.backButton}
      />
      <span>Back</span>
    </div>
  );
};
