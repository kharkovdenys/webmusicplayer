import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from "./Banner.module.css";
import cn from "classnames";

export const Banner = ({ className, children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element => {
    return <div className={cn(className, styles.banner)} {...props} >
        <p className={styles.text}>{children}</p>
    </div>;
};