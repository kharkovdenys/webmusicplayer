import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MusicList } from '../../components';
import { Music } from '../../interfaces/music.interface';
import { CircularProgress, Banner } from "./../../components";

export const SearchPage = (): JSX.Element => {
    const [musics, setMusics] = useState<Music[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const location = useLocation();
    useEffect(() => {
        setLoading(true);
        setError(false);
        axios.post('https://ytmusicsearch.azurewebsites.net/search', { query: decodeURIComponent(location.search.substring(1)) }).then(response => {
            setMusics(response.data);
            setLoading(false);
        }).catch(() => { setError(true); setLoading(false); });
    }, [location.search]);
    if (loading) {
        return <CircularProgress variant='for-list' />;
    } else if (musics.length === 0 || error) {
        return <Banner>😑 Oops.. Nothing found</Banner>;
    } else {
        return <MusicList musics={musics} />;
    }
};