import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Banner, CircularProgress } from '../../components';
import { PlaylistList } from '../../components/PlaylistList/PlaylistList';
import { Playlist } from '../../interfaces/playlist.interface';

export const MyPlaylistPage = (): JSX.Element => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(false);
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
                axios.get("https://ytmusicsearch.azurewebsites.net/getmyplaylist", { headers: { Authorization: token } }).then((response) => { setPlaylists(response.data); setLoading(false); });
            } catch (e) {
                setError(true);
                setLoading(false);
            }
        };
        fetchData();
    }, [location.search]);
    if (loading) {
        return <CircularProgress style={{ marginLeft: "auto", marginRight: "auto", display: "block", marginTop: "40px" }} />;
    } else if (error === "token") {
        return <Banner>😑 Oops.. You are not logged in</Banner>;
    } else if (error) {
        return <Banner>😑 Oops.. Something went wrong</Banner>;
    } else {
        return <PlaylistList playlists={playlists} />;
    }
};