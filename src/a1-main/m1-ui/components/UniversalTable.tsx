import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { FIRST_ELEMENT, SECOND_ELEMENT } from '../../../constants/common';
import { PATH } from '../../../enums/routes';
import s from '../../../styles/Table.module.css';
import { ReturnComponentType } from '../../../types/ReturnComponentType';

type UniversalTableType = {
  items: Array<any>;
  headers: { [x: string]: string };
  deleteItem: (id: string) => void;
  updateItem: (id: string, title: string) => void;
  sortFunction: (value: string) => void;
  addBlock: () => void;
};
export const UniversalTable: FC<UniversalTableType> = ({
  items,
  headers,
  deleteItem,
  updateItem,
  sortFunction,
  addBlock,
}): ReturnComponentType => {
  const navigate = useNavigate();
  return (
    <table className={s.table}>
      <tr>
        {Object.entries(headers).map(el => (
          <th key={el[FIRST_ELEMENT]}>
            {el[SECOND_ELEMENT]}
            <button type="button" onClick={() => sortFunction(`0${el[FIRST_ELEMENT]}`)}>
              верх
            </button>
            <button type="button" onClick={() => sortFunction(`1${el[FIRST_ELEMENT]}`)}>
              низ
            </button>
          </th>
        ))}
        <th>
          <button type="button" onClick={() => addBlock()}>
            add
          </button>
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
            <button
              type="button"
              /* eslint-disable-next-line no-underscore-dangle */
              onClick={() => navigate(PATH.CARDS_TABLE, { state: pack._id })}
            >
              Cards
            </button>
            {/* eslint-disable-next-line no-underscore-dangle */}
            <button type="button" onClick={() => deleteItem(pack._id)}>
              delete
            </button>
            <button
              type="button"
              /* eslint-disable-next-line no-underscore-dangle */
              onClick={() => updateItem(pack._id, 'x0x0x0x00x')}
            >
              update
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
};
