"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { Banner, CircularProgress, MusicList } from '../components';

export default function HistoryPage(): JSX.Element {
    const { isLoading: isLoadingHistory, error, data: history } = useQuery(["history"], () =>
        axios.get("https://databaseandapi.azurewebsites.net/musics", { headers: { Authorization: getCookie("token")?.toString() } }).then(res => res.data),
        { enabled: !!getCookie("token") });

    const { isLoading: isLoadingMusics, isError, data: musics } = useQuery(['musics', history],
        () => axios.post('https://ytmusicsearch.azurewebsites.net/getmusicmix', history).then((res) => res.data),
        { enabled: !!history });

    if (isLoadingHistory || isLoadingMusics)
        return <CircularProgress variant='for-list' />;
    if (!getCookie("token"))
        return <Banner>😑 Oops.. You are not logged in</Banner>;
    if (isError || error)
        return <Banner>😑 Oops.. Something went wrong</Banner>;
    if (musics && musics.length === 0)
        return <Banner>😑 Oops.. Your history is empty</Banner>;
    return <MusicList musics={musics} />;
}