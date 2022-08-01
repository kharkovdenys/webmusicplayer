import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from "./Avatar.module.css";
import cn from "classnames";

export const Avatar = ({ className, children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element => {
    return <div className={cn(className, styles.avatar)} {...props} >
        {children}
    </div>;
};