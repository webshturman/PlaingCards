import { ChangeEvent, FC, memo } from 'react';

import { CheckboxType } from './types/checkBoxType';

import style from 'styles/CheckBox.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Checkbox: FC<CheckboxType> = memo(
  ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
    onChangeChecked,
    className,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    spanClassName,
    children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
  }): ReturnComponentType => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
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
          onChange={onChangeCallback}
          className={finalInputClassName}
        />
        {children && <span className={style.spanClassName}>{children}</span>}
      </label> // благодаря label нажатие на спан передастся в инпут
    );
  },
);
