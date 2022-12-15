"use client";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, Back, Banner, CircularProgress } from '../../components';
import { PlaylistList } from '../../components/PlaylistList/PlaylistList';
import { Playlist } from '../../interfaces/playlist.interface';

export default function OtherUserPage(): JSX.Element {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const searchParams = useSearchParams();
    const name = searchParams.get("user");
    useEffect(() => {
        const controller = new AbortController();

        async function startFetching(): Promise<void> {
            setLoading(true);
            setError(false);
            axios.post("https://ytmusicsearch.azurewebsites.net/getotheruserplaylist", { name: name }, { signal: controller.signal }).then((response) => { setPlaylists(response.data); setLoading(false); }).catch((e) => {
                if (!axios.isCancel(e))
                    setError(true);
                setLoading(false);
            });
        }

        startFetching();

        return () => { controller.abort(); };
    }, [name]);

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
}