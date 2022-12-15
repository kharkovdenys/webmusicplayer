"use client";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, Banner, Button, CircularProgress } from "../../components";
import { useRouter } from "next/navigation";

export default function MyProfilePage(): JSX.Element {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const controller = new AbortController();

        setError(false);
        axios.get("https://databaseandapi.azurewebsites.net/info", { signal: controller.signal, headers: { Authorization: getCookie("token") ?? "" } }).then((name) => {
            setName(name.data); setLoading(false);
        }).catch((e) => {
            if (!axios.isCancel(e)) {
                setError(true);
                setLoading(false);
            }
        });

        return () => { controller.abort(); };
    }, []);
    return (
        <div style={{ marginLeft: "auto", marginRight: "auto", alignItems: "center", justifyItems: "center", display: "flex", flexDirection: "column" }}>
            {!loading ? getCookie("token") === undefined ? <Banner>😑 Oops.. You are not logged in</Banner> :
                error ? <Banner>😑 Oops.. Something went wrong</Banner> :
                    <><Avatar style={{ marginTop: "20px" }}>
                        {name[0]}
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
                        </p></> : <CircularProgress style={{ marginTop: "43.5px", marginBottom: "43.5px" }} />
            }
            <Link href="/" style={{ textDecoration: "none", marginTop: "10px" }}>
                <Button variant="out" onClick={(): void => { deleteCookie("token"); router.push("/"); }}>
                    Log out
                </Button>
            </Link>
        </div >
    );
}