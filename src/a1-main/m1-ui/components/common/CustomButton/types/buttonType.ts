import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export type ButtonType = DefaultButtonPropsType & {
  title?: string;
  className?: string;
  condition?: boolean;
};
