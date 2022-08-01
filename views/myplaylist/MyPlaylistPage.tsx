import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Banner, Button, CircularProgress, NewPlaylist } from '../../components';
import { PlaylistList } from '../../components/PlaylistList/PlaylistList';
import { Playlist } from '../../interfaces/playlist.interface';

export const MyPlaylistPage = (): JSX.Element => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<true | false | "token">(false);
    const [showDialog, setShowDialog] = useState(false);
    const location = useLocation();
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
    useEffect(() => {
        fetchData();
    }, [location.search]);
    if (loading) {
        return <CircularProgress style={{ marginLeft: "auto", marginRight: "auto", display: "block", marginTop: "40px" }} />;
    } else if (error === "token") {
        return <Banner>😑 Oops.. You are not logged in</Banner>;
    } else if (error) {
        return <Banner>😑 Oops.. Something went wrong</Banner>;
    } else {
        return <div style={{ marginLeft: "auto", marginRight: "auto" }}>
            <PlaylistList playlists={playlists} canDelete={true} update={(): Promise<void> => fetchData()} />
            <Button onClick={(): void => setShowDialog(true)} style={{ marginLeft: "auto", marginRight: "auto", display: "block", backgroundColor: "rgb(25, 118, 210)", borderRadius: "4px", color: "white" }}>Add playlist</Button>
            <NewPlaylist
                onClose={(): void => { setShowDialog(false); fetchData(); }}
                show={showDialog}
            ></NewPlaylist>
        </div>;
    }
};