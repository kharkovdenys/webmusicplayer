"use client";
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, Banner, CircularProgress, Search } from '../../../components';

export default function FindUsersPage(): JSX.Element {
    const [users, setUsers] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const controller = new AbortController();

        async function startFetching(): Promise<void> {
            setLoading(true);
            setError(false);
            if (!searchParams.get('') || searchParams.get('') === null) {
                return;
            }
            axios.post('https://databaseandapi.azurewebsites.net/user', { UserName: searchParams.get('') }, { signal: controller.signal }).then(response => {
                setUsers(response.data);
                setLoading(false);
            }).catch((e) => {
                if (!axios.isCancel(e)) {
                    setError(true);
                    setLoading(false);
                }
            });
        }

        startFetching();

        return () => { controller.abort(); };
    }, [searchParams]);

    return <div style={{ width: "100%" }}>
        <Search style={{ maxWidth: "400px", marginTop: "20px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#909be9" }} placeholder={'Search Users'} pathname="/profile/otherusers" />
        {searchParams.get('') === "" || searchParams.get('') === null ? null :
            loading ? <CircularProgress style={{ marginLeft: "auto", marginRight: "auto", display: "block", marginTop: "40px" }} /> :
                error ? <Banner>😑 Oops.. Something went wrong</Banner> :
                    users.length === 0 ? <Banner>😑 Oops.. Nothing found</Banner> :
                        <ul
                            style={{
                                maxWidth: 500,
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        >
                            {users.map((user) => (
                                <li
                                    style={{
                                        textDecoration: "none", display: "flex",
                                        width: "100%"

                                    }}
                                    key={user}
                                    onClick={(): void => {
                                        router.push("/user?user=" + user);
                                    }}
                                >
                                    <Avatar style={{ marginTop: "auto", marginBottom: "auto" }}>
                                        {user[0]}
                                    </Avatar>
                                    <p style={{ marginLeft: "10px" }}>{user}</p>
                                </li>
                            ))}
                        </ul>
        }
    </div >;
}