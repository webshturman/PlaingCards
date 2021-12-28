import React, { ChangeEvent } from 'react';

import { RadioType } from './types/radioType';

import s from 'styles/CustomRadio.module.css';

const Radio: React.FC<RadioType> = ({
  name,
  options,
  value,
  onChangeOption,
  labelClass,
  containerClass,
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    onChangeOption(e.currentTarget.value);
  };

  const mappedOptions: React.ReactElement[] = options
    ? options.map((option, index) => (
        <label
          htmlFor={`radio${index}`}
          className={labelClass}
          key={`${name}${index.toString()}`}
        >
          <input
            type="radio"
            id={`radio${index}`}
            name={name}
            value={option}
            checked={option === value}
            onChange={onChangeCallback}
            className={option === value ? s.checkboxChecked : s.checkboxUnchecked}
          />
          {option}
        </label>
      ))
    : [];

  return <div className={containerClass}>{mappedOptions}</div>;
};

export default Radio;
