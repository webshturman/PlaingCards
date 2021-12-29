import React, { FC } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from './common/CustomButton/Button';

import { AppRootState } from 'a1-main/m2-bll/store';
import { FIRST_ELEMENT, SECOND_ELEMENT } from 'constants/common';
import { PATH } from 'enums/routes';
import style from 'styles/Button.module.css';
import s from 'styles/Table.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type UniversalTableType = {
  items: Array<any>;
  headers: { [x: string]: string };
  sortFunction: (value: string) => void;
  showDelete: (modal: boolean) => void;
  showUpdate: (modal: boolean) => void;
  setId: (id: string) => void;
};
export const UniversalTable: FC<UniversalTableType> = ({
  items,
  headers,
  sortFunction,
  showUpdate,
  showDelete,
  setId,
}): ReturnComponentType => {
  // @ts-ignore
  const userId = useSelector<AppRootState, string>(state => state.profile._id);
  const navigate = useNavigate();
  return (
    <table className={s.table}>
      <tr>
        {Object.entries(headers).map(el => (
          <th key={el[FIRST_ELEMENT]} className={s.headerItem}>
            {el[SECOND_ELEMENT]}
            <div className={s.sortButtonContainer}>
              <Button
                className={style.sortButton}
                type="button"
                onClick={() => sortFunction(`0${el[FIRST_ELEMENT]}`)}
              >
                &#129045;
              </Button>
              <Button
                className={style.sortButton}
                type="button"
                onClick={() => sortFunction(`1${el[FIRST_ELEMENT]}`)}
              >
                &#129047;
              </Button>
            </div>
          </th>
        ))}
        <th>
          <span>actions</span>
        </th>
      </tr>
      {items.map(pack => (
        <tr key={pack._id}>
          {Object.keys(headers).map(el => (
            <td key={el}>
              <span>{pack[el]}</span>
            </td>
          ))}
          <td className={s.buttons}>
            {userId === pack.user_id && (
              <>
                <Button
                  className={style.deleteButton}
                  type="button"
                  onClick={() => {
                    showDelete(true);
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
                    setId(pack._id);
                  }}
                >
                  Update
                </Button>
              </>
            )}

            <Button
              className={style.cardButton}
              type="button"
              onClick={() => navigate(PATH.CARDS_TABLE, { state: pack._id })}
            >
              Card
            </Button>
            <Button
              className={style.learnButton}
              type="button"
              /* eslint-disable-next-line no-underscore-dangle */
              onClick={() =>
                navigate(PATH.LEARN, {
                  // eslint-disable-next-line no-underscore-dangle
                  state: { packId: pack._id, packName: pack.name },
                })
              }
            >
              Learn
            </Button>
          </td>
        </tr>
      ))}
    </table>
  );
};
