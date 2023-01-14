"use client";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { Avatar, Banner, Button, CircularProgress } from "../../components";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function MyProfilePage(): JSX.Element {
    const router = useRouter();

    const { isLoading, isError, data: name } = useQuery(["info"], () =>
        axios.get("https://databaseandapi.azurewebsites.net/info", { headers: { Authorization: getCookie("token") ?? "" } }).then((res) => res.data)
    );

    return (
        <div style={{ marginLeft: "auto", marginRight: "auto", alignItems: "center", justifyItems: "center", display: "flex", flexDirection: "column" }}>
            {!isLoading ? getCookie("token") === undefined ? <Banner>😑 Oops.. You are not logged in</Banner> :
                isError ? <Banner>😑 Oops.. Something went wrong</Banner> :
                    <><Avatar style={{ marginTop: "20px" }}>
                        {name?.[0]}
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