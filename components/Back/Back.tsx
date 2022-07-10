import { useNavigate, useNavigationType } from "react-router-dom";
import styles from "./Back.module.css";
import BackIcon from "./back.svg";

export const Back = (): JSX.Element => {
    const navigate = useNavigate();
    const NavigationType = useNavigationType();
    return (
        <BackIcon
            onClick={(): void => NavigationType === "PUSH" ? navigate(-1) : navigate("/")}
            className={styles.back}
        />
    );
};
