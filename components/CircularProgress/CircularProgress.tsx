import styles from "./CircularProgress.module.css";
import CircularProgressSvg from "../../public/static/svg/circularprogress.svg";
import { CircularProgressProps } from "./CircularProgress.props";
import clsx from 'clsx';

export const CircularProgress = ({ className, variant, ...props }: CircularProgressProps): JSX.Element => {
    return <CircularProgressSvg className={clsx(className, variant && styles[variant], styles.svg)} {...props} />;
};