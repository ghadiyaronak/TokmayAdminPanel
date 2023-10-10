import { Flex, Box, Stack, Button, Text, useToast, Image, Link, useDisclosure, FormLabel } from "@chakra-ui/react";
import ProfileHeader from "../../../components/header/ProfileHeader";
import { useTranslation } from "react-i18next";
import EditArrowButton from "../../../components/button/EditButton";

interface ProfileProp {
    handleModeChange: any;
    details: any;
}

const Profile = ({ handleModeChange, details }: ProfileProp) => {
    const { t } = useTranslation();

    return (
        <Flex align="center" mt={5} flexDir={"column"}>
            <ProfileHeader title={t("login.profile")} />
            <Box rounded="lg" bg={"white"} boxShadow="lg" position={"relative"} pt={8} width="sm">
                <EditArrowButton handleClick={handleModeChange} top={0} right={0} />

                <Stack spacing={4} flexDir={"column"}>
                    <Flex flex={1} flexDir={"column"}>
                        <Box pos={"relative"} w={"full"} h={"160"}>
                            <Box
                                mt={4}
                                h={"36"}
                                w={"36"}
                                border={"4px"}
                                borderColor={"blackAlpha.100"}
                                backgroundColor={"blackAlpha.50"}
                                cursor={"pointer"}
                                rounded={"full"}
                                marginX={"auto"}
                            >
                                <Image
                                    src={details?.profileImage ? details?.profileImage : "/assets/images/avatar.png"}
                                    objectFit={"cover"}
                                    h={"full"}
                                    w={"full"}
                                    rounded={"full"}
                                />
                            </Box>
                        </Box>
                    </Flex>
                    <Box px={8} py={4} pb={8}>
                        <Box py={3}>
                            <FormLabel>
                                {"担当者名"}
                                <Text color={"red"} as="span">
                                    *
                                </Text>
                            </FormLabel>
                            <Text>{details?.userName}</Text>
                        </Box>
                        <Box py={3}>
                            <FormLabel>
                                {t("common.email")}
                                <Text color={"red"} as="span">
                                    *
                                </Text>
                            </FormLabel>
                            <Text>{details?.email}</Text>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Flex>
    );
};

export default Profile;
