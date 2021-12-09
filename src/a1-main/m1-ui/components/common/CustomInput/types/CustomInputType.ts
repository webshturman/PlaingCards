import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type CustomInputType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  error?: string;
  spanClassName?: string;
  title: string;
};
