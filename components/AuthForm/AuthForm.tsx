import Link from "next/link";
import { CircularProgress } from "../CircularProgress/CircularProgress";
import { Button, Input } from "../index";
import { MdPersonOutline } from "react-icons/md";
import styles from "./AuthForm.module.css";
import { AuthFormProps } from "./AuthForm.props";

export const AuthForm = ({ variant, register, handleSubmit, Submit, loading }: AuthFormProps): JSX.Element => {
    return (
        <div>
            <MdPersonOutline className={styles.icon} />
            <p className={styles.text}>
                {variant === "register" ? "Sign Up" : "Sign In"}</p>
            <form
                onSubmit={handleSubmit(Submit)}
                className={styles.grid}>
                <CircularProgress className={loading ? styles.loading : styles.none} />
                <div className={!loading ? styles.grid : styles.hidden}>
                    <Input
                        {...register('name')}
                        className={styles.input}
                        variant="form"
                        required
                        placeholder="Username"
                        autoComplete="name"
                    />
                    <Input
                        {...register(variant === "register" ? "new-password" : "current-password")}
                        className={styles.input}
                        required
                        variant="form"
                        pattern=".........*"
                        placeholder="Password"
                        type="password"
                    />
                    <p className={styles["helper-text"]}>Minimum length password: 8</p>
                </div>
                < Button type="submit" className={styles.button}>
                    {variant === "register" ? "Register" : "Login"}
                </Button>
                <Link href={variant === "register" ? "/login" : "/register"} className={styles.link}>
                    {variant === "register" ? "Sign In" : "Sign Up"}
                </Link>
            </form>
        </div >
    );
};
