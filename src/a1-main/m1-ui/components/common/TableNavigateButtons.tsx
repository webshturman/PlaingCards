import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from 'a1-main/m1-ui/components/common/CustomButton/Button';
import { PATH } from 'enums/routes';
import style from 'styles/Button.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type TableActionButtonsType = {
  packName: string;
  packId: string;
};

export const TableNavigateButtons: FC<TableActionButtonsType> = ({
  packName,
  packId,
}): ReturnComponentType => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className={style.cardButton}
        type="button"
        onClick={() => navigate(PATH.CARDS_TABLE, { state: packId })}
      >
        Cards
      </Button>
      <Button
        className={style.learnButton}
        type="button"
        onClick={() =>
          navigate(PATH.LEARN, {
            state: { packId, packName },
          })
        }
      >
        Learn
      </Button>
    </>
  );
};
