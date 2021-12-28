import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { FIRST_ELEMENT, SECOND_ELEMENT } from '../../../constants/common';
import { PATH } from '../../../enums/routes';
import style from '../../../styles/Button.module.css';
import s from '../../../styles/Table.module.css';
import { ReturnComponentType } from '../../../types/ReturnComponentType';

import { Button } from './common/CustomButton/Button';

type UniversalTableType = {
  items: Array<any>;
  headers: { [x: string]: string };
  sortFunction: (value: string) => void;
  showDelete: (modal: boolean) => void;
  showUpdate: (modal: boolean) => void;
  // eslint-disable-next-line react/require-default-props
  extraButton?: string;
  setId: (id: string) => void;
};
export const UniversalTable: FC<UniversalTableType> = ({
  items,
  headers,
  sortFunction,
  showUpdate,
  showDelete,
  extraButton,
  setId,
}): ReturnComponentType => {
  const navigate = useNavigate();
  return (
    <table className={s.table}>
      <tr>
        {Object.entries(headers).map(el => (
          <th key={el[FIRST_ELEMENT]} className={s.headerItem}>
            {el[SECOND_ELEMENT]}
            <div>
              <Button
                className={style.sortButton}
                type="button"
                onClick={() => sortFunction(`0${el[FIRST_ELEMENT]}`)}
              >
                &uArr;
              </Button>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <Button
                className={style.sortButton}
                onClick={() => sortFunction(`1${el[FIRST_ELEMENT]}`)}
              >
                &dArr;
              </Button>
            </div>
          </th>
        ))}
        <th>
          {/* <Button type="button" onClick={() => showCreate(true)}> */}
          {/*  Add */}
          {/* </Button> */}
          <span>actions</span>
        </th>
      </tr>
      {items.map(pack => (
        // eslint-disable-next-line no-underscore-dangle
        <tr key={pack._id}>
          {Object.keys(headers).map(el => (
            <td key={el}>
              <span>{pack[el]}</span>
            </td>
          ))}
          <td>
            <Button
              className={style.deleteButton}
              type="button"
              onClick={() => {
                showDelete(true);
                // eslint-disable-next-line no-underscore-dangle
                console.log('fffffffffffffff');
                setId(pack._id);
              }}
            >
              Delete
            </Button>

            <Button
              className={style.updateButton}
              type="button"
              onClick={() => {
                showUpdate(true);
                // eslint-disable-next-line no-underscore-dangle
                setId(pack._id);
              }}
            >
              Update
            </Button>
            {extraButton && (
              <Button
                className={style.cardButton}
                type="button"
                onClick={() => navigate(PATH.CARDS_TABLE, { state: pack._id })}
              >
                {extraButton}
              </Button>
            )}
          </td>
        </tr>
      ))}
    </table>
  );
};
