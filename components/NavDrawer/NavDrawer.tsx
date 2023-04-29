"use client";
import Link from "next/link";
import { Button } from "../Button/Button";
import styles from "./NavDrawer.module.css";
import { MdPerson, MdPlaylistPlay, MdPersonSearch } from "react-icons/md";
import { usePathname } from "next/navigation";

export const NavDrawer = (): JSX.Element => {
    const pathname = usePathname();
    return <div className={styles["nav-drawer"]}>
        <Link href="profile/" className={styles.link}>
            <Button className={pathname === "/profile" ? styles["button-active"] : styles.button}>
                <MdPerson size="20px"></MdPerson>
                <p>My Profile</p>
            </Button>
        </Link>
        <Link href="profile/myplaylists" className={styles.link}>
            <Button className={pathname === "/profile/myplaylists" ? styles["button-active"] : styles.button}>
                <MdPlaylistPlay size="20px"></MdPlaylistPlay>
                <p>My Playlists</p>
            </Button>
        </Link>
        <Link href="profile/otherusers" className={styles.link}>
            <Button className={pathname?.startsWith("/profile/otherusers") ? styles["button-active"] : styles.button}>
                <MdPersonSearch size="20px"></MdPersonSearch>
                <p>Other Users</p>
            </Button>
        </Link>
    </div>;
};