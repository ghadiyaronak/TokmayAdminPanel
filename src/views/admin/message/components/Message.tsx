import { Box, Divider, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import { t } from "i18next";

const Message = () => {
    return (
        <Stack p={2} mt={4} backgroundColor={"#FFFFFF"}>
            <Flex justifyContent={"center"}>
                <Text py={3} fontWeight={700} fontSize={"2xl"}>
                    {t("message_mgmt.message_content")}
                </Text>
            </Flex>
            <Divider borderWidth="1px" />

            <Flex h={"80"} overflowY={"scroll"} flexDirection={"column"} px={10}>
                <Box display={"flex"} justifyContent={"end"} alignItems={"end"}>
                    <Text
                        w={"80%"}
                        // textAlign={"end"}
                        mt={5}
                        bgColor={"#F0F0F0"}
                        fontWeight={400}
                        fontSize={"md"}
                        borderRadius={"10"}
                        px={2}
                        py={2}
                        pl={4}
                    >
                        My name is Ono from ono artning. Mainly undertaking total venue construction for exhibitions,
                        special exhibitions, presentations, etc. is. Currently, those who can help with carpentry work
                        on site and at our woodworking studio We are looking for. There are many cases where the site
                        details change just before, When a specific project is decided, we are looking for a
                        relationship that can be called out in the form of support or a spot. It doesn't matter if it's
                        not a recent conversation, so I'd appreciate it if you could say hello over the phone first. If
                        you are interested, please contact us if you are interested in the type of job in the three
                        prefectures. Thank you.
                    </Text>
                </Box>

                <Box display={"flex"} justifyContent={"start"} alignItems={"end"}>
                    <Text
                        w={"80%"}
                        mt={5}
                        bgColor={"#F0F0F0"}
                        fontWeight={400}
                        fontSize={"md"}
                        borderRadius={"10"}
                        px={2}
                        py={2}
                        pl={4}
                    >
                        My name is Ono from ono artning. Mainly undertaking total venue construction for exhibitions,
                        special exhibitions, presentations, etc. is. Currently, those who can help with carpentry work
                        on site and at our woodworking studio We are looking for. There are many cases where the site
                        details change just before, When a specific project is decided, we are looking for a
                        relationship that can be called out in the form of support or a spot. It doesn't matter if it's
                        not a recent conversation, so I'd appreciate it if you could say hello over the phone first. If
                        you are interested, please contact us if you are interested in the type of job in the three
                        prefectures. Thank you.
                    </Text>
                </Box>
            </Flex>

            <Flex pb={5} px={5} flexDirection={"row"}>
                <Input mt={3} bgColor={"#F0F0F0"} p={2} borderRadius={"20"} placeholder="Type Here" />
            </Flex>
        </Stack>
    );
};

export default Message;
