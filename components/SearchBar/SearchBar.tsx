import { SearchBarProps } from "./SearchBar.props";
import { Button } from "../Button/Button";
import { Search } from "../Search/Search";
import WebLogo from "./webplayer.svg";
import PersonIcon from "./person.svg";
import styles from "./SearchBar.module.css";
import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "cookies-next";

export const SearchBar = ({ className, ...props }: SearchBarProps): JSX.Element => {
    const navigate = useNavigate();
    return <div className={cn(className, styles.searchbar)} {...props} >
        <Link to={"/"} className={styles.link}>
            <WebLogo className={styles.logo} ></WebLogo>
        </Link>
        <Search placeholder="Search Music" className={styles.search} />
        <Button className={styles["icon-button"]} onClick={(): void => getCookie("token") === undefined ? navigate("/login") : navigate("/profile")}><PersonIcon className={styles.icon}></PersonIcon></Button>
    </div>;
};
