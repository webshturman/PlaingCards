import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { PATH } from '../../../enums/routes';
import style from '../../../styles/Login.module.css';
import s from '../../../styles/Table.module.css';
import { ReturnComponentType } from '../../../types/ReturnComponentType';

type UniversalTableType = {
  items: Array<any>;
  headers: { [x: string]: string };
  deleteItem: (id: string) => void;
  updateItem: (id: string, title: string) => void;
};
export const UniversalTable: FC<UniversalTableType> = ({
  items,
  headers,
  deleteItem,
  updateItem,
}): ReturnComponentType => (
  <div>
    <div className={s.tableColomn}>
      {Object.values(headers).map(el => (
        <div key={el} className={s.tableRow}>
          {el}
        </div>
      ))}
    </div>
    {items.map(pack => (
      // eslint-disable-next-line no-underscore-dangle
      <div key={pack._id} className={s.tableContainer}>
        <div className={s.tableColomn}>
          {Object.keys(headers).map(el => (
            <div key={el} className={s.tableRow}>
              <span>{pack[el]}</span>
            </div>
          ))}
          <div>
            <button type="button">
              <NavLink to={PATH.CARDS_TABLE} className={style.SignUp}>
                Cards
              </NavLink>
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
          </div>
        </div>
      </div>
    ))}
  </div>
);
