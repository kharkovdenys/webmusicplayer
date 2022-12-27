import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";
import clsx from 'clsx';

export const Button = ({ className, children, variant, ...props }: ButtonProps): JSX.Element => {
    return <button className={clsx(className, variant && styles[variant], styles.button)} {...props}>{children}</button>;
};
