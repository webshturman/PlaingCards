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
        type="text"
        onChange={handleInputValueChange}
        className={finalInputClassName}
      />
      {error && <span className={finalSpanClassName}>{error}</span>}
    </div>
  );
};
