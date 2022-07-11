import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { NewPlaylistProps } from "./NewPlaylist.props";
import styles from "./NewPlaylist.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import axios from "axios";
import { getCookie } from "cookies-next";

export const NewPlaylist = ({ show, onClose }: NewPlaylistProps): JSX.Element => {
    const [isBrowser, setIsBrowser] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const createPlaylist = async (): Promise<void> => {
        await axios.post("https://ytmusicsearch.azurewebsites.net/createplaylist", { name }, { headers: { Authorization: getCookie("token") ?? "" } });
    };

    const modalContent = show ? (
        <div className={styles["modal-overlay"]} role="presentation">
            <div className={styles.modal} onSubmit={createPlaylist}>
                <h2>New playlist</h2>
                <form className={styles.form}>
                    <Input
                        className={styles.input}
                        variant="form"
                        required
                        placeholder="Name"
                        autoComplete="playlistname"
                        onChange={(e): void => setName(e.target.value)}
                    />
                    <div className={styles.actions}>
                        <Button type="submit" className={styles.button}>
                            Create
                        </Button>
                        <Button onClick={onClose} className={styles.button}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div >
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root") as Element
        );
    } else {
        return <></>;
    }
};