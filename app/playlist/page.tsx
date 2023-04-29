"use client";
import axios from 'axios';
import { Avatar, Back, Banner, CircularProgress, MusicList } from '../../components';
import Image from "next/image";
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Music } from '../../interfaces/music.interface';

export default function ItemsPlaylist(): JSX.Element {
    const searchParams = useSearchParams();
    const [token, setToken] = useState<string>();

    useEffect(() => {
        const cookieToken = getCookie("token");
        if (typeof cookieToken === "string") {
            setToken(cookieToken);
        } else {
            setToken("");
        }
    }, []);

    const { isInitialLoading, isError, data, refetch } = useQuery(["getMusicFromPlaylist", searchParams.get('id')], () =>
        axios.post(`${process.env.NEXT_PUBLIC_SEARCH_API}/get-music-from-playlist`, { id: searchParams.get("id") }).then(res => res.data)
    );

    const { data: myPlaylist } = useQuery(["check", searchParams.get('id')], () =>
        axios.post(`${process.env.NEXT_PUBLIC_SEARCH_API}/playlist/check`, { id: searchParams.get("id") }, { headers: { Authorization: token } }).then(res => res.data)
    );

    return <div style={{ width: "100%" }}>
        <Back />
        {isInitialLoading ? <CircularProgress variant='for-list' /> :
            isError ? <Banner>😑 Oops.. Something went wrong</Banner> :
                data.count === 0 ? <Banner>😑 Oops.. This playlist is empty</Banner> :
                    <>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Avatar
                                style={{ marginLeft: "auto", marginRight: "auto", marginTop: 30, width: 90, height: 90, borderRadius: 0 }}>
                                <Image
                                    alt="Album"
                                    src={data.thumbnail}
                                    width={90}
                                    height={90}
                                />
                            </Avatar>
                            <p style={{ marginLeft: "auto", marginRight: "auto", fontSize: "large" }}>
                                {data.title}
                            </p>
                        </div>
                        <p style={{ textAlign: "center", marginTop: 4, fontSize: "24px" }}>
                            Musics
                        </p>
                        <MusicList musics={data.tracks.map((music: Music) => [music])} afterDelete={myPlaylist ? (): Promise<unknown> => refetch() : undefined} playlistId={new URLSearchParams(location.search).get("id") ?? ""} />
                    </>
        }
    </div>;
}