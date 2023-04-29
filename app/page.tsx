"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { Banner, CircularProgress, MusicList } from '../components';
import { useEffect, useState } from 'react';

export default function HistoryPage(): JSX.Element {
    const [token, setToken] = useState<string>();

    useEffect(() => {
        const cookieToken = getCookie("token");
        if (typeof cookieToken === "string") {
            setToken(cookieToken);
        } else {
            setToken("");
        }
    }, []);

    const { isInitialLoading: isLoadingHistory, isError: isErrorHistory, data: history } = useQuery(["history"], () =>
        axios.get(`${process.env.NEXT_PUBLIC_DATABASE_API}/musics`, { headers: { Authorization: token } }).then(res => res.data),
        { enabled: !!token });

    const { isInitialLoading: isLoadingMusics, isError: isErrorMusics, data: musics } = useQuery(['musics', history],
        () => axios.post(`${process.env.NEXT_PUBLIC_SEARCH_API}/get-similar-music-playlist`, history).then((res) => res.data),
        { enabled: !!history });

    if (token === undefined || isLoadingHistory || isLoadingMusics)
        return <CircularProgress variant='for-list' />;
    if (token === "")
        return <Banner>😑 Oops.. You are not logged in</Banner>;
    if (isErrorHistory || isErrorMusics)
        return <Banner>😑 Oops.. Something went wrong</Banner>;
    if (musics?.length === 0)
        return <Banner>😑 Oops.. Your history is empty</Banner>;
    return <MusicList musics={musics} />;
}