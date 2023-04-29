import { useRouter } from "next/navigation";
import styles from "./Back.module.css";
import { MdArrowBack } from "react-icons/md";

export const Back = (): JSX.Element => {
    const router = useRouter();
    return (
        <MdArrowBack
            onClick={(): void => router.back()}
            className={styles.back}
        />
    );
};
