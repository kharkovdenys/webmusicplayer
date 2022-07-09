import { Route, Routes } from "react-router-dom";
import { Banner, NavDrawer } from "../../components";

export const ProfilePage = (): JSX.Element => {
    return <div style={{ display: "flex" }}>
        <NavDrawer />
        <Routes>
            <Route
                path="/"
                element={<></>}
            />
            <Route
                path="myplaylists"
                element={<></>}
            />
            <Route
                path="otherusers/*"
                element={<></>}
            />
            <Route path="/*" element={<Banner>4😑4 Page Not Found</Banner>} />
        </Routes>
    </div>;
};
