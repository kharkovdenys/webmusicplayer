import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from "./Avatar.module.css";
import clsx from 'clsx';

export const Avatar = ({ className, children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element => {
    return <div className={clsx(className, styles.avatar)} {...props} >
        {children}
    </div>;
};