import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PlaylistDialogProps } from "./PlaylistDialog.props";
import styles from "./PlaylistDialog.module.css";
import { Button } from "../Button/Button";
import { CircularProgress } from "../CircularProgress/CircularProgress";
import { Playlist } from "../../interfaces/playlist.interface";
import Image from "next/image";
import axios from "axios";
import { getCookie } from "cookies-next";
import { NewPlaylist } from "../NewPlaylist/NewPlaylist";

export const PlaylistDialog = ({ show, setShow, current }: PlaylistDialogProps): JSX.Element => {
    const [isBrowser, setIsBrowser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [showNewDialog, setShowNewDialog] = useState(false);
    const [update, setUpdate] = useState(false);

    const countsong = (count: string): string => {
        if (count === "1" || count === "0") return count + " song";
        return count + " songs";
    };

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    useEffect(() => {
        if (show || update) {
            setLoading(true);
            setUpdate(false);
            axios.get("https://ytmusicsearch.azurewebsites.net/getmyplaylist", { headers: { Authorization: getCookie("token") ?? "" } }).then((response) => { setPlaylists(response.data); setLoading(false); });
        }
    }, [show, update]
    );

    const modalContent = show && (
        <div className={styles["modal-overlay"]} role="presentation">
            <div className={styles.modal}>
                <h2>Add to playlist</h2>
                <CircularProgress style={{ display: loading ? "block" : "none" }} />
                <ul className={styles.list}>
                    {playlists.map((playlist) => (
                        <li
                            className={styles.li}
                            key={playlist.playlistId}
                            onClick={(): void => {
                                axios.post("https://ytmusicsearch.azurewebsites.net/playlist/add", {
                                    id: playlist.playlistId,
                                    videoid: current
                                }, { headers: { Authorization: getCookie("token") ?? "" } }); setShow(false);
                            }}
                        >
                            <Image
                                className={styles.image}
                                alt="Album"
                                src={playlist.thumbnails?.[0].url}
                                width={80}
                                height={80}
                            />
                            <div className={styles.texts} >
                                <span className={styles.title}>{playlist.title}</span>
                                <p className={styles.secondary}>{countsong(playlist.count)}</p>
                            </div>
                        </li>
                    ))
                    }
                </ul >
                <div className={styles.actions}>
                    <Button className={styles.button} onClick={(): void => { setShowNewDialog(true); }}>
                        Add playlist
                    </Button>
                    <Button onClick={(): void => setShow(false)} className={styles.button}>
                        Cancel
                    </Button>
                </div>
            </div>
            <NewPlaylist show={showNewDialog} onClose={(): void => { setShowNewDialog(false); setUpdate(true); }}></NewPlaylist>
        </div >
    );

    return isBrowser ? ReactDOM.createPortal(modalContent,
        document.getElementById("modal-root") as Element
    ) : <></>;
};