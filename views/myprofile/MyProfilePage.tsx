import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Button, CircularProgress } from "../../components";

export const MyProfilePage = (): JSX.Element => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    axios.get("https://databaseandapi.azurewebsites.net/info", { headers: { Authorization: getCookie("token") ?? "" } }).then((name) => { setName(name.data); setLoading(true); });
    return (
        <div style={{ marginLeft: "auto", marginRight: "auto", alignItems: "center", justifyItems: "center", display: "flex", flexDirection: "column" }}>
            {loading ? <><Avatar style={{ marginTop: "20px" }}>
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
                </p></> : <CircularProgress style={{ marginTop: "43.5px", marginBottom: "43.5px" }} />}
            <NavLink to="/" style={{ textDecoration: "none" }}>
                <Button variant="out" onClick={(): void => { deleteCookie("token"); navigate("/"); }}>
                    Sing Out
                </Button>
            </NavLink>
        </div >
    );
}