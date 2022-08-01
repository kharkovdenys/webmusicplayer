import styles from "./CircularProgress.module.css";
import CircularProgressSVG from "./circularprogress.svg";
import { CircularProgressProps } from "./CircularProgress.props";
import cn from "classnames";

export const CircularProgress = ({ className, variant, ...props }: CircularProgressProps): JSX.Element => {
    return <CircularProgressSVG className={cn(className, variant && styles[variant], styles.svg)} {...props}></CircularProgressSVG>;
};