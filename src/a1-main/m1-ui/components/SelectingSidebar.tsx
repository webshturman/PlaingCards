import React, { FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setMaxFilter, setMinFilter } from '../../m2-bll/actions/pack-action';

import { DoubleRangeSlider } from './common/DoubleRangeSlider/DoubleRangeSlider';
import { LoaderRelative } from './common/LoaderRelative';

import { AppRootState } from 'a1-main/m2-bll/store';
import { FIRST_ELEMENT, SECOND_ELEMENT } from 'constants/common';
import s from 'styles/SelectingSidebar.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type SideBarType = {
  // eslint-disable-next-line react/require-default-props
  children?: any;
};

export const SelectingSidebar: FC<SideBarType> = ({ children }): ReturnComponentType => {
  const dispatch = useDispatch();
  const min = useSelector<AppRootState, number>(state => state.cardspack.minCardsCount);
  const max = useSelector<AppRootState, number>(state => state.cardspack.maxCardsCount);
  const minFilter = useSelector<AppRootState, number>(state => state.cardspack.minFilter);
  const maxFilter = useSelector<AppRootState, number>(state => state.cardspack.maxFilter);
  const appStatus = useSelector<AppRootState, boolean>(state => state.app.status);
  const [value1, setValue1] = useState<number>(min);
  const [value2, setValue2] = useState<number>(max);

  const onUpdate = (values: [number, number]): void => {
    setValue1(values[FIRST_ELEMENT]);
    setValue2(values[SECOND_ELEMENT]);
  };

  const onChange = (values: [number, number]): void => {
    dispatch(setMinFilter(Math.round(Number(values[FIRST_ELEMENT]))));
    dispatch(setMaxFilter(Math.round(Number(values[SECOND_ELEMENT]))));
  };

  return (
    <div className={s.SelectingSidebarContainer}>
      <div className={s.profile}>
        {children}
        {/* <div className={s.userAvatarContainer}> */}
        {/*  <div className={s.userAvatar} /> */}
        {/* </div> */}
        {/* <div className={s.userName}>User name</div> */}
        {/* <div className={s.userJobTitle}>User job title</div> */}
      </div>
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
            value1={value1}
            value2={value2}
            onUpdate={onUpdate}
            onChange={onChange}
          />
        </div>
      )}
      {/* {appStatus && ( */}
      {/*  <div> */}
      {/*    <Loader /> */}
      {/*  </div> */}
      {/* )} */}
    </div>
  );
};
