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
  deleteItem: (id: string) => void;
  updateItem: (id: string, title: string) => void;
  sortFunction: (value: string) => void;
  addBlock: () => void;
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  extraButton?: string;
};
export const UniversalTable: FC<UniversalTableType> = ({
  items,
  headers,
  deleteItem,
  updateItem,
  sortFunction,
  addBlock,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  extraButton,
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
                up
              </Button>
              <Button
                className={style.sortButton}
                type="button"
                onClick={() => sortFunction(`1${el[FIRST_ELEMENT]}`)}
              >
                down
              </Button>
            </div>
          </th>
        ))}
        <th>
          <Button type="button" onClick={() => addBlock()}>
            Add
          </Button>
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
              /* eslint-disable-next-line no-underscore-dangle */
              onClick={() => deleteItem(pack._id)}
            >
              Delete
            </Button>

            <Button
              className={style.updateButton}
              type="button"
              /* eslint-disable-next-line no-underscore-dangle */
              onClick={() => updateItem(pack._id, 'x0x0x0x00x')}
            >
              Update
            </Button>
            {extraButton && (
              <Button
                className={style.cardButton}
                type="button"
                /* eslint-disable-next-line no-underscore-dangle */
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
