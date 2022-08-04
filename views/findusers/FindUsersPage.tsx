import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Banner, CircularProgress, Search } from '../../components';

export const FindUsersPage = (): JSX.Element => {
    const [users, setUsers] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setLoading(true);
            setError(false);
            if (location.search === "") {
                return;
            }
            try {
                axios.post('https://databaseandapi.azurewebsites.net/user', { UserName: decodeURIComponent(location.search.substring(1)) }).then(response => {
                    setUsers(response.data);
                    setLoading(false);
                });
            } catch (e) {
                setError(true);
                setLoading(false);
            }
        };
        fetchData();
    }, [location.search]);
    return <div style={{ width: "100%" }}>
        <Search style={{ maxWidth: "400px", marginTop: "20px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#909be9" }} placeholder={'Search Users'} pathname="user" />
        {location.search === "" ? null :
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
                                        navigate("/user?user=" + user);
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
};