import { PlaylistListProps } from "./PlaylistList.props";
import styles from "./PlaylistList.module.css";
import clsx from 'clsx';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { PlayIcon, DeletePlaylistIcon } from "../../public/static/svg";
import { getCookie } from "cookies-next";

export const PlaylistList = ({ playlists, className, canDelete, update, ...props }: PlaylistListProps): JSX.Element => {
    const router = useRouter();
    const countsong = (count: string): string => {
        if (count === "1" || count === "0") return count + " song";
        return count + " songs";
    };
    const { setPlaylist, setCurrent } = useContext(AppContext);
    return (
        <ul className={clsx(className, styles.list)} {...props}>
            {playlists.map((playlist) => (
                <li
                    className={styles.li}
                    key={playlist.playlistId}
                    onClick={(): void => { router.push("/playlist?id=" + playlist.playlistId); }}>
                    <div className={styles["div-image"]} onClick={(e): void => {
                        e.stopPropagation();
                        axios.post(`${process.env.NEXT_PUBLIC_SEARCH_API}/get-music-from-playlist`, { id: playlist.playlistId }).then((response) => { setPlaylist?.(response.data.tracks); setCurrent?.(0); });
                    }}>
                        <Image
                            className={styles.image}
                            alt="Album"
                            src={playlist.thumbnail}
                            width={40}
                            height={40}
                        />
                        <PlayIcon
                            className={styles.play}
                        />
                    </div>
                    <div className={styles.texts} >
                        <span className={styles.title}>{playlist.title}</span>
                        <p className={styles.secondary}>{countsong(playlist.count)}</p>
                    </div>
                    <div onClick={(e): void => {
                        e.stopPropagation();
                        axios.post(`${process.env.NEXT_PUBLIC_SEARCH_API}/remove_playlist`, { id: playlist.playlistId }, { headers: { Authorization: getCookie("token") ?? "" } }).then(() => update?.());
                    }}
                        className={canDelete ? styles.visible : styles.hidden}>
                        <DeletePlaylistIcon style={{ display: "block", width: "35px" }} />
                    </div>
                </li>
            ))
            }
        </ul >
    );
};