"use client";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MusicList, CircularProgress, Banner } from '../../components';
import { Music } from '../../interfaces/music.interface';

export default function SearchPage(): JSX.Element {
    const [musics, setMusics] = useState<Music[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const controller = new AbortController();

        async function startFetching(): Promise<void> {
            const query = searchParams.get('');
            if (!query)
                return;
            setLoading(true);
            setError(false);
            axios.post('https://ytmusicsearch.azurewebsites.net/search', { query }, { signal: controller.signal }).then(response => {
                setMusics(response.data);
                setLoading(false);
            }).catch((e) => { if (!axios.isCancel(e)) { setError(true); setLoading(false); } });
        }

        startFetching();

        return () => { controller.abort(); };
    }, [searchParams]);

    if (loading) {
        return <CircularProgress variant='for-list' />;
    } else if (musics.length === 0 || error) {
        return <Banner>😑 Oops.. Nothing found</Banner>;
    } else {
        return <MusicList musics={musics} />;
    }
}