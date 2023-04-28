"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Avatar, Back, Banner, CircularProgress } from '../../components';
import { PlaylistList } from '../../components/PlaylistList/PlaylistList';

export default function OtherUserPage(): JSX.Element {
    const searchParams = useSearchParams();
    const name = searchParams.get("user");

    const { isInitialLoading, isError, data: playlists } = useQuery(["userPlaylists"], () =>
        axios.post("https://ytmusicsearch.azurewebsites.net/getotheruserplaylist", { name }).then((res) => res.data)
    );

    return <div style={{ width: "100%" }}>
        <Back />
        {isInitialLoading ? <CircularProgress variant='for-list' /> :
            isError ? <Banner>😑 Oops.. Something went wrong</Banner> :
                <>
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