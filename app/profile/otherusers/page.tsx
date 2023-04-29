"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Avatar, Banner, CircularProgress, Search } from '../../../components';

export default function FindUsersPage(): JSX.Element {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { isInitialLoading, isError, data: users } = useQuery(["users", searchParams.get('')], () =>
        axios.post(`${process.env.NEXT_PUBLIC_DATABASE_API}/user`, { UserName: searchParams.get('') }).then((res) => res.data),
        { enabled: !!searchParams.get('') }
    );

    return <div style={{ width: "100%" }}>
        <Search style={{ maxWidth: "400px", marginTop: "20px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#909be9" }} placeholder={'Search Users'} pathname="/profile/otherusers" />
        {!searchParams.get('') ? null :
            isInitialLoading ? <CircularProgress style={{ marginLeft: "auto", marginRight: "auto", display: "block", marginTop: "40px" }} /> :
                isError ? <Banner>😑 Oops.. Something went wrong</Banner> :
                    users.length === 0 ? <Banner>😑 Oops.. Nothing found</Banner> :
                        <ul
                            style={{
                                maxWidth: 500,
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        >
                            {users.map((user: string) => (
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