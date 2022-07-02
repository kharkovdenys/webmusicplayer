import { CustomListProps } from "./CustomList.props";
import styles from "./CustomList.module.css";
import cn from "classnames";
import Image from "next/image";
import PlayIcon from "../Player/play.svg";
import { AppContext } from "../../context/app.context";
import { useContext } from "react";

export const CustomList = ({ musics, className, ...props }: CustomListProps): JSX.Element => {
    const { setPlaylist, setCurrent } = useContext(AppContext);
    return (
        <ul className={cn(className, styles.list)} {...props}>
            {musics.map((music) => (
                <li
                    className={styles.li}
                    key={music.videoId}
                    onClick={(): void => { setCurrent?.(0); setPlaylist?.([music]); }}>
                    <div className={styles["div-image"]}>
                        <Image
                            className={styles.image}
                            alt="Album"
                            src={music.thumbnail?.[0].url ?? ""}
                            width={40}
                            height={40}
                        />
                        <PlayIcon
                            className={styles.play}
                        />
                    </div>
                    <div className={styles.texts}>
                        <span className={styles.title}>{music.title}</span>
                        <p className={styles.secondary}>{music.artists?.[0].name + " - " + music.album.name}</p>
                    </div>
                </li>
            ))
            }
        </ul >
    );
};