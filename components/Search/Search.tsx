import { SearchProps } from "./Search.props";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./Search.module.css";
import cn from "classnames";
import SearchIcon from "./search.svg";

export const Search = ({ className, placeholder, ...props }: SearchProps): JSX.Element => {
    return <form className={cn(className, styles.search)} autoComplete={"off"} role={"search"} {...props} >
        <Input placeholder={placeholder} name={"search_music"} type={"text"} />
        <Button><SearchIcon width={"24px"} height={"24px"} /></Button>
    </form>;
};
