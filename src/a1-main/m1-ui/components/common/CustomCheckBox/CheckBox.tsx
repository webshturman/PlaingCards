import { ChangeEvent, FC, memo } from 'react';

import { CheckboxType } from './types/checkBoxType';

import style from 'styles/CheckBox.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Checkbox: FC<CheckboxType> = memo(
  ({ onChangeChecked, className, children }): ReturnComponentType => {
    const handleCheckboxValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
      if (onChangeChecked) {
        onChangeChecked(e.currentTarget.checked);
      }
    };

    const finalInputClassName = `${style.checkbox} ${className || ''}`;

    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label>
        <input
          type="checkbox"
          onChange={handleCheckboxValueChange}
          className={finalInputClassName}
        />
        {children && <span className={style.spanClassName}>{children}</span>}
      </label>
    );
  },
);
