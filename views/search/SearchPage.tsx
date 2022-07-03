import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CustomList } from '../../components';
import { Music } from '../../interfaces/music.interface';

export const SearchPage = (): JSX.Element => {
    const [musics, setMusics] = useState<Music[]>([]);
    const location = useLocation();
    useEffect(() => {
        axios.post('https://ytmusicsearch.azurewebsites.net/search', { query: location.search.substring(1) }).then(response => {
            setMusics(response.data);
        });
    }, [location.search]);
    return <CustomList musics={musics} />;
};