import { MusicListProps } from "./MusicList.props";
import styles from "./MusicList.module.css";
import cn from "classnames";
import Image from "next/image";
import PlayIcon from "../Player/play.svg";
import { AppContext } from "../../context/app.context";
import { useContext, useState } from "react";
import { Music } from "../../interfaces/music.interface";
import { getCookie } from "cookies-next";
import axios from "axios";
import { PlaylistDialog } from "../PlaylistDialog/PlaylistDialog";
import AddToPlaylistIcon from "./addtoplaylist.svg";
import RemoveFromPlaylistIcon from "./removefromplaylist.svg";

export function isMusic(object: unknown): object is Music {
    return Object.prototype.hasOwnProperty.call(object, "videoId");
}

export const MusicList = ({ musics, className, afterDelete, playlistId, ...props }: MusicListProps): JSX.Element => {
    const { setPlaylist, setCurrent } = useContext(AppContext);
    const [showDialog, setShowDialog] = useState(false);
    const [current, setCurrentSong] = useState("");
    return (
        <>
            <ul className={cn(className, styles.list)} {...props}>
                {musics.map((music) => (
                    <li
                        className={styles.li}
                        key={isMusic(music) ? music.videoId : music.tracks[0].videoId}
                        onClick={(): void => { setCurrent?.(0); setPlaylist?.(isMusic(music) ? [music] : music.tracks); getCookie("token") && axios.post("https://databaseandapi.azurewebsites.net/musics", { IdVideo: isMusic(music) ? music.videoId : music.tracks[0].videoId }, { headers: { Authorization: getCookie("token") ?? "" } }); }}>
                        <div className={styles["div-image"]}>
                            <Image
                                className={styles.image}
                                alt="Album"
                                src={(isMusic(music) ? music.thumbnail?.[0].url : music.tracks[0].thumbnail?.[0].url) ?? ""}
                                width={40}
                                height={40}
                            />
                            <PlayIcon
                                className={styles.play}
                            />
                        </div>
                        <div className={styles.texts}>
                            <span className={styles.title}>{isMusic(music) ? music.title : music.tracks[0].title}</span>
                            <p className={styles.secondary}>{isMusic(music) ? music.artists?.[0].name + " - " + music.album.name : music.tracks[0].artists?.[0].name + " - " + music.tracks[0].album.name}</p>
                        </div>
                        <div>
                            <div style={{ display: afterDelete !== undefined ? "block" : "none" }} onClick={(e): void => {
                                e.stopPropagation(); axios.post("https://ytmusicsearch.azurewebsites.net/playlist/remove", {
                                    id: playlistId,
                                    videoid: isMusic(music) ? music.videoId : music.tracks[0].videoId,
                                    setVideoId: isMusic(music) ? music.setVideoId : music.tracks[0].setVideoId
                                }, { headers: { Authorization: getCookie("token") ?? "" } }).then((): void => afterDelete?.());
                            }}><RemoveFromPlaylistIcon ></RemoveFromPlaylistIcon></div>
                            <div style={{ display: getCookie("token") !== undefined && afterDelete === undefined ? "block" : "none" }} onClick={(e): void => { e.stopPropagation(); setCurrentSong(isMusic(music) ? music.videoId : music.tracks[0].videoId); setShowDialog(true); }}><AddToPlaylistIcon ></AddToPlaylistIcon></div>
                            <p className={styles.secondary}>{isMusic(music) ? music.length : music.tracks[0].length}</p>
                        </div>
                    </li>
                ))
                }
            </ul >
            <PlaylistDialog show={showDialog} setShow={setShowDialog} current={current}></PlaylistDialog>
        </>
    );
};