import { FC } from 'react';

import { ButtonType } from './types/buttonType';

import style from 'styles/Button.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Button: FC<ButtonType> = ({
  children,
  className,
  condition,
  onClick,
}): ReturnComponentType => {
  const finalClassName = `${condition ? style.red : style.default} ${className}`;
  return (
    <button
      type="submit"
      className={finalClassName}
      onClick={onClick}
      disabled={condition}
    >
      {children}
    </button>
  );
};
