import React, { FC } from 'react';

import { Button } from 'a1-main/m1-ui/components/common/CustomButton/Button';
import style from 'styles/Button.module.css';
import s from 'styles/Table.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type SortButtonType = {
  elementOne: string;
  elementTwo: string;
  sortFunction: (value: string) => void;
};

export const SortButton: FC<SortButtonType> = ({
  elementOne,
  elementTwo,
  sortFunction,
}): ReturnComponentType => (
  <div className={s.sortButtonContainer}>
    <Button
      className={style.sortButton}
      type="button"
      onClick={() => sortFunction(elementOne)}
    >
      &#129045;
    </Button>
    <Button
      className={style.sortButton}
      type="button"
      onClick={() => sortFunction(elementTwo)}
    >
      &#129047;
    </Button>
  </div>
);
