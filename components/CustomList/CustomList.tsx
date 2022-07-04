import { CustomListProps } from "./CustomList.props";
import styles from "./CustomList.module.css";
import cn from "classnames";
import Image from "next/image";
import PlayIcon from "../Player/play.svg";
import { AppContext } from "../../context/app.context";
import { useContext } from "react";
import { Music } from "../../interfaces/music.interface";

export function isMusic(object: unknown): object is Music {
    return Object.prototype.hasOwnProperty.call(object, "videoId");
}

export const CustomList = ({ musics, className, ...props }: CustomListProps): JSX.Element => {
    const { setPlaylist, setCurrent } = useContext(AppContext);
    return (
        <ul className={cn(className, styles.list)} {...props}>
            {musics.map((music) => (
                <li
                    className={styles.li}
                    key={isMusic(music) ? music.videoId : music.tracks[0].videoId}
                    onClick={(): void => { setCurrent?.(0); setPlaylist?.(isMusic(music) ? [music] : music.tracks); }}>
                    <div className={styles["div-image"]}>
                        <Image
                            className={styles.image}
                            alt="Album"
                            src={isMusic(music) ? music.thumbnail?.[0].url ?? "" : music.tracks[0].thumbnail?.[0].url ?? ""}
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
                </li>
            ))
            }
        </ul >
    );
};