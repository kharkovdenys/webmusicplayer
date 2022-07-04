import { BannerProps } from "./Banner.props";
import styles from "./Banner.module.css";
import cn from "classnames";

export const Banner = ({ className, children, ...props }: BannerProps): JSX.Element => {
    return <div className={cn(className, styles.banner)} {...props} >
        <p className={styles.text}>{children}</p>
    </div>;
};