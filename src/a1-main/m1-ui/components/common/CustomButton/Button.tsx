import { FC } from 'react';

import { ButtonType } from './types/buttonType';

import style from 'styles/Button.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Button: FC<ButtonType> = ({
  children,
  className,
  condition,
  onClick,
  type,
}): ReturnComponentType => {
  const finalClassName = `${condition ? style.red : style.default} ${className}`;
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={finalClassName} onClick={onClick} disabled={condition}>
      {children}
    </button>
  );
};
