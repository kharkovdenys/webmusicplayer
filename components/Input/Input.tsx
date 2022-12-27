import { InputProps } from "./Input.props";
import styles from "./Input.module.css";
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from "react";

export const Input = forwardRef(({ className, variant, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return <input className={clsx(className, styles[variant])} {...props} ref={ref} />;
});
Input.displayName = "CustomInput";