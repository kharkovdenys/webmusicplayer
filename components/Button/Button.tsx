import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";
import cn from "classnames";

export const Button = ({ className, children, variant, ...props }: ButtonProps): JSX.Element => {
    return <button className={cn(className, variant && styles[variant], styles.button)} {...props}>{children}</button>;
};
