import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Back, Banner, CircularProgress } from '../../components';
import { PlaylistList } from '../../components/PlaylistList/PlaylistList';
import { Playlist } from '../../interfaces/playlist.interface';

export const OtherUserPage = (): JSX.Element => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const location = useLocation();
    const name = new URLSearchParams(location.search).get("user");
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setLoading(true);
            setError(false);
            try {
                axios.post("https://ytmusicsearch.azurewebsites.net/getotheruserplaylist", { name: name }).then((response) => { setPlaylists(response.data); setLoading(false); });
            } catch (e) {
                setError(true);
                setLoading(false);
            }
        };
        fetchData();
    }, [location.search, name]);
    return <div style={{ width: "100%" }}>
        <Back />
        {loading ? <CircularProgress variant='for-list' /> :
            error ? <Banner>😑 Oops.. Something went wrong</Banner> : <>
                <Avatar style={{ marginLeft: "auto", marginRight: "auto", marginTop: "30px" }}>
                    {name !== null ? name[0] : ""}
                </Avatar>
                <p
                    style={{
                        fontSize: "32px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "20px",
                        marginBottom: "20px",
                        textAlign: "center",
                    }}
                >
                    {name}
                </p>

                <p style={{ textAlign: "center", marginTop: 4, fontSize: "24px" }}>
                    Playlists
                </p>
                <PlaylistList playlists={playlists} canDelete={false} />
            </>
        }
    </div >;
};