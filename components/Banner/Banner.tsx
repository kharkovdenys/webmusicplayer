import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from "./Banner.module.css";
import clsx from 'clsx';

export const Banner = ({ className, children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element => {
    return <div className={clsx(className, styles.banner)} {...props} >
        <p className={styles.text}>{children}</p>
    </div>;
};