import React, { useState } from 'react';

import { DoubleRangeSlider } from './common/DoubleRangeSlider/DoubleRangeSlider';

import { FIRST_ELEMENT, SECOND_ELEMENT } from 'constants/common';
import s from 'styles/SelectingSidebar.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const SelectingSidebar = (): ReturnComponentType => {
  const startValue1 = 15;
  const startValue2 = 70;
  const [value1, setValue1] = useState<number>(startValue1);
  const [value2, setValue2] = useState<number>(startValue2);

  const onChangeDoubleRange = (values: [number, number]): any => {
    setValue1(values[FIRST_ELEMENT]);
    setValue2(values[SECOND_ELEMENT]);
  };

  return (
    <div className={s.SelectingSidebarContainer}>
      <div className={s.profile}>
        <div className={s.userAvatarContainer}>
          <div className={s.userAvatar} />
        </div>
        <div className={s.userName}>User name</div>
        <div className={s.userJobTitle}>User job title</div>
      </div>
      <div className={s.descriptionForDoubleRangeSlider}>Number of cards</div>
      <div className={s.DoubleRangeSliderContainer}>
        <DoubleRangeSlider
          startValues={[startValue1, startValue2]}
          min={0}
          max={100}
          step={1}
          disable={false}
          value1={value1}
          value2={value2}
          onChangeRange={onChangeDoubleRange}
        />
      </div>
    </div>
  );
};
