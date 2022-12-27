import styles from "./CircularProgress.module.css";
import { CircularProgress as CircularProgressSVG } from "../../public/static/svg";
import { CircularProgressProps } from "./CircularProgress.props";
import clsx from 'clsx';

export const CircularProgress = ({ className, variant, ...props }: CircularProgressProps): JSX.Element => {
    return <CircularProgressSVG className={clsx(className, variant && styles[variant], styles.svg)} {...props}></CircularProgressSVG>;
};