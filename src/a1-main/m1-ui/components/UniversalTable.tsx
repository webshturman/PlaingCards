import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import { SortButton } from 'a1-main/m1-ui/components/common/SortButton';
import { TableActionButtons } from 'a1-main/m1-ui/components/common/TableActionsButton';
import { TableNavigateButtons } from 'a1-main/m1-ui/components/common/TableNavigateButtons';
import { AppRootState } from 'a1-main/m2-bll/store';
import { FIRST_ELEMENT, SECOND_ELEMENT } from 'constants/common';
import s from 'styles/Table.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type UniversalTableType = {
  items: Array<any>;
  headers: { [x: string]: string };
  sortFunction: (value: string) => void;
  showDelete: (modal: boolean) => void;
  showUpdate: (modal: boolean) => void;
  setId: (id: string) => void;
  // eslint-disable-next-line react/require-default-props
  buttons?: boolean;
};
export const UniversalTable: FC<UniversalTableType> = ({
  items,
  headers,
  sortFunction,
  showUpdate,
  showDelete,
  setId,
  buttons,
}): ReturnComponentType => {
  // @ts-ignore
  const userId = useSelector<AppRootState, string>(state => state.profile._id);
  // const navigate = useNavigate();

  return (
    <table className={s.table}>
      <thead>
        <tr>
          {Object.entries(headers).map(el => (
            <th key={el[FIRST_ELEMENT]} className={s.headerItem}>
              {el[SECOND_ELEMENT]}
              <SortButton
                elementOne={`0${el[FIRST_ELEMENT]}`}
                elementTwo={`1${el[FIRST_ELEMENT]}`}
                sortFunction={sortFunction}
              />
            </th>
          ))}
          <th>
            <span>actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map(pack => (
          <tr key={pack._id}>
            {Object.keys(headers).map(el => (
              <td key={el}>
                <span>{pack[el]}</span>
              </td>
            ))}
            <td className={s.buttons}>
              {userId === pack.user_id && (
                <TableActionButtons
                  showDelete={showDelete}
                  showUpdate={showUpdate}
                  setId={setId}
                  packID={pack._id}
                />
              )}
              {buttons && (
                <TableNavigateButtons
                  packName={pack.name}
                  packId={pack._id}
                  userIdOwnerThisPack={pack.user_id}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
