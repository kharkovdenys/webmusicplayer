import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Banner, CircularProgress, MusicList } from '../../components';
import { MusicMix } from '../../interfaces/music.interface';

export const HistoryPage = (): JSX.Element => {
    const [musics, setMusics] = useState<MusicMix[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<true | false | "token">(false);
    const location = useLocation();
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setLoading(true);
            const token = getCookie("token")?.toString() ?? "";
            if (token == "") {
                setError("token");
                setLoading(false);
                return;
            }
            setError(false);
            try {
                const { data } = await axios.get("https://databaseandapi.azurewebsites.net/musics", { headers: { Authorization: token } });
                axios.post('https://ytmusicsearch.azurewebsites.net/getmusicmix', data).then(response => {
                    setMusics(response.data);
                    setLoading(false);
                });
            } catch (e) {
                setError(true);
                setLoading(false);
            }
        };
        fetchData();
    }, [location.search]);
    if (loading) {
        return <CircularProgress variant='for-list' />;
    } else if (error === "token") {
        return <Banner>😑 Oops.. You are not logged in</Banner>;
    } else if (error) {
        return <Banner>😑 Oops.. Something went wrong</Banner>;
    } else if (musics.length === 0) {
        return <Banner>😑 Oops.. Your history is empty</Banner>;
    } else {
        return <MusicList musics={musics} />;
    }
};