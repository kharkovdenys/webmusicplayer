import { useRef, useState, useEffect, useContext } from "react";
import styles from "./Player.module.css";
import YouTube, { YouTubeEvent } from "react-youtube";
import { Range, getTrackBackground } from 'react-range';
import Image from "next/image";
import { Duration } from "../Duration/Duration";
import { Button } from "../Button/Button";
import SkipIcon from "./skip.svg";
import PauseIcon from "./pause.svg";
import PlayIcon from "./play.svg";
import VolumeUpIcon from "./volumeup.svg";
import VolumeDownIcon from "./volumedown.svg";
import { AppContext } from "../../context/app.context";
import cn from "classnames";
import axios from "axios";
import { Music } from "../../interfaces/music.interface";

export const Player = (): JSX.Element => {
    const { playlist, current, setCurrent, setPlaylist } = useContext(AppContext);
    const [duration, setDuration] = useState<number>(0);
    const [played, setPlayed] = useState<number>(0);
    const [paused, setPaused] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(30);
    const [seeking, setSeeking] = useState<boolean>(false);
    const player = useRef<YouTube>(null);
    useEffect(() => {
        setVolume(parseInt(window.localStorage.getItem("volume") ?? "30"));
    }, []);
    useEffect(() => {
        window.localStorage.setItem("volume", volume.toString());
    }, [volume]);
    useEffect(() => {
        const interval = setInterval(async () => {
            if (!seeking) {
                setPlayed(await player.current?.getInternalPlayer().getCurrentTime() / duration);
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };

    }, [duration, seeking]);
    useEffect(() => {
        window.onmouseup = function (): void {
            if (seeking) {
                setSeeking(false);
                player.current?.getInternalPlayer().seekTo(played * duration);
            }
        };
    }, [duration, played, seeking, volume]);
    useEffect(() => {
        window.onkeydown = async function (e): Promise<void> {
            if (e.code === "Space" && e.target === document.body && playlist.length !== 0) {
                e.preventDefault();
                const state = await player.current?.getInternalPlayer().getPlayerState();
                if (state === 1 || state === 2) {
                    !paused ? player.current?.getInternalPlayer().pauseVideo() : player.current?.getInternalPlayer().playVideo();
                }
                if (state === 5 && paused) {
                    player.current?.getInternalPlayer().playVideo();
                }
            }
        };
    }, [duration, paused, played, playlist.length, seeking]);
    const handleSeekMouseDown = (): void => {
        setSeeking(true);
    };
    const handlePlay = (): void => {
        setPaused(false);
    };
    const handlePause = (): void => {
        setPaused(true);
    };
    const handleReady = (event: YouTubeEvent): void => {
        if (event.target.isMuted()) {
            event.target.unMute();
        }
        setDuration(event.target.getDuration());
        event.target.setVolume(volume);
        paused ? event.target.pauseVideo() : event.target.playVideo();
        if (current === playlist.length - 1) {
            axios.post("https://ytmusicsearch.azurewebsites.net/getmusicmix", [{ "idVideo": playlist[current].videoId }]).then(response => {
                setPlaylist?.(playlist.concat(response.data[0].tracks.splice(1)));
            });
        }
    };
    const Next = (): void => {
        if (playlist.length - 1 !== current) {
            setCurrent?.(current + 1);
        }
    };
    const Prev = (): void => {
        if (0 !== current) {
            setCurrent?.(current - 1);
        }
    };
    const isNotAlbum = (a: Music): string => {
        if (Object.prototype.hasOwnProperty.call(a, "album")) return a.album.name;
        return a.title;
    };
    return <>
        {playlist.length !== 0 && <div className={styles["div-empty"]} />}
        <div className={cn({ [styles["none"]]: playlist.length === 0 }, styles.player)}>
            <YouTube
                className={styles.none}
                key={playlist[current] === undefined ? "" : playlist[current].videoId}
                videoId={playlist[current] === undefined ? "" : playlist[current].videoId}
                opts={{
                    height: '0',
                    width: '0'
                }}
                ref={player}
                onReady={handleReady}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnd={Next}
            />
            <div className={styles["div-top"]}>
                <Image alt={playlist[current] === undefined ? "" : playlist[current].title} src={playlist[current] === undefined ? "https://lh3.googleusercontent.com" : playlist[current].thumbnail?.[0].url as string} width={100} height={100} className={styles["cover-image"]} />
                <div className={styles["div-top-texts"]}>
                    <p className={styles.album}>{playlist[current] === undefined ? "" : isNotAlbum(playlist[current])}</p>
                    <b className={styles.name}>{playlist[current] === undefined ? "" : playlist[current].title}</b>
                    <p className={styles.artists}>{playlist[current] === undefined ? "" : playlist[current].artists?.[0].name}</p>
                </div>
            </div>
            <Range
                step={0.001}
                min={0}
                max={0.999999}
                values={[played]}
                onChange={(values): void => setPlayed(values[0])}
                renderTrack={({ props, children }): JSX.Element => (
                    <div
                        onMouseDown={(e): void => { props.onMouseDown(e); handleSeekMouseDown(); }}
                        onTouchStart={props.onTouchStart}
                        className={styles["line"]}
                    >
                        <div
                            ref={props.ref}
                            className={styles["indicator"]}
                            style={{
                                background: getTrackBackground({
                                    values: [played],
                                    colors: ["black", "#00000047"],
                                    min: 0,
                                    max: 0.999999
                                }),
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props }): JSX.Element => (
                    <div
                        {...props}
                        className={styles["time-thumb"]}
                    />
                )}
            />
            <div className={styles["div-duration"]}>
                <Duration seconds={duration * played} />
                <Duration seconds={duration * (1 - played)} />
            </div>
            <div className={styles["div-buttons"]}>
                <Button
                    onClick={Prev}
                >
                    <SkipIcon className={styles["icon-previous-next"]} />
                </Button>
                <Button
                    onClick={async (): Promise<void> => {
                        const state = await player.current?.getInternalPlayer().getPlayerState();
                        if (state === 1 || state === 2) {
                            !paused ? player.current?.getInternalPlayer().pauseVideo() : player.current?.getInternalPlayer().playVideo();
                        }
                        if (state === 5 && paused) {
                            player.current?.getInternalPlayer().playVideo();
                        }
                    }}
                >
                    {paused ? (
                        <PlayIcon
                            className={styles["icon-play-pause"]}
                        />
                    ) : (
                        <PauseIcon
                            className={styles["icon-play-pause"]}
                        />
                    )}
                </Button>
                <Button
                    onClick={Next}
                >
                    <SkipIcon className={styles["icon-previous-next"]} style={{
                        transform: "rotate(180deg)"
                    }} />
                </Button>
            </div>
            <div className={styles["div-volume"]}>
                <VolumeDownIcon className={styles["icon-volume"]} style={{
                    marginRight: "16px"
                }} />
                <Range
                    step={1}
                    min={0}
                    max={100}
                    values={[volume]}
                    onChange={(values): void => { setVolume(values[0]); player.current?.getInternalPlayer().setVolume(values[0]); }}
                    renderTrack={({ props, children }): JSX.Element => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            className={styles["line"]}
                        >
                            <div
                                ref={props.ref}
                                className={styles["indicator"]}
                                style={{
                                    background: getTrackBackground({
                                        values: [volume],
                                        colors: ["#000000DE", "#00000061"],
                                        min: 0,
                                        max: 100
                                    }),
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props }): JSX.Element => (
                        <div
                            {...props}
                            className={styles["valume-thumb"]}
                        />
                    )}
                />
                <VolumeUpIcon className={styles["icon-volume"]} style={{
                    marginLeft: "16px"
                }} />
            </div>
        </div ></>;
};