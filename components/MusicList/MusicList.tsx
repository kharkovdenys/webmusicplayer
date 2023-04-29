"use client";
import { MusicListProps } from "./MusicList.props";
import styles from "./MusicList.module.css";
import clsx from 'clsx';
import Image from "next/image";
import { AppContext } from "../../context/app.context";
import { useContext, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { PlaylistDialog } from "../PlaylistDialog/PlaylistDialog";
import { MdPlayArrow, MdPlaylistRemove, MdPlaylistAdd } from "react-icons/md";


export const MusicList = ({ musics, className, afterDelete, playlistId, ...props }: MusicListProps): JSX.Element => {
    const { setPlaylist, setCurrent } = useContext(AppContext);
    const [showDialog, setShowDialog] = useState(false);
    const [current, setCurrentSong] = useState("");
    return (
        <>
            <ul className={clsx(className, styles.list)} {...props}>
                {musics.map((music) => (
                    <li
                        className={styles.li}
                        key={music[0].videoId}
                        onClick={(): void => { setCurrent?.(0); setPlaylist?.(music); getCookie("token") && axios.post(`${process.env.NEXT_PUBLIC_DATABASE_API}/musics`, { IdVideo: music[0].videoId }, { headers: { Authorization: getCookie("token") ?? "" } }); }}>
                        <div className={styles["div-image"]}>
                            <Image
                                className={styles.image}
                                alt="Album"
                                src={music[0].thumbnail}
                                width={40}
                                height={40}
                            />
                            <MdPlayArrow className={styles.play} />
                        </div>
                        <div className={styles.texts}>
                            <span className={styles.title}>{music[0].title}</span>
                            <p className={styles.secondary}>{music[0].artists + " - " + music[0].album}</p>
                        </div>
                        <div>
                            <div style={{ display: afterDelete !== undefined ? "block" : "none" }} onClick={(e): void => {
                                e.stopPropagation(); axios.post(`${process.env.NEXT_PUBLIC_SEARCH_API}/playlist/remove`, {
                                    id: playlistId,
                                    videoId: music[0].videoId,
                                    setVideoId: music[0].setVideoId
                                }, { headers: { Authorization: getCookie("token") ?? "" } }).then((): void => afterDelete?.());
                            }}><MdPlaylistRemove size="26px" /></div>
                            <div style={{ display: getCookie("token") !== undefined && afterDelete === undefined ? "block" : "none" }} onClick={(e): void => { e.stopPropagation(); setCurrentSong(music[0].videoId); setShowDialog(true); }}><MdPlaylistAdd size="26px" /></div>
                            <p className={styles.secondary}>{music[0].duration}</p>
                        </div>
                    </li>
                ))
                }
            </ul >
            <PlaylistDialog show={showDialog} setShow={setShowDialog} current={current}></PlaylistDialog>
        </>
    );
};