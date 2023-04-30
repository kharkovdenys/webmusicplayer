"use client";
import axios from 'axios';
import Image from 'next/image';
import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { MdPause, MdPlayArrow, MdSkipNext, MdSkipPrevious, MdVolumeUp } from 'react-icons/md';
import { getTrackBackground, Range } from 'react-range';
import YouTube, { YouTubeEvent } from 'react-youtube';

import { AppContext } from '../../context/app.context';
import { Button } from '../Button/Button';
import { Duration } from '../Duration/Duration';
import styles from './Player.module.css';

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
        let timeoutId: NodeJS.Timeout;
        const updatePlayed = async (): Promise<void> => {
            if (!seeking) {
                setPlayed(await player.current?.getInternalPlayer().getCurrentTime() / duration);
                timeoutId = setTimeout(updatePlayed, 100);
            }
        };
        timeoutId = setTimeout(updatePlayed, 100);
        return () => clearTimeout(timeoutId);
    }, [duration, seeking]);

    useEffect(() => {
        window.onmouseup = function (): void {
            if (seeking) {
                setSeeking(false);
                player.current?.getInternalPlayer().seekTo(played * duration);
            }
        };
    }, [duration, played, seeking]);

    useEffect(() => {
        window.onkeydown = async function (e): Promise<void> {
            if (e.code === "Space" && e.target === document.body && playlist.length !== 0) {
                e.preventDefault();
                togglePlayback(player, paused);
            }
        };
    }, [paused, played, playlist.length]);

    const togglePlayback = async (player: RefObject<YouTube>, paused: boolean): Promise<void> => {
        const state = await player.current?.getInternalPlayer().getPlayerState();
        if (state === 1 || state === 2) {
            paused ? player.current?.getInternalPlayer().playVideo() : player.current?.getInternalPlayer().pauseVideo();
        }
        if (state === 5 && paused) {
            player.current?.getInternalPlayer().playVideo();
        }
    };

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
            axios.post(`${process.env.NEXT_PUBLIC_SEARCH_API}/get-similar-music-playlist`, [{ "idVideo": playlist[current].videoId }]).then(response => {
                setPlaylist?.(playlist.concat(response.data[0].splice(1)));
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

    return <>
        <div className={styles["page-increase"]}></div>
        {playlist.length !== 0 && <div className={styles.player}>
            <YouTube
                style={{ "display": "none" }}
                key={playlist[current].videoId}
                videoId={playlist[current].videoId}
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
            <div className={styles["controls"]}>
                <Button onClick={Prev}>
                    <MdSkipPrevious size="35px" color="white" />
                </Button>
                <Button onClick={(): Promise<void> => togglePlayback(player, paused)}>
                    {paused ?
                        <MdPlayArrow size="48px" color="white" />
                        : <MdPause size="48px" color="white" />}
                </Button>
                <Button onClick={Next}>
                    <MdSkipNext size="35px" color="white" />
                </Button>
            </div>
            <Image alt={playlist[current].title} src={playlist[current].thumbnail} width={60} height={60} className={styles["cover-image"]} />
            <div className={styles["track"]}>
                <div className={styles["music-info"]}>
                    <p className={styles.album}>{playlist[current].album}</p>
                    <b className={styles.name}>{playlist[current].title + " · " + playlist[current].artists}</b>
                </div>
                <div className={styles["timebar"]}>
                    <Duration seconds={duration * played} />
                    <Range
                        step={0.001}
                        min={0}
                        max={0.999999}
                        values={[played]}
                        onChange={(values): void => setPlayed(values[0])}
                        renderTrack={({ props, children }): JSX.Element => (
                            <div
                                key='Line1'
                                onMouseDown={(e): void => { props.onMouseDown(e); handleSeekMouseDown(); }}
                                onTouchStart={props.onTouchStart}
                                className={styles["line"]}>
                                <div
                                    ref={props.ref}
                                    key='Indicator1'
                                    className={styles["indicator"]}
                                    style={{
                                        background: getTrackBackground({
                                            values: [played],
                                            colors: ["blue", "white"],
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
                                key='Thumb1'
                                className={styles["time-thumb"]}
                            />
                        )}
                    />
                    <Duration seconds={duration} />
                </div>
            </div>
            <div className={styles["volume"]}>
                <Range
                    step={1}
                    min={0}
                    max={100}
                    values={[volume]}
                    onChange={(values): void => { setVolume(values[0]); player.current?.getInternalPlayer().setVolume(values[0]); }}
                    renderTrack={({ props, children }): JSX.Element => (
                        <div
                            key='Line2'
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            className={styles["line"]}
                        >
                            <div
                                key='Indicator2'
                                ref={props.ref}
                                className={styles["indicator"]}
                                style={{
                                    background: getTrackBackground({
                                        values: [volume],
                                        colors: ["white", "#C0C0C0"],
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
                            key='Thumb2'
                            className={styles["valume-thumb"]}
                        />
                    )}
                />
                <MdVolumeUp color="white" size="24px" />
            </div>
        </div>
        }
    </>;
};