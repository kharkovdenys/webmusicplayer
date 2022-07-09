import { AvatarProps } from "./Avatar.props";
import styles from "./Avatar.module.css";
import cn from "classnames";

export const Avatar = ({ className, children, ...props }: AvatarProps): JSX.Element => {
    return <div className={cn(className, styles.avatar)} {...props} >
        {children}
    </div>;
};