"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { Banner, Button, CircularProgress, NewPlaylist, PlaylistList } from '../../../components';

export default function MyPlaylistPage(): JSX.Element {
    const [showDialog, setShowDialog] = useState(false);

    const { isLoading, isError, data: playlists, refetch } = useQuery(["getMyPlaylist"], () =>
        axios.get("https://ytmusicsearch.azurewebsites.net/getmyplaylist", { headers: { Authorization: getCookie("token")?.toString() } }).then(res => res.data),
        { enabled: !!getCookie("token") });

    if (isLoading)
        return <CircularProgress style={{ marginLeft: "auto", marginRight: "auto", display: "block", marginTop: "40px" }} />;
    if (!getCookie("token"))
        return <Banner>😑 Oops.. You are not logged in</Banner>;
    if (isError)
        return <Banner>😑 Oops.. Something went wrong</Banner>;
    return <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <PlaylistList playlists={playlists} canDelete={true} update={(): Promise<unknown> => refetch()} />
        <Button onClick={(): void => setShowDialog(true)} style={{ marginLeft: "auto", marginRight: "auto", display: "block", backgroundColor: "rgb(25, 118, 210)", borderRadius: "4px", color: "white" }}>Add playlist</Button>
        <NewPlaylist
            onClose={(): void => { setShowDialog(false); refetch(); }}
            show={showDialog}
        ></NewPlaylist>
    </div>;
}