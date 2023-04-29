"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { Banner, Button, CircularProgress, NewPlaylist, PlaylistList } from '../../../components';

export default function MyPlaylistPage(): JSX.Element {
    const [showDialog, setShowDialog] = useState(false);
    const [token, setToken] = useState<string>();

    useEffect(() => {
        const cookieToken = getCookie("token");
        if (typeof cookieToken === "string") {
            setToken(cookieToken);
        } else {
            setToken("");
        }
    }, []);

    const { isInitialLoading, isError, data: playlists, refetch } = useQuery(["getMyPlaylist"], () =>
        axios.post(`${process.env.NEXT_PUBLIC_SEARCH_API}/user-playlists`, {}, { headers: { Authorization: token } }).then(res => res.data),
        { enabled: !!token });

    if (token === undefined || isInitialLoading)
        return <CircularProgress style={{ marginLeft: "auto", marginRight: "auto", display: "block", marginTop: "40px" }} />;
    if (token === "")
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