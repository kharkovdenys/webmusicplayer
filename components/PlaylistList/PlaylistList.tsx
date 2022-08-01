import { PlaylistListProps } from "./PlaylistList.props";
import styles from "./PlaylistList.module.css";
import cn from "classnames";
import Image from "next/image";
import PlayIcon from "../Player/play.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import DeletePlaylistIcon from "./deleteplaylist.svg";
import { getCookie } from "cookies-next";

export const PlaylistList = ({ playlists, className, canDelete, update, ...props }: PlaylistListProps): JSX.Element => {
    const navigate = useNavigate();
    const countsong = (count: string): string => {
        if (count === "1" || count === "0") return count + " song";
        return count + " songs";
    };
    const { setPlaylist } = useContext(AppContext);
    return (
        <ul className={cn(className, styles.list)} {...props}>
            {playlists.map((playlist) => (
                <li
                    className={styles.li}
                    key={playlist.playlistId}
                    onClick={(): void => { navigate("/playlist?id=" + playlist.playlistId); }}>
                    <div className={styles["div-image"]} onClick={(e): void => {
                        e.stopPropagation();
                        axios.post("https://ytmusicsearch.azurewebsites.net/getmusicfromplaylist", { id: playlist.playlistId }).then((response) => { setPlaylist?.(response.data.tracks); });
                    }}>
                        <Image
                            className={styles.image}
                            alt="Album"
                            src={playlist.thumbnails?.[0].url}
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
                        axios.post("https://ytmusicsearch.azurewebsites.net/removeplaylist", { id: playlist.playlistId }, { headers: { Authorization: getCookie("token") ?? "" } }).then(() => update?.());
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