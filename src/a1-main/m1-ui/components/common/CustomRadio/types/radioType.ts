import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type RadioType = DefaultRadioPropsType & {
  options: Array<string>;
  onChangeOption: (option: string) => void;
  labelClass?: string | undefined;
  containerClass?: string | undefined;
};
