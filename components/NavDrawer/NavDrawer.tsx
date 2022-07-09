import { NavLink, useLocation } from "react-router-dom";
import { Button } from "../Button/Button";
import styles from "./NavDrawer.module.css";
import ProfileIcon from "./profile.svg";
import UserIcon from "./user.svg";
import PlaylistIcon from "./playlist.svg";

export const NavDrawer = (): JSX.Element => {
    const location = useLocation();
    return <div className={styles["nav-drawer"]}>
        <NavLink to="" className={styles.link}>
            <Button className={location.pathname === "/profile" ? styles["button-active"] : styles.button}>
                <ProfileIcon className={styles.icon}></ProfileIcon>
                <p>My Profile</p>
            </Button>
        </NavLink>
        <NavLink to="myplaylists" className={styles.link}>
            <Button className={location.pathname === "/profile/myplaylists" ? styles["button-active"] : styles.button}>
                <PlaylistIcon className={styles.icon}></PlaylistIcon>
                <p>My Playlists</p>
            </Button>
        </NavLink>
        <NavLink to="otherusers" className={styles.link}>
            <Button className={location.pathname.startsWith("/profile/otherusers") ? styles["button-active"] : styles.button}>
                <UserIcon className={styles.icon}></UserIcon>
                <p>Other Users</p>
            </Button>
        </NavLink>
    </div>;
};