import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

const AdminHeader = ({ title }: { title?: string }) => {
    const { t } = useTranslation();
    return (
        <Flex my={4} flexDir={"column"} gap={3} justifyContent={"center"} alignItems={"center"}>
            <Box bgColor={"white"}>{/* <Image src={logo} borderRadius="full" w={"44"} /> */}</Box>
            <Text fontSize="3xl" fontWeight="bold" my={1}>
                {title ? title : t("login.management_screen")}
            </Text>
        </Flex>
    );
};

export default AdminHeader;
