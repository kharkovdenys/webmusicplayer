import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";
import cn from "classnames";

export const Button = ({ className, children, ...props }: ButtonProps): JSX.Element => {
    return <button className={cn(className, styles.button)} {...props}>{children}</button>;
};
