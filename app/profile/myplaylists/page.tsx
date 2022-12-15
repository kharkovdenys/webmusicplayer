"use client";
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { Banner, Button, CircularProgress, NewPlaylist, PlaylistList } from '../../../components';
import { Playlist } from '../../../interfaces/playlist.interface';

export default function MyPlaylistPage(): JSX.Element {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<true | false | "token">(false);
    const [showDialog, setShowDialog] = useState(false);

    async function startFetching(controller?: AbortController): Promise<void> {
        setLoading(true);
        const token = getCookie("token")?.toString() ?? "";
        if (token == "") {
            setError("token");
            setLoading(false);
            return;
        }
        setError(false);
        axios.get("https://ytmusicsearch.azurewebsites.net/getmyplaylist", { signal: controller?.signal, headers: { Authorization: token } }).then((response) => { setPlaylists(response.data); setLoading(false); }).catch((e) => {
            if (!axios.isCancel(e)) {
                setError(true);
                setLoading(false);
            }
        });
    }

    useEffect(() => {
        const controller = new AbortController();
        startFetching(controller);
        return () => { controller.abort(); };
    }, []);

    if (loading) {
        return <CircularProgress style={{ marginLeft: "auto", marginRight: "auto", display: "block", marginTop: "40px" }} />;
    } else if (error === "token") {
        return <Banner>😑 Oops.. You are not logged in</Banner>;
    } else if (error) {
        return <Banner>😑 Oops.. Something went wrong</Banner>;
    } else {
        return <div style={{ marginLeft: "auto", marginRight: "auto" }}>
            <PlaylistList playlists={playlists} canDelete={true} update={(): Promise<void> => startFetching()} />
            <Button onClick={(): void => setShowDialog(true)} style={{ marginLeft: "auto", marginRight: "auto", display: "block", backgroundColor: "rgb(25, 118, 210)", borderRadius: "4px", color: "white" }}>Add playlist</Button>
            <NewPlaylist
                onClose={(): void => { setShowDialog(false); startFetching(); }}
                show={showDialog}
            ></NewPlaylist>
        </div>;
    }
}