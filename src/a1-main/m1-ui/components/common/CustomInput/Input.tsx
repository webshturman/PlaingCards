import { ChangeEvent, FC } from 'react';

import { CustomInputType } from './types/CustomInputType';

import style from 'styles/Input.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Input: FC<CustomInputType> = ({
  title,
  onChangeText,
  error,
  className,
  spanClassName,
  value,
  type,
}): ReturnComponentType => {
  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChangeText) {
      onChangeText(e.currentTarget.value.trim());
    }
  };

  const finalSpanClassName = `${style.error} ${spanClassName || ''}`;
  const finalInputClassName = `${
    error ? style.errorInput : style.superInput
  } ${className}`;

  return (
    <div>
      <h1>{title}</h1>
      <input
        type={type}
        onChange={handleInputValueChange}
        className={finalInputClassName}
        value={value}
      />
      {error && <span className={finalSpanClassName}>{error}</span>}
    </div>
  );
};
