import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

//Chakra UI imports
import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Popover,
    Avatar,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    VStack,
    useToast,
    HStack,
    Image,
    Button,
    PopoverCloseButton,
    PopoverHeader
} from "@chakra-ui/react";
//custom imports
import { useSelector } from "react-redux";
import { FiMenu } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { FaExchangeAlt, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import client from "../../apiConfig/client";
import { GET_ADMIN_PROFILE } from "../../utils/url";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetState, selectProfileImage, selectUserName, setProfileData } from "../../store/slices/authSlice";
const AuthHeader = ({ open }: any) => {
    const dispatch = useAppDispatch();
    const profileImage = useAppSelector(selectProfileImage);
    const userName = useAppSelector(selectUserName);

    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const toast = useToast();
    const { t } = useTranslation();

    const handleLogout = () => {
        // localStorage.removeItem("data");
        dispatch(resetState());
        navigate("/login");
    };

    const handleHome = () => {
        navigate("/dashboard");
    };

    const handelPageChange = (page: string) => {
        setOpen(false); //Close
        navigate(page);
    };

    const getAdminProfile = async () => {
        const result = await client.get(GET_ADMIN_PROFILE);
        const data = result?.data?.data;
        dispatch(setProfileData(data));
    };
    useEffect(() => {
        getAdminProfile();
    }, []);

    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            position="sticky"
            zIndex={99}
            bg="white"
            _dark={{
                bg: "gray.900"
            }}
            borderBottomWidth="1px"
            color="inherit"
            h="12"
            pos={"fixed"}
            top={0}
        >
            {/* <IconButton
                aria-label="Menu"
                display={{
                    base: "inline-flex",
                    lg: "none"
                }}
                justifyContent={"flex-start"}
                icon={}
                size="sm"
            /> */}

            <Box
                display={{
                    base: "inline-flex",
                    lg: "none"
                }}
            >
                <FiMenu color="black" onClick={open} cursor={"pointer"} />
            </Box>

            <Flex align="center">
                <Stack
                    flex={{ base: 1, md: 1 }}
                    spacing={{ base: 2, md: 5 }}
                    justify="flex-end"
                    direction="row"
                    alignItems="center"
                    _hover={{ cursor: "pointer" }}
                    onClick={handleHome}
                >
                    <Box width={"32"}>{"TokMay"}</Box>
                </Stack>
            </Flex>

            {/* profile  */}

            <Flex align="center">
                <Stack
                    flex={{ base: 1, md: 1 }}
                    spacing={{ base: 2, md: 5 }}
                    justify="flex-end"
                    direction="row"
                    alignItems="center"
                >
                    <Box>{userName}</Box>

                    <Popover>
                        <PopoverTrigger>
                            <Avatar
                                size="sm"
                                src={profileImage ? profileImage : "/assets/images/avatar.png"}
                                cursor="pointer"
                            />
                        </PopoverTrigger>
                        <PopoverContent w={"96"}>
                            <PopoverArrow />

                            <PopoverBody zIndex={"10"}>
                                <VStack align="flex-start" zIndex={"12"}>
                                    <HStack>
                                        <BiUser />
                                        <Text onClick={() => handelPageChange("/profile")} cursor="pointer">
                                            {t("login.profile")}
                                        </Text>
                                    </HStack>

                                    <HStack>
                                        <FaExchangeAlt />
                                        <Text onClick={() => handelPageChange("/change-password")} cursor="pointer">
                                            {t("login.change_password")}
                                        </Text>
                                    </HStack>
                                    <HStack>
                                        <FaSignOutAlt />
                                        <Text onClick={handleLogout} cursor="pointer">
                                            {t("login.logout")}
                                        </Text>
                                    </HStack>
                                </VStack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Stack>
            </Flex>
        </Flex>
    );
};

export default AuthHeader;
