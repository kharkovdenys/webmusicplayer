"use client";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { Avatar, Banner, Button, CircularProgress } from "../../components";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function MyProfilePage(): JSX.Element {
    const router = useRouter();
    const [token, setToken] = useState<string>();

    useEffect(() => {
        const cookieToken = getCookie("token");
        if (typeof cookieToken === "string") {
            setToken(cookieToken);
        } else {
            setToken("");
        }
    }, []);

    const { isInitialLoading, isError, data: name } = useQuery(["info"], () =>
        axios.get("https://databaseandapi.azurewebsites.net/info", { headers: { Authorization: token } }).then((res) => res.data)
    );

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center", marginLeft: "auto", marginRight: "auto" }}>
            {!(isInitialLoading || token === undefined) ? token === "" ? <Banner>😑 Oops.. You are not logged in</Banner> :
                isError ? <Banner>😑 Oops.. Something went wrong</Banner> :
                    <><Avatar style={{ marginTop: "20px" }}>
                        {name?.[0]}
                    </Avatar>
                        <p style={{ fontSize: "32px", textAlign: "center", marginTop: "20px", marginBottom: "20px", marginLeft: "auto", marginRight: "auto" }}>
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