import { SearchProps } from "./Search.props";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./Search.module.css";
import cn from "classnames";

export const Search = ({ className, placeholder, ...props }: SearchProps): JSX.Element => {
    return <form className={cn(className, styles.search)} autoComplete={"off"} role={"search"} {...props} >
        <Input placeholder={placeholder} name={"search_music"} type={"text"} />
        <Button>Search</Button>
    </form>;
};
