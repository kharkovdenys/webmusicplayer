import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Back, Banner, CircularProgress, MusicList } from '../../components';
import Image from "next/image";
import { Music } from '../../interfaces/music.interface';
import { getCookie } from 'cookies-next';

export const ItemsPlaylist = (): JSX.Element => {
    const [musics, setMusics] = useState<Music[]>([]);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [update, setUpdate] = useState(false);
    const [myPlaylist, setMyPlaylist] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setLoading(true);
            setError(false);
            try {
                axios.post('https://ytmusicsearch.azurewebsites.net/getmusicfromplaylist', { id: new URLSearchParams(location.search).get("id") }).then(response => {
                    setMusics(response.data.tracks);
                    setImage(response.data.thumbnails[0].url);
                    const find = response.data.title.search(":");
                    setName(response.data.title.substr(find + 1, parseInt(response.data.title.substr(0, find))));
                    setLoading(false);
                });
            } catch (e) {
                setError(true);
                setLoading(false);
            }
        };
        fetchData();
    }, [location.search, update]);

    useEffect(() => {
        const check = async (): Promise<void> => {
            try {
                axios.post('https://ytmusicsearch.azurewebsites.net/playlist/check', { id: new URLSearchParams(location.search).get("id") }, { headers: { Authorization: getCookie("token") ?? "" } }).then(response => { setMyPlaylist(response.data); });
            } catch (e) {
                setMyPlaylist(false);
            }
        };
        check();
    }, [location.search]);

    return <div style={{ width: "100%" }}>
        <Back />
        {loading ? <CircularProgress variant='for-list' /> :
            error ? <Banner>😑 Oops.. Something went wrong</Banner> :
                musics.length === 0 ? <Banner>😑 Oops.. This playlist is empty</Banner> :
                    <>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Avatar
                                style={{ marginLeft: "auto", marginRight: "auto", marginTop: 30, width: 90, height: 90, borderRadius: 0 }}                >
                                <Image
                                    alt="Album"
                                    src={image}
                                    width={90}
                                    height={90}
                                />
                            </Avatar>
                            <p style={{ marginLeft: "auto", marginRight: "auto", fontSize: "large" }}>
                                {name}
                            </p>
                        </div>
                        <p style={{ textAlign: "center", marginTop: 4, fontSize: "24px" }}>
                            Musics
                        </p>
                        <MusicList musics={musics} afterDelete={myPlaylist ? (): void => setUpdate(!update) : undefined} playlistId={new URLSearchParams(location.search).get("id") ?? ""} />
                    </>
        }
    </div>;
};