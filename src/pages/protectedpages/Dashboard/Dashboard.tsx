import { Box, Text } from "@chakra-ui/react";
import React from "react";
import MainHeading from "../../../components/header/MainHeading";
import useHelperHook from "../../../hooks/useHelperHook";
import DashboardStats from "../../../views/admin/default";

const Dashboard = () => {
    const { t, toast, navigate } = useHelperHook();
    return (
        <Box bg={"#f4f7fe"}>
            <MainHeading title={t("home")} />
            <DashboardStats />
        </Box>
    );
};

export default Dashboard;
