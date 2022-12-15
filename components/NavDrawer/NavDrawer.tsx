"use client";
import Link from "next/link";
import { Button } from "../Button/Button";
import styles from "./NavDrawer.module.css";
import ProfileIcon from "./profile.svg";
import UserIcon from "./user.svg";
import PlaylistIcon from "./playlist.svg";
import { usePathname } from "next/navigation";

export const NavDrawer = (): JSX.Element => {
    const pathname = usePathname();
    return <div className={styles["nav-drawer"]}>
        <Link href="profile/" className={styles.link}>
            <Button className={pathname === "/profile" ? styles["button-active"] : styles.button}>
                <ProfileIcon className={styles.icon}></ProfileIcon>
                <p>My Profile</p>
            </Button>
        </Link>
        <Link href="profile/myplaylists" className={styles.link}>
            <Button className={pathname === "/profile/myplaylists" ? styles["button-active"] : styles.button}>
                <PlaylistIcon className={styles.icon}></PlaylistIcon>
                <p>My Playlists</p>
            </Button>
        </Link>
        <Link href="profile/otherusers" className={styles.link}>
            <Button className={pathname?.startsWith("/profile/otherusers") ? styles["button-active"] : styles.button}>
                <UserIcon className={styles.icon}></UserIcon>
                <p>Other Users</p>
            </Button>
        </Link>
    </div>;
};