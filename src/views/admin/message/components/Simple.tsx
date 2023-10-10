import { Badge, Box, Button, Stack, Text } from "@chakra-ui/react";
import { t } from "i18next";
import { useLocation } from "react-router-dom";
import Data from "../../../../components/table/Data";

const Simple = () => {
    const loaction = useLocation();
    const details = [
        {
            id: 1,
            sender: (
                <Box
                    justifyContent={"center"}
                    justifyItems={"center"}
                    alignItems={"center"}
                    alignContent={"center"}
                    textAlign={"center"}
                    w={"full"}
                >
                    <Text color={"#4299E1"}>{loaction.state.sender}</Text>
                </Box>
            ),
            receiver: <Text color={"#4299E1"}>{loaction.state.receiver}</Text>,
            time: <Text color={"#4299E1"}>{loaction.state.last_message_date_and_time}</Text>,
            status: (
                <Button
                    variant={
                        loaction.state.status === "通報あり"
                            ? "danger"
                            : loaction.state.status === "対応中"
                            ? "success"
                            : "darkBlack"
                    }
                >
                    {loaction.state.status}
                </Button>
            )
        }
    ];

    const column = [
        {
            id: 1,
            name: (
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Text fontWeight={"bold"}>{t("message_mgmt.sender")}</Text>
                </Box>
            ),
            selector: "sender"
        },
        {
            id: 2,
            name: (
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Text fontWeight={"bold"}>{t("message_mgmt.receiver")}</Text>
                </Box>
            ),
            selector: "receiver"
        },
        {
            id: 3,
            name: (
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Text fontWeight={"bold"}>{t("message_mgmt.last_message_date_and_time")}</Text>
                </Box>
            ),
            selector: "time"
        },
        {
            id: 4,
            name: (
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Text fontWeight={"bold"}>{t("common.status")}</Text>
                </Box>
            ),
            selector: (row: any) => row?.status,
            sortable: true,
            wrap: true
        }
    ];

    return (
        <>
            <Stack>
                <Data column={column} data={details} />
            </Stack>
        </>
    );
};

export default Simple;
