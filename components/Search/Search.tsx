"use client";
import { SearchProps } from "./Search.props";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./Search.module.css";
import clsx from 'clsx';
import { MdSearch } from "react-icons/md";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export const Search = ({ className, placeholder, pathname, ...props }: SearchProps): JSX.Element => {
    const search = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const goToSearch = (): void => {
        if (pathname)
            router.push(pathname + '?=' + search.current?.value);
    };
    return <form className={clsx(className, styles.search)} autoComplete={"off"} role={"search"} onSubmit={(e): void => { e.preventDefault(); goToSearch(); }} {...props} >
        <Input placeholder={placeholder} type={"text"} ref={search} variant="search" />
        <Button type="submit"><MdSearch className={styles.icon} /></Button>
    </form>;
};
