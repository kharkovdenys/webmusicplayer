import { PlayerProps } from "./Player.props";
import { useRef, useState, useEffect } from "react";
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

export const Player = ({ id, img, name, album, artists, ...props }: PlayerProps): JSX.Element => {
    const [duration, setDuration] = useState<number>(0);
    const [played, setPlayed] = useState<number>(0);
    const [paused, setPaused] = useState<boolean>(true);
    const [volume, setVolume] = useState<number>(30);
    const [seeking, setSeeking] = useState<boolean>(false);
    const player = useRef<YouTube>(null);
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
        window.onkeydown = function (e): void {
            if (e.code === "Space" && e.target === document.body) {
                e.preventDefault();
                !paused ? player.current?.getInternalPlayer().pauseVideo() : player.current?.getInternalPlayer().playVideo();
            }
        };
    }, [duration, paused, played, seeking]);
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
        setDuration(event.target.getDuration());
        event.target.setVolume(volume);
    };
    return <div {...props} className={styles.player}>
        <YouTube
            videoId={id}
            opts={{
                height: '0',
                width: '0',
            }}
            ref={player}
            onReady={handleReady}
            onPlay={handlePlay}
            onPause={handlePause}
        // onEnd={func}
        // onError={func}
        />
        <div className={styles["div-top"]}>
            <Image alt={"Axel F"} src={img} width={100} height={100} className={styles["cover-image"]} />
            <div className={styles["div-top-texts"]}>
                <p className={styles.album}>{album}</p>
                <b className={styles.name}>{name}</b>
                <p className={styles.artists}>{artists}</p>
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
            //onClick={Prev}
            >
                <SkipIcon className={styles["icon-previous-next"]} />
            </Button>
            <Button
                onClick={(): void => {
                    !paused ? player.current?.getInternalPlayer().pauseVideo() : player.current?.getInternalPlayer().playVideo();
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
            //onClick={Next}
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
    </div>;
};