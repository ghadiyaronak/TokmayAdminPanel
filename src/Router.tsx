import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Authentication/LoginPage";
import ForgotPasswordPage from "./pages/Authentication/ForgotPasswordPage";
import ResetPasswordPages from "./pages/Authentication/ResetPasswordPages";
import SetPasswordPage from "./pages/Authentication/SetPasswordPage";
import HomePage from "./pages/HomePage";
import ProtectedLayout from "./layout/ProtectedLayout";
import ChangePasswordPage from "./pages/Authentication/ChangePasswordPage";
import ProfileChange from "./pages/protectedpages/profile/ProfileChangePage";
import UserList from "./pages/protectedpages/Users/UsersList";
import Dashboard from "./pages/protectedpages/Dashboard/Dashboard";
import ManagerList from "./pages/protectedpages/manger/MangerList";
import IndustryList from "./pages/protectedpages/Industry/IndustryList";
import ProfessionList from "./pages/protectedpages/profession/ProfessionList";
import UserView from "./pages/protectedpages/Users/UserView";
import Setting from "./pages/protectedpages/setting/Setting";
import BlockUsermgmt from "./pages/protectedpages/blockuser/BlockUsermgmt";
import CashRequest from "./pages/protectedpages/cash/CashRequest";
import MediaList from "./pages/protectedpages/MediaList/MediaList";

const Router = () => {
    return (
        <Routes>
            {/* Authentication Routes  */}
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPages />} />
            <Route path="/set-password/:token" element={<SetPasswordPage />} />

            {/* Protected Routes  */}
            <Route element={<ProtectedLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/change-password" element={<ChangePasswordPage />} />
                <Route path="/profile" element={<ProfileChange />} />
                <Route path="/users">
                    <Route index element={<UserList />} />
                    <Route path="/users/details/:userId" element={<UserView />}></Route>
                </Route>

                <Route path="/profession">
                    <Route index element={<ProfessionList />} />
                </Route>

                <Route path="/block-user">
                    <Route index element={<BlockUsermgmt />} />
                </Route>

                <Route path="/cash-request">
                    <Route index element={<CashRequest />} />
                </Route>

                <Route path="/setting">
                    <Route index element={<Setting />} />
                </Route>

                <Route path="/media">
                    <Route index element={<MediaList />} />
                </Route>

                <Route path="/master-admin">
                    <Route path="manager" element={<ManagerList />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;
