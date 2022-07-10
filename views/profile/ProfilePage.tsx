import { Route, Routes } from "react-router-dom";
import { Banner, NavDrawer } from "../../components";
import { FindUsersPage } from "../findusers/FindUsersPage";
import { MyPlaylistPage } from "../myplaylist/MyPlaylistPage";
import { MyProfilePage } from "../myprofile/MyProfilePage";

export const ProfilePage = (): JSX.Element => {
    return <div style={{ display: "flex" }}>
        <NavDrawer />
        <Routes>
            <Route
                path="/"
                element={<MyProfilePage></MyProfilePage>}
            />
            <Route
                path="myplaylists"
                element={<MyPlaylistPage></MyPlaylistPage>}
            />
            <Route
                path="otherusers/*"
                element={<FindUsersPage></FindUsersPage>}
            />
            <Route path="/*" element={<Banner>4😑4 Page Not Found</Banner>} />
        </Routes>
    </div>;
};
