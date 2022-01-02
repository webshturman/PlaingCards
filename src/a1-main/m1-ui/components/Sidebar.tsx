import React, { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { DoubleRangeSlider } from './common/DoubleRangeSlider/DoubleRangeSlider';
import { LoaderRelative } from './common/LoaderRelative';

import { setMaxFilter, setMinFilter } from 'a1-main/m2-bll/actions/pack-action';
import { AppRootState } from 'a1-main/m2-bll/store';
import { FIRST_ELEMENT, SECOND_ELEMENT, ZERO } from 'constants/common';
import s from 'styles/Sidebar.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type SideBarType = {
  // eslint-disable-next-line react/require-default-props
  children?: any;
};

export const Sidebar: FC<SideBarType> = ({ children }): ReturnComponentType => {
  const dispatch = useDispatch();
  const min = useSelector<AppRootState, number>(state => state.cardspack.minCardsCount);
  const max = useSelector<AppRootState, number>(state => state.cardspack.maxCardsCount);
  const minFilter = useSelector<AppRootState, number>(state => state.cardspack.minFilter);
  const maxFilter = useSelector<AppRootState, number>(state => state.cardspack.maxFilter);
  const appStatus = useSelector<AppRootState, boolean>(state => state.app.status);

  const onChange = (values: [number, number]): void => {
    dispatch(setMinFilter(Math.round(Number(values[FIRST_ELEMENT]))));
    dispatch(setMaxFilter(Math.round(Number(values[SECOND_ELEMENT]))));
  };

  // need to restore the filter values when after viewing the cards of the deck, the user click "Back"
  useEffect(() => {
    if (maxFilter === ZERO && max !== ZERO) {
      dispatch(setMinFilter(min));
      dispatch(setMaxFilter(max));
    }
  });

  return (
    <div className={s.SelectingSidebarContainer}>
      <div className={s.profile}>{children}</div>
      <div className={s.descriptionForDoubleRangeSlider}>Cards count in a pack</div>
      {appStatus && <LoaderRelative />}
      {!appStatus && (
        <div className={s.DoubleRangeSliderContainer}>
          <DoubleRangeSlider
            startValues={[minFilter, maxFilter]}
            min={min}
            max={max}
            step={1}
            disable={appStatus}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};
