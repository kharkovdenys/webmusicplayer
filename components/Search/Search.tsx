import { SearchProps } from "./Search.props";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./Search.module.css";
import cn from "classnames";
import SearchIcon from "./search.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search = ({ className, placeholder, pathname, ...props }: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();
    const goToSearch = (): void => {
        navigate({
            pathname: pathname,
            search: `${search}`,
        });
        setSearch("");
    };
    return <form className={cn(className, styles.search)} autoComplete={"off"} role={"search"} onSubmit={(e): void => e.preventDefault()} {...props} >
        <Input placeholder={placeholder} type={"text"} value={search} variant="search"
            onChange={(e): void => setSearch(e.target.value)} />
        <Button onClick={goToSearch}><SearchIcon className={styles.icon} /></Button>
    </form>;
};
