import { Box, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Simple from "./Simple";

const MessageDataWithID = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { ticketId } = useParams();

    return (
        <Box w={"full"}>
            This page is for the id
            <Simple />
        </Box>
    );
};

export default MessageDataWithID;
