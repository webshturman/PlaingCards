import { ChangeEvent, FC } from 'react';

import { useDispatch } from 'react-redux';

import { setEmailAC } from '../../../../m2-bll/actions/app-actions';

import { CustomInputType } from './types/CustomInputType';

import style from 'styles/Input.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Input: FC<CustomInputType> = ({
  // title,
  onChangeText,
  error,
  className,
  spanClassName,
  value,
  type,
}): ReturnComponentType => {
  const dispatch = useDispatch();
  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChangeText) {
      onChangeText(e.currentTarget.value.trim());
      dispatch(setEmailAC(e.currentTarget.value));
    }
  };

  const finalSpanClassName = `${style.error} ${spanClassName || ''}`;
  const finalInputClassName = `${
    error ? style.errorInput : style.superInput
  } ${className}`;

  return (
    <div>
      <input
        type={type}
        onChange={handleInputValueChange}
        className={finalInputClassName}
        value={value}
        placeholder={type}
      />
      {error && <span className={finalSpanClassName}>{error}</span>}
    </div>
  );
};
