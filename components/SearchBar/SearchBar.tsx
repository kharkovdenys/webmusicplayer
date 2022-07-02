import { SearchBarProps } from "./SearchBar.props";
import { Button } from "../Button/Button";
import { Search } from "../Search/Search";
import WebLogo from "./webplayer.svg";
import PersonIcon from "./person.svg";
import styles from "./SearchBar.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";

export const SearchBar = ({ className, ...props }: SearchBarProps): JSX.Element => {
    return <div className={cn(className, styles.searchbar)} {...props} >
        <Link to={"/"} className={styles.link}>
            <WebLogo className={styles.logo} ></WebLogo>
        </Link>
        <Search placeholder="Search Music" className={styles.search} />
        <Button className={styles["icon-button"]}><PersonIcon className={styles.icon}></PersonIcon></Button>
    </div>;
};
