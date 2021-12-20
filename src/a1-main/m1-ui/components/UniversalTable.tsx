import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { PATH } from '../../../enums/routes';
import s from '../../../styles/Table.module.css';
import { ReturnComponentType } from '../../../types/ReturnComponentType';

type UniversalTableType = {
  items: Array<any>;
  headers: { [x: string]: string };
};
export const UniversalTable: FC<UniversalTableType> = ({
  items,
  headers,
}): ReturnComponentType => {
  const navigate = useNavigate();
  return (
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
              <button
                type="button"
                /* eslint-disable-next-line no-underscore-dangle */
                onClick={() => navigate(PATH.CARDS_TABLE, { state: pack._id })}
              >
                Cards
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
