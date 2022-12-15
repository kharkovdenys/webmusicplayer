"use client";
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Button } from "../Button/Button";
import { Search } from "../Search/Search";
import WebLogo from "./webplayer.svg";
import PersonIcon from "./person.svg";
import styles from "./SearchBar.module.css";
import cn from "classnames";
import Link from 'next/link';
import { getCookie } from "cookies-next";
import { useRouter } from 'next/navigation';

export const SearchBar = ({ className, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element => {
    const router = useRouter();
    return <div className={cn(className, styles.searchbar)} {...props} >
        <Link href="/" className={styles.link}>
            <WebLogo className={styles.logo} ></WebLogo>
        </Link>
        <Search placeholder="Search Music" className={styles.search} pathname='/search' />
        <Button className={styles["icon-button"]} onClick={(): void => getCookie("token") === undefined ? router.push("/login") : router.push("/profile")}><PersonIcon className={styles.icon}></PersonIcon></Button>
    </div>;
};
