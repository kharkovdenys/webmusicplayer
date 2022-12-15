import { useRouter } from "next/navigation";
import styles from "./Back.module.css";
import BackIcon from "./back.svg";

export const Back = (): JSX.Element => {
    const router = useRouter();
    return (
        <BackIcon
            onClick={(): void => router.back()}
            className={styles.back}
        />
    );
};
