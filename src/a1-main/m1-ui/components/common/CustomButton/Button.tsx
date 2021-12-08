import { FC, memo } from 'react';

import { ButtonType } from './types/buttonType';

import style from 'styles/Button.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Button: FC<ButtonType> = memo(
  ({ children, className, condition }): ReturnComponentType => {
    const finalClassName = `${condition ? style.red : style.default} ${className}`;
    return (
      <button type="submit" className={finalClassName} disabled={condition}>
        {children}
      </button>
    );
  },
);
