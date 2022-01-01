import React, { FC } from 'react';

import { Button } from 'a1-main/m1-ui/components/common/CustomButton/Button';
import style from 'styles/Button.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type TableActionButtonsType = {
  showDelete: (modal: boolean) => void;
  showUpdate: (modal: boolean) => void;
  setId: (id: string) => void;
  packID: string;
};

export const TableActionButtons: FC<TableActionButtonsType> = ({
  showDelete,
  showUpdate,
  setId,
  packID,
}): ReturnComponentType => (
  <>
    <Button
      className={style.deleteButton}
      type="button"
      onClick={() => {
        showDelete(true);
        setId(packID);
      }}
    >
      Delete
    </Button>

    <Button
      className={style.updateButton}
      type="button"
      onClick={() => {
        showUpdate(true);
        setId(packID);
      }}
    >
      Update
    </Button>
  </>
);
