import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: string;
}