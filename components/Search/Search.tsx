"use client";
import { SearchProps } from "./Search.props";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./Search.module.css";
import cn from "classnames";
import { SearchIcon } from "../../public/static/svg";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export const Search = ({ className, placeholder, pathname, ...props }: SearchProps): JSX.Element => {
    const search = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const goToSearch = (): void => {
        if (pathname)
            router.push(pathname + '?=' + search.current?.value);
    };
    return <form className={cn(className, styles.search)} autoComplete={"off"} role={"search"} onSubmit={(e): void => { e.preventDefault(); goToSearch(); }} {...props} >
        <Input placeholder={placeholder} type={"text"} ref={search} variant="search" />
        <Button type="submit"><SearchIcon className={styles.icon} /></Button>
    </form>;
};
