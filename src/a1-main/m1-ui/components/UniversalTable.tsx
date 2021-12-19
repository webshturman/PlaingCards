import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { PATH } from '../../../enums/routes';
import style from '../../../styles/Login.module.css';
import s from '../../../styles/Table.module.css';
import { ReturnComponentType } from '../../../types/ReturnComponentType';

type UniversalTableType = {
  items: Array<any>;
  headers: { [x: string]: string };
};
export const UniversalTable: FC<UniversalTableType> = ({
  items,
  headers,
}): ReturnComponentType => (
  <div>
    <div>
      {Object.values(headers).map(el => (
        <span key={el}>{el}</span>
      ))}
    </div>
    <div className={s.tableColomn}>v</div>
    {items.map(pack => (
      <div key={pack.id} className={s.tableContainer}>
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
          </div>
        </div>
      </div>
    ))}
  </div>
);
